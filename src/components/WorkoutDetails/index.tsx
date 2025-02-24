import {
  Exercise,
  ExerciseSession,
  useWorkout,
} from "@/context/WorkoutContext";
import { Modal } from "../Shared/Modal";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface WordkoutDetailsProps {
  exercise: Exercise | null;
}

const WorkoutDetails = ({ exercise }: WordkoutDetailsProps) => {
  const navigate = useNavigate();
  const {
    deleteExercise,
    getWorkoutByExerciseId,
    isLastExerciseInWorkout,
    deleteWorkout,
    workoutSession,
    workoutSessionCompleted,
    workoutSessionInProgress,
    setWorkoutSession,
  } = useWorkout();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadingCompleteExercise, setLoadingCompleteExercise] = useState(false);

  const workoutSessionExercise = workoutSession?.exercises.find(
    (ex) => ex.exercise.id === exercise?.id
  );

  const handleCompleteExercise = () => {
    if (workoutSessionCompleted()) {
      toast.info("Treino já foi concluído");
      return;
    }
    setLoadingCompleteExercise(true);
    axios
      .patch(
        `/workout/session/${workoutSession?.id}/exercise/${workoutSessionExercise?.id}/complete`,
        {
          completed: !workoutSessionExercise?.completed,
          weight: exercise?.weight,
          repetitions: exercise?.repetitions,
          series: exercise?.series,
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

  const getEmbedUrl = (url: string | "") => {
    const videoIdMatch = url?.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : url;
  };

  const handleDeleteExercise = async () => {
    setIsDeleting(true);

    const workout = getWorkoutByExerciseId(exercise?.id ?? "");

    if (isLastExerciseInWorkout(workout, exercise?.id ?? "")) {
      axios
        .delete(`/workout/${workout?.id}`, {
          baseURL: import.meta.env.VITE_API_BASE_URL,
        })
        .then(() => {
          deleteWorkout(workout?.id ?? "");
          setIsDeleting(false);
          setIsModalOpen(false);
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          setIsDeleting(false);
        });
    } else {
      axios
        .delete(`/workout/exercise/${exercise?.id}`, {
          baseURL: import.meta.env.VITE_API_BASE_URL,
        })
        .then(() => {
          deleteExercise(exercise?.id ?? "");
          setIsDeleting(false);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error(error);
          setIsDeleting(false);
        });
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <h2 className="text-2xl font-bold mb-4 mt-2">
          Exercício: {exercise?.name}
        </h2>
        {workoutSessionInProgress() && (
          <button
            onClick={handleCompleteExercise}
            disabled={loadingCompleteExercise}
            className={`py-2 px-4 rounded-lg text-white transition-all mb-2 md:mb-0 w-full md:w-auto ${
              loadingCompleteExercise && "cursor-not-allowed opacity-75"
            } ${
              workoutSessionExercise?.completed
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {workoutSessionExercise?.completed ? (
              <div className="flex items-center justify-center gap-2">
                Exercício Concluído
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Concluir Exercício
              </div>
            )}
          </button>
        )}
      </div>

      <div className="aspect-video w-full mb-6">
        <iframe
          className="w-full h-full rounded-lg"
          src={getEmbedUrl(exercise?.videoUrl ?? "")}
          title={exercise?.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Instruções:</h3>
          <p className="text-zinc-600 dark:text-zinc-400">{exercise?.instructions}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center flex-1">
            <h4 className="font-semibold dark:text-white">Séries</h4>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {exercise?.series}
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center flex-1">
            <h4 className="font-semibold dark:text-white">Repetições</h4>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {exercise?.repetitions}
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center flex-1">
            <h4 className="font-semibold dark:text-white">Descanso</h4>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {exercise?.restTime}s
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteExercise}
        loading={isDeleting}
        title="Excluir Exercício"
        content="Tem certeza que deseja excluir esse exercício?"
      />
    </div>
  );
};

export default WorkoutDetails;
