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
import { useEffect } from "react";
import { StatusCard } from "@/components/DashboardPage/StatusCard";
import { Loading } from "@/components/DashboardPage/Loading";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { WeeklyTrainingVolumeChart } from "@/components/DashboardPage/WeeklyTrainingVolumeChart";
import { MostPerformedExercisesChart } from "@/components/DashboardPage/MostPerformedExercisesChart";
import { RecentActivity } from "@/components/DashboardPage/RecentActivity";
import { useDashboard } from "@/context/DashboardContext";

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
  const {
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
  } = useDashboard();

  useEffect(() => {
    fetchWorkoutDashboard();
  }, [fetchWorkoutDashboard]);

  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle icon={BarChart3} title="Dashboard" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatusCard
              title="Treinos este mês"
              value={workoutMonthAmmount}
              trend={`${workoutPercentageChange}% vs. mês anterior`}
            >
              <div className="p-3 bg-blue-500 dark:bg-blue-600 text-white dark:text-blue-200 rounded-lg">
                <Activity size={24} />
              </div>
            </StatusCard>
            <StatusCard
              title="Sequência atual"
              value={`${consecutiveWorkoutDays} dias`}
            >
              <div className="p-3 bg-green-500 dark:bg-green-600 text-white dark:text-green-200 rounded-lg">
                <Calendar size={24} />
              </div>
            </StatusCard>
            <StatusCard
              title="Duração média"
              value={`${Number(averageWorkoutDuration).toFixed(0)}min`}
            >
              <div className="p-3 bg-pink-500 dark:bg-pink-600 text-white dark:text-pink-200 rounded-lg">
                <Clock size={24} />
              </div>
            </StatusCard>
            <StatusCard
              title="Taxa de conclusão"
              value={`${Number(completionRate).toFixed(0)}%`}
            >
              <div className="p-3 bg-purple-500 dark:bg-purple-600 text-white dark:text-purple-200 rounded-lg">
                <Trophy size={24} />
              </div>
            </StatusCard>
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
