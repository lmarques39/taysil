// Background remover used by remove-backgrounds.ts (macOS only — compiled automatically on first run).
// Usage: removebg <input image> <output.png>
//   exit 0 → transparent PNG written, cropped to the product; prints the method used
//   exit 2 → no product found in the photo
//   exit 3 → the photo already has a transparent background (nothing written)
// Two methods:
//   - Plain backgrounds (the border is one flat colour, e.g. supplier packshots on white):
//     flood-fill that colour from the edges, so every object in the photo is kept.
//   - Real photos (grey backdrop, shadows): Apple Vision foreground mask, on-device.
import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count == 3 else { fputs("usage: removebg <input> <output.png>\n", stderr); exit(1) }
let inURL = URL(fileURLWithPath: args[1]), outURL = URL(fileURLWithPath: args[2])
guard let src = CGImageSourceCreateWithURL(inURL as CFURL, nil),
      let cg = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fputs("cannot read image\n", stderr); exit(1) }

let W = cg.width, H = cg.height
let sRGB = CGColorSpace(name: CGColorSpace.sRGB)!

// RGBA8 pixels, premultiplied
var px = [UInt8](repeating: 0, count: W * H * 4)
px.withUnsafeMutableBytes { ptr in
  let ctx = CGContext(data: ptr.baseAddress, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W * 4,
                      space: sRGB, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  ctx.draw(cg, in: CGRect(x: 0, y: 0, width: W, height: H))
}

var border: [Int] = []
for x in 0..<W { border.append(x); border.append((H-1)*W + x) }
for y in 1..<(H-1) { border.append(y*W); border.append(y*W + W-1) }

// --- Already transparent? (a good part of the border is see-through — same rule as the website) ---
let clearBorder = border.filter { px[$0*4+3] < 128 }.count
if Double(clearBorder) / Double(border.count) > 0.25 { print("already-transparent"); exit(3) }

func dist(_ i: Int, _ c: (Double, Double, Double)) -> Double {
  let r = Double(px[i*4]) - c.0, g = Double(px[i*4+1]) - c.1, b = Double(px[i*4+2]) - c.2
  return (r*r + g*g + b*b).squareRoot()
}

// --- Is the border one flat colour? ---
let med: (Double, Double, Double) = {
  func m(_ k: Int) -> Double { let v = border.map { Double(px[$0*4+k]) }.sorted(); return v[v.count/2] }
  return (m(0), m(1), m(2))
}()
let flat = Double(border.filter { dist($0, med) < 12 }.count) / Double(border.count) > 0.97

var alpha = [UInt8](repeating: 255, count: W * H)
var method = "vision"

if flat {
  method = "flat-background"
  // Flood fill from the edges through pixels close to the background colour
  let hard = 18.0, soft = 40.0          // < hard: background; hard…soft: anti-aliased edge
  var seen = [Bool](repeating: false, count: W * H)
  var stack = border.filter { dist($0, med) < soft }
  for i in stack { seen[i] = true }
  while let i = stack.popLast() {
    let d = dist(i, med)
    alpha[i] = d < hard ? 0 : UInt8(min(255, (d - hard) / (soft - hard) * 255))
    if d >= hard { continue }           // edge pixel: keep partially, don't spread past it
    let x = i % W, y = i / W
    for (nx, ny) in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)] where nx >= 0 && ny >= 0 && nx < W && ny < H {
      let j = ny*W + nx
      if !seen[j] && dist(j, med) < soft { seen[j] = true; stack.append(j) }
    }
  }
} else {
  let request = VNGenerateForegroundInstanceMaskRequest()
  let handler = VNImageRequestHandler(cgImage: cg)
  try handler.perform([request])
  guard let result = request.results?.first, !result.allInstances.isEmpty else { fputs("no product found\n", stderr); exit(2) }
  let mask = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
  CVPixelBufferLockBaseAddress(mask, .readOnly)
  let base = CVPixelBufferGetBaseAddress(mask)!.assumingMemoryBound(to: Float32.self)
  let stride = CVPixelBufferGetBytesPerRow(mask) / 4
  for y in 0..<H { for x in 0..<W {
    let v = Double(max(0, min(1, base[y*stride + x])))
    alpha[y*W + x] = v > 0.98 ? 255 : UInt8(v * 255)   // the mask tops out just under 1.0
  } }
  CVPixelBufferUnlockBaseAddress(mask, .readOnly)
}

// --- Bounding box of the product (alpha > 8), with a small margin ---
var minX = W, minY = H, maxX = -1, maxY = -1
for y in 0..<H { for x in 0..<W where alpha[y*W + x] > 8 {
  minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y)
} }
guard maxX >= 0 else { fputs("no product found\n", stderr); exit(2) }
let m = 4
minX = max(0, minX - m); minY = max(0, minY - m); maxX = min(W-1, maxX + m); maxY = min(H-1, maxY + m)

// Apply alpha (premultiplied: scale the colour too) and crop
for i in 0..<(W*H) where alpha[i] < 255 {
  let a = Double(alpha[i]) / 255
  px[i*4] = UInt8(Double(px[i*4]) * a); px[i*4+1] = UInt8(Double(px[i*4+1]) * a)
  px[i*4+2] = UInt8(Double(px[i*4+2]) * a); px[i*4+3] = alpha[i]
}
let full = px.withUnsafeMutableBytes { ptr in
  CGContext(data: ptr.baseAddress, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W * 4,
            space: sRGB, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!.makeImage()!
}
// CGImage cropping uses a top-left origin, same as the pixel rows above
let out = full.cropping(to: CGRect(x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1))!
guard let dest = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, out, nil)
guard CGImageDestinationFinalize(dest) else { fputs("cannot write \(outURL.path)\n", stderr); exit(1) }
print("\(method) \(out.width)x\(out.height)")
