const WorkoutLoading = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Meus Treinos</h2>
            </div>
            <div className="grid gap-4">
                {[...Array(3)].map((_, index) => (
                    <div 
                        key={index} 
                        className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 animate-pulse"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
                            <div className="flex-1">
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-2" />
                                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
                            </div>
                        </div>
                        <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkoutLoading;
