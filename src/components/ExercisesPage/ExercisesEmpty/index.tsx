import { Dumbbell } from "lucide-react";

const ExercisesEmpty = () => {
  return (
    <div className="max-w-full">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <Dumbbell size={32} />
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Nenhum exercício disponível
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Parece que ainda não há exercícios cadastrados para este grupo
          muscular. Volte mais tarde para conferir!
        </p>
      </div>
    </div>
  );
};

export default ExercisesEmpty;
