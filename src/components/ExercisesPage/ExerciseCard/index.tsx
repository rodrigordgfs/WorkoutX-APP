import { Play, Repeat, Timer, Weight } from "lucide-react";

interface ExerciseCardProps {
  image: string;
  name: string;
  instruction: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
}

export const ExerciseCard = ({
  instruction,
  image,
  name,
  repetitions,
  restTime,
  series,
  weight,
}: ExerciseCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-60 object-cover" loading="lazy"  />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Play size={20} />
            Iniciar
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
          {name}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-2">
          {instruction}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Repeat className="text-blue-600 dark:text-blue-300" size={18} />
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Séries</p>
            </div>
            <p className="font-semibold text-lg text-zinc-900 dark:text-white">
              {series}
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="text-blue-600 dark:text-blue-300" size={18} />
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Repetições
              </p>
            </div>
            <p className="font-semibold text-lg text-zinc-900 dark:text-white">
              {repetitions}
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Weight className="text-blue-600 dark:text-blue-300" size={18} />
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Peso</p>
            </div>
            <p className="font-semibold text-lg text-zinc-900 dark:text-white">
              {weight}kg
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="text-blue-600 dark:text-blue-300" size={18} />
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Descanso
              </p>
            </div>
            <p className="font-semibold text-lg text-zinc-900 dark:text-white">
              {restTime}s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
