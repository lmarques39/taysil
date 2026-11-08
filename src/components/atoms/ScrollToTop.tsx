import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Browsers keep the scroll position on client-side navigation; start each page at the top.
// Only the path counts, so changing filters (?category=…) on Produtos doesn't jump.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  // 'instant' overrides the global CSS smooth scrolling, which gets cut short when the new page is shorter
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return null
}
