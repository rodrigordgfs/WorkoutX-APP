import { Exercise } from "@/context/WorkoutContext";
import { Repeat, Timer, Weight } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  isActive: boolean;
  onSelect: () => void;
}

const ExerciseCard = ({ exercise, isActive, onSelect }: ExerciseCardProps) => {
  return (
    <div
      className={`p-4 rounded-lg mb-2 cursor-pointer transition-all ${
        isActive
          ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          : "bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-950 shadow-lg"
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
      </div>
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Repeat size={16} />
          <span>
            {exercise.series} x {exercise.repetitions}
          </span>
        </div>
        {exercise.weight && (
          <div className="flex items-center gap-1">
            <Weight size={16} />
            <span>{exercise.weight} kg</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Timer size={16} />
          <span>{exercise.restTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
