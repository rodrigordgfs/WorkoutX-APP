import { IWorkout } from "@/context/WorkoutContext";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Dumbbell,
  Repeat,
  Timer,
  Weight,
} from "lucide-react";
import { Link } from "react-router-dom";

interface WorkoutListItemProps {
  workout: IWorkout;
  isOpen: boolean;
  onToggle: (workoutId: string) => void;
}

const WorkoutListItem = ({
  workout,
  isOpen,
  onToggle,
}: WorkoutListItemProps) => {
  return (
    <div
      key={workout.id}
      className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg">
              <Dumbbell size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {workout.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {workout.exercises.length} exercícios
              </p>
            </div>
          </div>
          <button
            onClick={() => onToggle(workout.id)}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition-colors"
          >
            {isOpen ? (
              <ChevronUp
                size={24}
                className="text-zinc-600 dark:text-zinc-300"
              />
            ) : (
              <ChevronDown
                size={24}
                className="text-zinc-600 dark:text-zinc-300"
              />
            )}
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-zinc-100 dark:border-zinc-700">
          <div className="grid divide-y divide-zinc-100 dark:divide-zinc-700">
            {workout.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                      {exercise.name}
                    </h4>
                    <div className="mt-1 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Repeat
                          size={16}
                          className="text-blue-500 dark:text-blue-400"
                        />
                        <span>
                          {exercise.series} séries x {exercise.repetitions} reps
                        </span>
                      </div>
                      {exercise.weight && (
                        <div className="flex items-center gap-1">
                          <Weight
                            size={16}
                            className="text-blue-500 dark:text-blue-400"
                          />
                          <span>{exercise.weight}kg</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Timer
                          size={16}
                          className="text-blue-500 dark:text-blue-400"
                        />
                        <span>{exercise.restTime}s descanso</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        to={`/workout/${workout.id}`}
        className="block p-4 bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors text-center text-blue-600 dark:text-blue-400 font-medium"
      >
        Ver detalhes do treino
        <ChevronRight className="inline-block ml-2" size={16} />
      </Link>
    </div>
  );
};

export default WorkoutListItem;
