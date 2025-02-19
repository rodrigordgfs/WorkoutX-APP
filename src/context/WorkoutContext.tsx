import { Visibility } from "@/pages/WorkoutRegister";
import workoutService from "@/services/workout";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { toast } from 'react-toastify';

export interface Workout {
    id: string;
    name: string;
    user: User;
    visibility: Visibility;
    exercises: Exercise[];
    likes: WorkoutLikes[];
}

export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface WorkoutLikes {
    userId: string;
}

export interface Exercise {
    id?: string | undefined;
    name: string;
    series: string;
    repetitions: string;
    weight: string;
    restTime: string;
    videoUrl: string;
    instructions: string;
}

interface WorkoutContextType {
    workouts: Workout[];
    fetchWorkouts: (userId?: string | undefined) => void;
    workoutsLoaded: boolean;
    addWorkout: (name: string, visibility: Visibility, userId: string, exercises: Exercise[]) => Promise<void>;
    appendWortkout: (workout: Workout) => void;
    isWorkoutsEmpty: () => boolean;
    loadingWorkouts: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

interface WorkoutProviderProps {
    children: ReactNode;
}

export const WorkoutProvider: FC<WorkoutProviderProps> = ({ children }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [workoutsLoaded, setWorkoutsLoaded] = useState(false);
    const [loadingWorkouts, setLoadingWorkouts] = useState(false);

    const isWorkoutsEmpty = () => {
        return workouts.length === 0;
    }

    const appendWortkout = (workout: Workout) => {
        setWorkouts([...workouts, workout]);
    }

    const fetchWorkouts = async (userId?: string | undefined) => {
        setLoadingWorkouts(true);
        workoutService.get({ userId })
            .then(({ data }) => {
                setWorkouts(data);
                setWorkoutsLoaded(true);
                setLoadingWorkouts(false);
            })
            .catch((error) => {
                setWorkoutsLoaded(false);
                const title = error.response?.data?.message;
                const errors: Record<string, { field: string; message: string }> = error.response?.data?.errors;
                if (errors) {
                    Object.values(errors).forEach((errorMessages) => {
                        toast.error(errorMessages.message);
                    });
                } else {
                    toast.error(title || "Erro ao buscar os treinos");
                }
            });
    };

    const addWorkout = async (name: string, visibility: Visibility, userId: string, exercises: Exercise[]) => {
        return workoutService.post({ name, userId, visibility, exercises })
            .then(({ data }) => {
                setWorkouts([...workouts, data]);
                toast.success('Treino cadastrado com sucesso');
            })
            .catch((error) => {
                const title = error.response?.data?.message;
                const errors: Record<string, { field: string; message: string }> = error.response?.data?.errors;

                if (errors) {
                    Object.values(errors).forEach((errorMessages) => {
                        toast.error(errorMessages.message);
                    });
                } else {
                    toast.error(title || "Erro ao cadastrar treino");
                }
            });
    };

    return (
        <WorkoutContext.Provider value={{ workouts, fetchWorkouts, addWorkout, workoutsLoaded, appendWortkout, isWorkoutsEmpty, loadingWorkouts }}>
            {children}
        </WorkoutContext.Provider>
    );
}

export const useWorkout = (): WorkoutContextType => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error('useWorkout must be used within a WorkoutProvider');
    }
    return context;
}