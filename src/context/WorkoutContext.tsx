import { Visibility } from "@/pages/WorkoutRegister";
import { useAuth, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";

export interface IWorkout {
  id: string;
  name: string;
  user: IUser;
  visibility: Visibility;
  exercises: IExercise[];
  likes: IWorkoutLikes[];
}

export interface IUser {
  id: string;
  name: string;
  avatar: string;
}

export interface IWorkoutStats {
  totalExercises: number;
  completedExercises: number;
  completionRate: string;
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
  stats: IWorkoutStats;
}

export interface IWorkoutLikes {
  userId: string;
}

export interface IExercise {
  id?: string | undefined;
  name: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
  videoUrl: string;
  imageUrl?: string;
  instructions: string;
  muscleGroup?: IMuscleGroup;
}

export interface IMuscleGroup {
  id: string;
  name: string;
  image: string | undefined;
  description: string | undefined;
  exercises: IExercise[] | undefined;
}

export interface IExerciseSession {
  id: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
  completed: boolean;
  exercise: {
    id: string;
    name: string;
  };
}
export interface IWorkoutSession {
  id: string;
  startedAt: string;
  endedAt: string | null;
  exercises: IExerciseSession[];
}

interface WorkoutContextType {
  workouts: IWorkout[];
  workoutsLoaded: boolean;
  loadingWorkouts: boolean;
  selectedExercise: IExercise | null;
  selectedWorkout: IWorkout | null;
  workoutSession: IWorkoutSession | null;
  loadingWorkoutHistory: boolean;
  workoutHistory: IWorkoutHistory[];
  muscleGroups: IMuscleGroup[];
  loadingMuscleGroups: boolean;
  fetchWorkouts: () => void;
  addWorkout: (
    name: string,
    visibility: Visibility,
    userId: string,
    exercises: IExercise[]
  ) => Promise<void>;
  appendWorkout: (workout: IWorkout) => void;
  isWorkoutsEmpty: () => boolean;
  setSelectedExercise: (exercise: IExercise | null) => void;
  setSelectedWorkout: (workout: IWorkout | null) => void;
  deleteExercise: (exerciseId: string) => void;
  deleteWorkout: (workoutId: string) => void;
  isLastExerciseInWorkout: (
    workout: IWorkout | undefined,
    exerciseId: string
  ) => boolean;
  getWorkoutByExerciseId: (exerciseId: string) => IWorkout | undefined;
  setWorkoutSession: (workoutSession: IWorkoutSession | null) => void;
  workoutSessionInProgress: () => boolean;
  workoutSessionCompleted: () => boolean;
  existExercisesUncompleted: () => boolean | undefined;
  getUncompletedExercisesWithDetails: () => IExercise[] | undefined;
  getCompletedExercisesWithDetails: () => IExercise[] | undefined;
  fetchWorkoutHistory: () => void;
  getMuscleGroups: () => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

interface WorkoutProviderProps {
  children: ReactNode;
}

export const WorkoutProvider: FC<WorkoutProviderProps> = ({ children }) => {
  const { user } = useClerk();
  const { getToken } = useAuth();

  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [workoutsLoaded, setWorkoutsLoaded] = useState(false);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<IWorkout | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
    null
  );
  const [workoutSession, setWorkoutSession] = useState<IWorkoutSession | null>(
    null
  );
  const [loadingWorkoutHistory, setLoadingWorkoutHistory] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState<IWorkoutHistory[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<IMuscleGroup[]>([]);
  const [loadingMuscleGroups, setLoadingMuscleGroups] = useState(false);

  const getUncompletedExercisesWithDetails = () => {
    return workoutSession?.exercises
      .filter((exerciseSession) => !exerciseSession.completed)
      .map((exerciseSession) => {
        const workout = workouts.find((workout) =>
          workout.exercises.some(
            (exercise) => exercise.id === exerciseSession.exercise.id
          )
        );

        const exercise = workout?.exercises.find(
          (exercise) => exercise.id === exerciseSession.exercise.id
        );

        return exercise;
      })
      .filter((exercise) => exercise !== undefined);
  };

  const getCompletedExercisesWithDetails = () => {
    return workoutSession?.exercises
      .filter((exerciseSession) => exerciseSession.completed)
      .map((exerciseSession) => {
        const workout = workouts.find((workout) =>
          workout.exercises.some(
            (exercise) => exercise.id === exerciseSession.exercise.id
          )
        );

        const exercise = workout?.exercises.find(
          (exercise) => exercise.id === exerciseSession.exercise.id
        );

        return exercise;
      })
      .filter((exercise) => exercise !== undefined);
  };

  const workoutSessionInProgress = () => {
    return workoutSession !== null && workoutSession.endedAt === null;
  };

  const workoutSessionCompleted = () => {
    return workoutSession !== null && workoutSession.endedAt !== null;
  };

  const existExercisesUncompleted = () => {
    return workoutSession?.exercises.some((exercise) => !exercise.completed);
  };

  const getWorkoutByExerciseId = (exerciseId: string) => {
    return workouts.find((workout) =>
      workout.exercises.some((exercise) => exercise.id === exerciseId)
    );
  };

  const isLastExerciseInWorkout = (
    workout: IWorkout | undefined,
    exerciseId: string
  ) => {
    return (
      workout?.exercises.length === 1 && workout?.exercises[0].id === exerciseId
    );
  };

  const deleteExercise = async (exerciseId: string) => {
    const updatedWorkouts = workouts.map((workout) => {
      const updatedExercises = workout.exercises.filter(
        (exercise) => exercise.id !== exerciseId
      );
      return { ...workout, exercises: updatedExercises };
    });
    setWorkouts(updatedWorkouts);
    setSelectedExercise(
      selectedWorkout?.exercises[0] ?? updatedWorkouts[0].exercises[0]
    );
    toast.success("Exercício deletado com sucesso");
  };

  const deleteWorkout = async (workoutId: string) => {
    const updatedWorkouts = workouts.filter(
      (workout) => workout.id !== workoutId
    );
    setWorkouts(updatedWorkouts);
    setSelectedWorkout(null);
    toast.success("Treino deletado com sucesso");
  };

  const isWorkoutsEmpty = () => {
    return workouts.length === 0;
  };

  const appendWorkout = (workout: IWorkout) => {
    setWorkouts([...workouts, workout]);
  };

  const fetchWorkouts = async () => {
    setLoadingWorkouts(true);
    axios
      .get("/workout", {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        params: {
          userId: user?.id,
          exercises: true,
          likes: true,
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(({ data }) => {
        setWorkouts(data);
        setWorkoutsLoaded(true);
        setLoadingWorkouts(false);
      })
      .catch((error) => {
        setWorkoutsLoaded(false);
        const title = error.response?.data?.message;
        const errors: Record<string, { field: string; message: string }> =
          error.response?.data?.errors;
        if (errors) {
          Object.values(errors).forEach((errorMessages) => {
            toast.error(errorMessages.message);
          });
        } else {
          toast.error(title || "Erro ao buscar os treinos");
        }
      });
  };

  const getMuscleGroups = useCallback(async () => {
    setLoadingMuscleGroups(true);
    axios
      .get("/muscle-group", {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(({ data }) => {
        setMuscleGroups(data);
        setLoadingMuscleGroups(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Erro ao buscar os grupos musculares"
        );
      });
  }, [getToken]);

  const addWorkout = async (
    name: string,
    visibility: Visibility,
    userId: string,
    exercises: IExercise[]
  ) => {
    return axios
      .post(
        "/workout",
        {
          name,
          visibility,
          userId,
          exercises,
        },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )
      .then(({ data }) => {
        setWorkouts([...workouts, data]);
        toast.success("Treino cadastrado com sucesso");
      })
      .catch((error) => {
        const title = error.response?.data?.message;
        const errors: Record<string, { field: string; message: string }> =
          error.response?.data?.errors;

        if (errors) {
          Object.values(errors).forEach((errorMessages) => {
            toast.error(errorMessages.message);
          });
        } else {
          toast.error(title || "Erro ao cadastrar treino");
        }
      });
  };

  const fetchWorkoutHistory = useCallback(async () => {
    setLoadingWorkoutHistory(true);
    axios
      .get("/workout/history", {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        params: {
          userId: user?.id,
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(({ data }) => {
        setWorkoutHistory(data);
        setLoadingWorkoutHistory(false);
      })
      .catch((error) => {
        const title = error.response?.data?.message;
        const errors: Record<string, { field: string; message: string }> =
          error.response?.data?.errors;
        if (errors) {
          Object.values(errors).forEach((errorMessages) => {
            toast.error(errorMessages.message);
          });
        } else {
          toast.error(title || "Erro ao buscar o histórico de treinos");
        }
      });
  }, [user?.id]);

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        fetchWorkouts,
        addWorkout,
        workoutsLoaded,
        appendWorkout,
        isWorkoutsEmpty,
        loadingWorkouts,
        selectedExercise,
        setSelectedExercise,
        selectedWorkout,
        setSelectedWorkout,
        deleteExercise,
        deleteWorkout,
        getWorkoutByExerciseId,
        isLastExerciseInWorkout,
        workoutSession,
        setWorkoutSession,
        workoutSessionInProgress,
        workoutSessionCompleted,
        existExercisesUncompleted,
        getUncompletedExercisesWithDetails,
        getCompletedExercisesWithDetails,
        loadingWorkoutHistory,
        fetchWorkoutHistory,
        workoutHistory,
        muscleGroups,
        getMuscleGroups,
        loadingMuscleGroups,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
