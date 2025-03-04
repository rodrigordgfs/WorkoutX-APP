import ExerciseCard from "@/components/ExerciseCard";
import { Modal } from "@/components/Shared/Modal";
import WorkoutDetails from "@/components/WorkoutDetails";
import { IExerciseSession, useWorkout } from "@/context/WorkoutContext";
import { useAuth, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function WorkoutDetailsPage() {
  const { id } = useParams();
  const { user } = useClerk();
  const { getToken } = useAuth();
  const {
    workouts,
    setSelectedExercise,
    selectedExercise,
    selectedWorkout,
    setSelectedWorkout,
    deleteWorkout,
    workoutSession,
    setWorkoutSession,
    workoutSessionInProgress,
    workoutSessionCompleted,
    existExercisesUncompleted,
    getUncompletedExercisesWithDetails,
    getCompletedExercisesWithDetails,
  } = useWorkout();
  const navigate = useNavigate();

  const [isModalDeleteWorkoutOpen, setIsModalDeleteWorkoutOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalCompleteWorkoutOpen, setIsModalCompleteWorkoutOpen] =
    useState(false);
  const [loadingStartWorkoutSession, setLoadingStartWorkoutSession] =
    useState(false);
  const [loadingStopWorkoutSession, setLoadingStopWorkoutSession] =
    useState(false);
  const [loadingCompleteWorkoutSession, setLoadingCompleteWorkoutSession] =
    useState(false);

  const handleDeleteWorkout = () => {
    setIsDeleting(true);
    axios
      .delete(`/workout/${id}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
      })
      .then(() => {
        deleteWorkout(id ?? "");
        setIsModalDeleteWorkoutOpen(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao excluir treino");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleStartWorkoutSession = async () => {
    setLoadingStartWorkoutSession(true);
    axios
      .post(
        "/workout/session",
        {
          userId: user?.id,
          workoutId: id,
        },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )
      .then(({ data }) => {
        setWorkoutSession({
          id: data.id,
          startedAt: data.startedAt,
          endedAt: data.endedAt,
          exercises: data.exercises.map((exercise: IExerciseSession) => ({
            id: exercise.id,
            exerciseId: exercise.exerciseId,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            restTime: exercise.restTime,
            completed: exercise.completed,
            name: exercise.name,
          })),
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao iniciar treino");
      })
      .finally(() => {
        setLoadingStartWorkoutSession(false);
      });
  };

  const handleStopWorkoutSession = async () => {
    setLoadingStopWorkoutSession(true);
    axios
      .delete(`/workout/session/${workoutSession?.id}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(() => {
        setWorkoutSession(null);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao parar o treino");
      })
      .finally(() => {
        setLoadingStopWorkoutSession(false);
      });
  };

  const handleCompleteWorkoutSession = () => {
    if (existExercisesUncompleted()) {
      setIsModalCompleteWorkoutOpen(true);
    } else {
      postCompleteWorkoutSession();
    }
  };

  const postCompleteWorkoutSession = async () => {
    setLoadingCompleteWorkoutSession(true);
    console.log("workoutSession", workoutSession);

    axios
      .post(
        `/workout/session/${workoutSession?.id}/complete`,
        {},
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )
      .then(({ data }) => {
        setWorkoutSession({
          id: data.id,
          startedAt: data.startedAt,
          endedAt: data.endedAt,
          exercises: data.exercises.map((exercise: IExerciseSession) => ({
            id: exercise.id,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            restTime: exercise.restTime,
            completed: exercise.completed,
            exerciseId: exercise.exerciseId,
            name: exercise.name,
          })),
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao concluir treino");
      })
      .finally(() => {
        setLoadingCompleteWorkoutSession(false);
      });
  };

  useEffect(() => {
    if (workouts.length > 0) {
      const workout = workouts.find((w) => w.id === id) || workouts[0];
      setSelectedWorkout(workout);
      setSelectedExercise(workout.exercises[0]);
    }
  }, [workouts, id, setSelectedExercise, setSelectedWorkout]);

  // useEffect(() => {
  //   console.log('workoutSession', workoutSession);

  // }, [workoutSession, setWorkoutSession]);

  useEffect(() => {
    const fetchWorkoutSession = async () => {
      axios
        .get("/workout/session", {
          params: {
            workoutId: id,
          },
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then(({ data }) => {
          setWorkoutSession(null);
          if (data) {
            setWorkoutSession({
              id: data.id,
              startedAt: data.startedAt,
              endedAt: data.endedAt,
              exercises: data.exercises.map((exercise: IExerciseSession) => ({
                id: exercise.id,
                series: exercise.series,
                repetitions: exercise.repetitions,
                weight: exercise.weight,
                restTime: exercise.restTime,
                completed: exercise.completed,
                exerciseId: exercise.exerciseId,
                name: exercise.name,
              })),
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchWorkoutSession();
  }, [id, setWorkoutSession, getToken]);

  useEffect(() => {
    console.log("selectedWorkout", selectedWorkout);
  }, [selectedWorkout]);

  useEffect(() => {
    console.log("workoutSession", workoutSession);
  }, [workoutSession]);

  if (!selectedWorkout) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-2 bg-white dark:bg-zinc-800 rounded-lg p-4 shadow mb-4 animate-pulse">
            <div className="w-full h-6 bg-zinc-300 dark:bg-zinc-700 rounded mb-3"></div>
            <div className="w-full h-10 bg-zinc-300 dark:bg-zinc-700 rounded mb-4"></div>

            <div className="flex md:flex-row flex-col items-center gap-2">
              <div className="w-full h-12 bg-zinc-300 dark:bg-zinc-700 rounded-md"></div>
              <div className="w-full h-12 bg-zinc-300 dark:bg-zinc-700 rounded-md"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4 animate-pulse">
              <div className="w-full h-6 bg-zinc-300 dark:bg-zinc-700 rounded mb-3"></div>
              <div className="w-full h-10 bg-zinc-300 dark:bg-zinc-700 rounded mb-4"></div>
            </div>
            <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4 animate-pulse">
              <div className="w-full h-6 bg-zinc-300 dark:bg-zinc-700 rounded mb-3"></div>
              <div className="w-full h-10 bg-zinc-300 dark:bg-zinc-700 rounded mb-4"></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 animate-pulse">
          <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4 h-96"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="flex flex-col gap-2 bg-white dark:bg-zinc-800 rounded-lg p-4 shadow mb-4">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            Treino: {selectedWorkout.name}
          </h3>
          <select
            className="w-full p-2 border rounded bg-white dark:bg-zinc-900"
            value={selectedWorkout.id}
            onChange={(e) => {
              navigate(`/workout/${e.target.value}`);
              const workout = workouts.find((w) => w.id === e.target.value);
              if (workout) {
                setSelectedWorkout(workout);
                setSelectedExercise(workout.exercises[0]);
              }
            }}
          >
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>

          <div className="flex md:flex-row flex-col items-center gap-2">
            {workoutSessionCompleted() ? (
              <button className="flex flex-row flex-1 md:w-auto w-full items-center justify-center gap-4 text-white bg-zinc-500 hover:bg-zinc-600 cursor-not-allowed transition-all rounded-md p-2">
                Treino Concluído
              </button>
            ) : workoutSessionInProgress() ? (
              <button
                onClick={handleCompleteWorkoutSession}
                className={`flex flex-row flex-1 md:w-auto w-full items-center justify-center gap-4 text-white bg-green-500 hover:bg-green-600 transition-all rounded-md p-2 ${
                  loadingCompleteWorkoutSession
                    ? "cursor-not-allowed opacity-75"
                    : ""
                }`}
              >
                Concluir Treino
              </button>
            ) : (
              <button
                onClick={handleStartWorkoutSession}
                className={`flex flex-row items-center justify-center md:w-auto w-full flex-1 gap-4 text-white bg-blue-500 hover:bg-blue-600 transition-all rounded-md p-2 ${
                  loadingStartWorkoutSession
                    ? "cursor-not-allowed opacity-75"
                    : ""
                }`}
              >
                Iniciar Treino
              </button>
            )}
            {workoutSessionInProgress() ? (
              <button
                onClick={handleStopWorkoutSession}
                className={`flex flex-1 flex-row items-center  md:w-auto w-full justify-center gap-4 text-white bg-red-500 hover:bg-red-600 transition-all p-2 rounded-lg ${
                  loadingStopWorkoutSession
                    ? "cursor-not-allowed opacity-75"
                    : ""
                }`}
              >
                Parar Treino
              </button>
            ) : (
              <button
                onClick={() => setIsModalDeleteWorkoutOpen(true)}
                className={`flex flex-1 flex-row items-center  md:w-auto w-full justify-center gap-4 text-white bg-red-500 hover:bg-red-600 transition-all p-2 rounded-lg`}
              >
                Excluir Treino
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {!workoutSessionInProgress() ? (
            <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                Exercícios
              </h3>
              {selectedWorkout.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isActive={exercise.id === selectedExercise?.id}
                  onSelect={() => setSelectedExercise(exercise)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  Exercícios Pendentes
                </h3>
                {getUncompletedExercisesWithDetails()?.length === 0 ? (
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Parabéns! Você concluiu todos os exercícios. Se desejar,
                    revise os exercícios finalizados ou finalize o treino.
                  </p>
                ) : (
                  getUncompletedExercisesWithDetails()?.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      isActive={exercise.id === selectedExercise?.id}
                      onSelect={() => setSelectedExercise(exercise)}
                    />
                  ))
                )}
              </div>
              <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  Exercícios Finalizados
                </h3>
                {getCompletedExercisesWithDetails()?.length === 0 ? (
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Nenhum exercício foi concluído ainda. Continue se esforçando
                    e finalize seus exercícios!
                  </p>
                ) : (
                  getCompletedExercisesWithDetails()?.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      isActive={exercise.id === selectedExercise?.id}
                      onSelect={() => setSelectedExercise(exercise)}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        <WorkoutDetails exercise={selectedExercise} />
      </div>

      <Modal
        isOpen={isModalDeleteWorkoutOpen}
        onClose={() => setIsModalDeleteWorkoutOpen(false)}
        onConfirm={handleDeleteWorkout}
        loading={isDeleting}
        title="Excluir Treino"
        content="Tem certeza que deseja excluir esse treino? Todos os exercícios relacionados a ele serão excluídos."
      />

      <Modal
        isOpen={isModalCompleteWorkoutOpen}
        onClose={() => setIsModalCompleteWorkoutOpen(false)}
        onConfirm={() => {
          setIsModalCompleteWorkoutOpen(false);
          postCompleteWorkoutSession();
        }}
        title="Concluir Treino"
        content="Tem certeza que deseja concluir esse treino? Existem exercícios não completados. Deseja concluir o treino mesmo assim?"
      />
    </div>
  );
}

export default WorkoutDetailsPage;
