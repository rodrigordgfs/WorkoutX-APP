import { WorkoutStats } from "@/context/WorkoutContext";
import { intervalToDuration } from "date-fns";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Dumbbell,
} from "lucide-react";

interface WorkoutHistoryCardProps {
  workout: IWorkoutHistory;
  statusColor: string;
  isExpanded: boolean;
  toogleWorkout: (workoutId: string) => void;
}

interface IExercise {
  id: string;
  name: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
  completed: boolean;
}

export interface IWorkoutHistory {
  id: string;
  startedAt: string;
  endedAt: string | null;
  duration: string | number;
  workout: {
    name: string;
    visibility: string;
    createdAt: string;
  };
  exercises: IExercise[];
  stats: WorkoutStats;
}

export const WorkoutHistoryCard = ({
  workout,
  statusColor,
  isExpanded,
  toogleWorkout,
}: WorkoutHistoryCardProps) => {
  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(dateString));
  }

  function formatDurationCustom(duration: number | string): string {
    if (typeof duration === "string") {
      return duration;
    }

    if (duration < 60) {
      return `${duration} min`;
    }

    const durationObj = intervalToDuration({
      start: 0,
      end: duration * 60 * 1000,
    });

    return `${durationObj.hours}h ${durationObj.minutes}m`;
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
      <div
        className="p-4 sm:p-6 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
        onClick={() => toogleWorkout(workout.id)}
      >
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
              <Dumbbell size={20} className="sm:size-6" />
            </div>
            <div>
              <h3 className="text-lg text-zinc-900 dark:text-zinc-50 sm:text-xl font-semibold">
                {workout.workout.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                {formatDate(workout.startedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-4 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base">
              <Clock size={18} className="sm:size-5" />
              <span>{formatDurationCustom(workout.duration)}</span>
            </div>
            <div className={`text-sm sm:text-base font-medium ${statusColor}`}>
              {workout.stats.completionRate}
            </div>
            {isExpanded ? (
              <ChevronUp size={20} className="text-zinc-400 sm:size-6" />
            ) : (
              <ChevronDown size={20} className="text-zinc-400 sm:size-6" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-zinc-100 divide-y divide-zinc-100">
          {workout.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`p-4 ${
                exercise.completed
                  ? "bg-green-50 dark:bg-green-700"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-700"
              } transition-colors`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                      {exercise.name}
                    </h4>
                    {exercise.completed && (
                      <CheckCircle2 size={16} className="text-green-500" />
                    )}
                  </div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {exercise.series} séries × {exercise.repetitions} •{" "}
                    {exercise.weight}kg • {exercise.restTime}s descanso
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-zinc-50 dark:bg-zinc-700 text-center text-blue-600 dark:text-blue-400 font-medium">
            <div className="flex justify-between items-center text-sm">
              <div>
                Exercícios concluídos: {workout.stats.completedExercises} de{" "}
                {workout.stats.totalExercises}
              </div>
              <div className={`font-medium ${statusColor}`}>
                Taxa de conclusão: {workout.stats.completionRate}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
