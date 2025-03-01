import { IWorkout } from "@/context/WorkoutContext";
import { useClerk } from "@clerk/clerk-react";
import { Dumbbell, Heart, Repeat, Share2, Timer, Weight } from "lucide-react";

interface ComunityCardProps {
  workout: IWorkout;
  loadingLikes: Set<string>;
  toogleLike: (workoutId: string) => void;
  isLiked: (workout: IWorkout) => boolean;
  handleOpenModal: (workoutId: string) => void;
}

export const ComunityCard = ({
  handleOpenModal,
  isLiked,
  loadingLikes,
  toogleLike,
  workout,
}: ComunityCardProps) => {
  const { user } = useClerk();

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={workout.user.avatar}
              alt={workout.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {workout.name}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-300">
                por {workout.user.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => toogleLike(workout.id)}
              disabled={loadingLikes.has(workout.id)}
            >
              {loadingLikes.has(workout.id) ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-zinc-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div
                  className={`flex items-center gap-1 ${
                    workout.likes.some((like) => like.userId === user?.id)
                      ? "text-blue-500"
                      : "text-zinc-500 hover:text-blue-500"
                  } transition-colors`}
                >
                  {isLiked(workout) ? (
                    <Heart size={20} fill="#2563EB" />
                  ) : (
                    <Heart size={20} />
                  )}
                  <span>{workout.likes.length}</span>
                </div>
              )}
            </button>
            <button className="text-zinc-500 hover:text-blue-500 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300 mb-4">
          <div className="flex items-center gap-1">
            <Dumbbell size={16} className="text-blue-500" />
            <span>{workout.exercises.length} exercícios</span>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100">
        <div className="grid divide-y divide-zinc-100">
          {workout.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {exercise.name}
                  </h4>
                  <div className="mt-1 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-200">
                    <div className="flex items-center gap-1">
                      <Repeat size={16} className="text-blue-500" />
                      <span>
                        {exercise.series} séries x {exercise.repetitions} reps
                      </span>
                    </div>
                    {exercise.weight && (
                      <div className="flex items-center gap-1">
                        <Weight size={16} className="text-blue-500" />
                        <span>{exercise.weight}kg</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Timer size={16} className="text-blue-500" />
                      <span>{exercise.restTime}s descanso</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-800 border-t border-zinc-100">
        <button
          onClick={() => handleOpenModal(workout.id)}
          className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
        >
          Copiar Treino
        </button>
      </div>
    </div>
  );
};
