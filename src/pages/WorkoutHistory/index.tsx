import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { Loading } from "@/components/WorkoutHistoryPage/Loading";
import { WorkoutHistoryCard } from "@/components/WorkoutHistoryPage/WorkoutHistoryCard";
import { useWorkout } from "@/context/WorkoutContext";
import WorkoutHistoryEmpty from "@/components/WorkoutHistoryPage/WorkoutHistoryEmpty";
import { Filter } from "@/components/Shared/Filter";

function getStatusColor(completionRate: string) {
  const rate = parseInt(completionRate);
  if (rate === 100) return "text-green-600";
  if (rate > 50) return "text-yellow-600";
  return "text-blue-600";
}

const periodOptions = [
  { label: "Último mês", value: "last_month" },
  { label: "Últimos 3 meses", value: "last_3_months" },
  { label: "Último ano", value: "last_year" },
  { label: "Todos", value: "all" },
];

const statusOptions = [
  { label: "Concluídos", value: "completed" },
  { label: "Em andamento", value: "in_progress" },
  { label: "Todos", value: "all" },
];

const orderOptions = [
  { label: "Mais recentes", value: "desc" },
  { label: "Mais antigos", value: "asc" },
];

export function WorkoutHistoryPage() {
  const { loadingWorkoutHistory, workoutHistory, fetchWorkoutHistory } =
    useWorkout();

  const [expandedWorkouts, setExpandedWorkouts] = useState<string[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [periodFilter, setPeriodFilter] = useState("last_month");
  const [statusFilter, setStatusFilter] = useState("completed");
  const [orderFilter, setOrderFilter] = useState("desc");

  useEffect(() => {
    fetchWorkoutHistory();
  }, [fetchWorkoutHistory]);

  const toggleWorkout = (workoutId: string) => {
    setExpandedWorkouts((current) =>
      current.includes(workoutId)
        ? current.filter((id) => id !== workoutId)
        : [...current, workoutId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle title="Histórico de Treinos" icon={Calendar} />

      <Filter
        filterModalOpen={filterModalOpen}
        onFilter={(text) => {
          fetchWorkoutHistory({
            period: periodFilter,
            status: statusFilter,
            order: orderFilter,
            name: text,
          });
        }}
        toogleFilterOpen={setFilterModalOpen}
      >
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Período
          </label>
          <select
            onChange={(e) => setPeriodFilter(e.target.value)}
            value={periodFilter}
            className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Status
          </label>
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Ordenar por
          </label>
          <select
            onChange={(e) => setOrderFilter(e.target.value)}
            value={orderFilter}
            className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300"
          >
            {orderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Filter>

      <div className="space-y-4">
        {loadingWorkoutHistory ? (
          <Loading />
        ) : workoutHistory.length === 0 ? (
          <WorkoutHistoryEmpty />
        ) : (
          <>
            {workoutHistory.map((workout) => {
              const isExpanded = expandedWorkouts.includes(workout.id);
              const statusColor = getStatusColor(workout.stats.completionRate);

              return (
                <WorkoutHistoryCard
                  key={workout.id}
                  workout={workout}
                  isExpanded={isExpanded}
                  statusColor={statusColor}
                  toogleWorkout={toggleWorkout}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
