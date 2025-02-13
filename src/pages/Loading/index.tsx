const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center bg-blue-600 h-screen w-screen flex-col gap-2">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white">
            </div>
            <h1 className="text-white text-lg font-semibold">Carregando ...</h1>
        </div>
    )
}

export default LoadingPage;