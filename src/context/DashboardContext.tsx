import { useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";

interface DashboardContextType {
  fetchWorkoutDashboard: () => void;
  loading: boolean;
  workoutMonthAmmount: number;
  workoutPercentageChange: number;
  consecutiveWorkoutDays: number;
  averageWorkoutDuration: number;
  completionRate: string;
  weeklyTrainingVolume: Record<string, number>;
  workoutExercisesAmmount: Record<string, number>;
  recentsActivities: IRecentActivity[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

export interface IRecentActivity {
  id: string;
  workout: {
    id: string;
    name: string;
  };
  exerciseCount: number;
  duration: number;
}

export interface IWorkoutExercicesAmmount {
  exercise: {
    id: string;
    name: string;
  };
  count: number;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { user } = useClerk();
  const [workoutMonthAmmount, setWorkoutMonthAmmount] = useState<number>(0);
  const [workoutPercentageChange, setWorkoutPercentageChange] =
    useState<number>(0);
  const [consecutiveWorkoutDays, setConsecutiveWorkoutDays] =
    useState<number>(0);
  const [averageWorkoutDuration, setAverageWorkoutDuration] =
    useState<number>(0);
  const [completionRate, setCompletionRate] = useState<string>("0");
  const [workoutExercisesAmmount, setWorkoutExercisesAmmount] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState<boolean>(false);
  const [recentsActivities, setRecentsActivities] = useState<IRecentActivity[]>(
    []
  );
  const [weeklyTrainingVolume, setWeeklyTrainingVolume] = useState<
    Record<string, number>
  >({});

  const fetchWorkoutDashboard = useCallback(() => {
    setLoading(true);
    axios
      .get("/workout/dashboard", {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        params: { userId: user?.id },
      })
      .then(({ data }) => {
        setWorkoutMonthAmmount(data.workoutMonthAmmount);
        setWorkoutPercentageChange(data.workoutPercentageChange);
        setConsecutiveWorkoutDays(data.consecutiveWorkoutDays);
        setAverageWorkoutDuration(data.averageWorkoutDuration);
        setCompletionRate(data.completionRate);
        setWorkoutExercisesAmmount(
          data.workoutExercises.reduce(
            (
              acc: Record<string, number>,
              workout: IWorkoutExercicesAmmount
            ) => {
              acc[workout.exercise.name] = workout.count;
              return acc;
            },
            {}
          )
        );
        setWeeklyTrainingVolume(
          Object.keys(data.volumeWorkoutExercises).reduce((acc, date) => {
            const dayAbbr = format(parseISO(date), "EEE", { locale: ptBR });
            const formattedDay =
              dayAbbr.charAt(0).toUpperCase() + dayAbbr.slice(1, 3);
            acc[formattedDay] = data.volumeWorkoutExercises[date];
            return acc;
          }, {} as Record<string, number>)
        );
        setRecentsActivities(data.recentActivities);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "Erro ao buscar o dashboard de treinos"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.id]);

  return (
    <DashboardContext.Provider
      value={{
        fetchWorkoutDashboard,
        loading,
        workoutMonthAmmount,
        workoutPercentageChange,
        consecutiveWorkoutDays,
        averageWorkoutDuration,
        completionRate,
        weeklyTrainingVolume,
        workoutExercisesAmmount,
        recentsActivities,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
