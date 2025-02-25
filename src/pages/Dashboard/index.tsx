import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Activity, Calendar, Clock, BarChart3, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useClerk } from "@clerk/clerk-react";
import { StatusCard } from "@/components/DashboardPage/StatusCard";
import { Loading } from "@/components/DashboardPage/Loading";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { WeeklyTrainingVolumeChart } from "@/components/DashboardPage/WeeklyTrainingVolumeChart";
import { MostPerformedExercisesChart } from "@/components/DashboardPage/MostPerformedExercisesChart";
import { RecentActivity } from "@/components/DashboardPage/RecentActivity";

interface IWorkoutExercicesAmmount {
  exercise: {
    id: string;
    name: string;
  };
  count: number;
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function DashboardPage() {
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

  useEffect(() => {
    setLoading(true);
    const fetchWorkoutDashboard = () => {
      axios
        .get("/workout/dashboard", {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          params: {
            userId: user?.id,
          },
        })
        .then(({ data }) => {
          setWorkoutMonthAmmount(data.workoutMonthAmmount);
          setWorkoutPercentageChange(data.workoutPercentageChange);
          setConsecutiveWorkoutDays(data.consecutiveWorkoutDays);
          setAverageWorkoutDuration(data.averageWorkoutDuration);
          setCompletionRate(data.completionRate);
          const exercisesAmmount: Record<string, number> =
            data.workoutExercises.reduce(
              (
                acc: Record<string, number>,
                workout: IWorkoutExercicesAmmount
              ) => {
                acc[workout.exercise.name] = workout.count;
                return acc;
              },
              {}
            );
          setWorkoutExercisesAmmount(exercisesAmmount);
          setWeeklyTrainingVolume(data.volumeWorkoutExercises);
          setRecentsActivities(data.recentActivities);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);

          const title = error.response?.data?.message;
          const errors: Record<string, { field: string; message: string }> =
            error.response?.data?.errors;
          if (errors) {
            Object.values(errors).forEach((errorMessages) => {
              toast.error(errorMessages.message);
            });
          } else {
            toast.error(title || "Erro ao buscar o dashboard de treinos");
          }
        });
    };

    fetchWorkoutDashboard();
  }, [user]);
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle icon={BarChart3} title="Dashboard" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatusCard
              icon={Activity}
              title="Treinos este mês"
              value={workoutMonthAmmount}
              trend={`${workoutPercentageChange}% vs. mês anterior`}
            />
            <StatusCard
              icon={Calendar}
              title="Sequência atual"
              value={`${consecutiveWorkoutDays} dias`}
              color="green"
            />
            <StatusCard
              icon={Clock}
              title="Duração média"
              value={`${Number(averageWorkoutDuration).toFixed(0)}min`}
              color="yellow"
            />
            <StatusCard
              icon={Trophy}
              title="Taxa de conclusão"
              value={`${Number(completionRate).toFixed(0)}%`}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WeeklyTrainingVolumeChart value={weeklyTrainingVolume} />
            <MostPerformedExercisesChart value={workoutExercisesAmmount} />
          </div>

          <RecentActivity activities={recentsActivities} />
        </>
      )}
    </div>
  );
}
