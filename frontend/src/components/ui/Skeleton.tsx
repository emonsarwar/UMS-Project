const Skeleton = ({ className = '' }: { className?: string }) => {
  return <div className={`animate-pulse rounded-2xl bg-slate-200/80 dark:bg-white/10 ${className}`} />
}

export default Skeleton
