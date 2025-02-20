import { Dumbbell, Plus } from "lucide-react"
import { Link } from "react-router-dom"

const WorkoutEmpty = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Meus Treinos</h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum treino cadastrado</h3>
                <p className="text-gray-600 mb-6">Comece criando seu primeiro treino para acompanhar seus exercícios.</p>
                <Link to="/workout/new" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    Criar Primeiro Treino
                </Link>
            </div>
        </div>
    )
}

export default WorkoutEmpty