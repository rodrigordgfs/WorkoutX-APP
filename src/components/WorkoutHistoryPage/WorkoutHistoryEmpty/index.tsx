import { Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const WorkoutHistoryEmpty = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar size={32} />
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Nenhum histórico de treino registrado
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Parece que você ainda não registrou nenhum treino. Comece agora!
        </p>
        <Link
          to="/workout/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
        >
          <Plus size={20} />
          Criar Primeiro Treino
        </Link>
      </div>
    </div>
  );
};

export default WorkoutHistoryEmpty;
