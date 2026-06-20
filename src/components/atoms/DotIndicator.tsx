export default function DotIndicator({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block rounded-full transition-all duration-200 ${
        active ? 'w-4 h-2 bg-slate-900' : 'w-2 h-2 bg-slate-300'
      }`}
    />
  )
}
