const WorkoutLoading = () => {
    return <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Meus Treinos</h2>
        </div>
        <div className="grid gap-4">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-full" />
                </div>
            ))}
        </div>
    </div>
}

export default WorkoutLoading;