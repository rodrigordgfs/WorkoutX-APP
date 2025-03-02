export const Loading = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 animate-pulse"
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
        <div>
          <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-700 rounded mt-2" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
        <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
      </div>
    </div>
  ));
};
