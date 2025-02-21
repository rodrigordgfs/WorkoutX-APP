import {
  Exercise,
  ExerciseSession,
  useWorkout,
} from "@/context/WorkoutContext";
import {
  Check,
  CheckCheck,
  LoaderCircle,
  Repeat,
  Timer,
  Weight,
} from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface ExerciseCardProps {
  exercise: Exercise;
  isActive: boolean;
  onSelect: () => void;
}

const ExerciseCard = ({ exercise, isActive, onSelect }: ExerciseCardProps) => {
  const { workoutSession, setWorkoutSession, workoutSessionCompleted, workoutSessionInProgress } =
    useWorkout();

  const [loadingCompleteExercise, setLoadingCompleteExercise] = useState(false);

  const workoutSessionExercise = workoutSession?.exercises.find(
    (ex) => ex.exercise.id === exercise.id
  );

  const handleCompleteExercise = () => {
    setLoadingCompleteExercise(true);
    axios
      .patch(
        `/workout/session/${workoutSession?.id}/exercise/${workoutSessionExercise?.id}/complete`,
        {
          completed: !workoutSessionExercise?.completed,
          weight: exercise.weight,
          repetitions: exercise.repetitions,
          series: exercise.series,
        },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
        }
      )
      .then(({ data }) => {
        setWorkoutSession({
          id: data.id,
          startedAt: data.startedAt,
          endedAt: data.endedAt,
          exercises: data.exercises.map((exercise: ExerciseSession) => ({
            id: exercise.id,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            restTime: exercise.restTime,
            completed: exercise.completed,
            exercise: {
              id: exercise.exercise.id,
              name: exercise.exercise.name,
            },
          })),
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao concluir treino");
      })
      .finally(() => {
        setLoadingCompleteExercise(false);
      });
  };

  return (
    <div
      className={`p-4 rounded-lg mb-2 cursor-pointer transition-all ${
        isActive
          ? "bg-blue-500 text-white shadow-lg"
          : "bg-white hover:bg-gray-50"
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
        <button
          onClick={() => {
            if (!workoutSessionCompleted()) {
              handleCompleteExercise();
            }
          }}
          disabled={loadingCompleteExercise || !workoutSessionInProgress()}
          className={`flex items-center justify-center p-2 rounded-full bg-blue-500 text-white transition-all ${
            loadingCompleteExercise && "cursor-not-allowed"
          } ${
            workoutSessionExercise?.completed
              ? "bg-green-500"
              : isActive
              ? "bg-white text-blue-500"
              : "hover:bg-blue-400"
          }`}
        >
          {loadingCompleteExercise ? (
            <LoaderCircle
              size={16}
              className="animate-spin"
              color={isActive ? "#2563EB" : "#FFF"}
            />
          ) : workoutSessionExercise?.completed ? (
            <CheckCheck size={16} />
          ) : (
            <Check size={16} color={isActive ? "#2563EB" : "#FFF"} />
          )}
        </button>
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
