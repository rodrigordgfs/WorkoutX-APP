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
