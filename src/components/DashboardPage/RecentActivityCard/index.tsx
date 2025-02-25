import { Dumbbell } from "lucide-react";

interface IRecentActivityCardProps {
  workoutSession: {
    workout: {
      name: string;
    };
    exerciseCount: number;
    duration: number;
  };
}

export const RecentActivityCard = ({
  workoutSession,
}: IRecentActivityCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
          <Dumbbell size={20} />
        </div>
        <div>
          <h4 className="font-medium">{workoutSession.workout.name}</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {workoutSession.exerciseCount} exercícios •{" "}
            {workoutSession.duration
              ? `${workoutSession.duration} minutos`
              : "Em andamento"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            workoutSession.duration
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {workoutSession.duration ? "Concluído" : "Em andamento"}
        </span>
      </div>
    </div>
  );
};
