import workoutService from "@/services/workout";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { toast } from 'react-toastify';

export interface Workout {
    id: string;
    name: string;
    userId: string;
    exercises: Exercise[];
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
    isWorkoutsLoaded: () => Promise<boolean>;
    addWorkout: (name: string, userId: string, exercises: Exercise[]) => Promise<void>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

interface WorkoutProviderProps {
    children: ReactNode;
}

export const WorkoutProvider: FC<WorkoutProviderProps> = ({ children }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    const fetchWorkouts = async (userId?: string | undefined) => {
        workoutService.get({ userId })
            .then(({ data }) => {
                setWorkouts(data);
            })
            .catch((error) => {
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

    const addWorkout = async (name: string, userId: string, exercises: Exercise[]) => {
        return workoutService.post({ name, userId, exercises })
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

    const isWorkoutsLoaded = async () => {
        return workouts.length > 0;
    }

    return (
        <WorkoutContext.Provider value={{ workouts, fetchWorkouts, isWorkoutsLoaded, addWorkout }}>
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