export const Loading = () => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse">
      <div className="aspect-square bg-zinc-300 dark:bg-zinc-700"></div>
      <div className="p-4">
        <div className="h-5 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
      </div>
    </div>
  );
};
