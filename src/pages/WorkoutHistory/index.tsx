import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { FilterHistory } from "@/components/WorkoutHistoryPage/Filter";
import { Loading } from "@/components/WorkoutHistoryPage/Loading";
import { WorkoutHistoryCard } from "@/components/WorkoutHistoryPage/WorkoutHistoryCard";
import { useWorkout } from "@/context/WorkoutContext";
import WorkoutHistoryEmpty from "@/components/WorkoutHistoryPage/WorkoutHistoryEmpty";

function getStatusColor(completionRate: string) {
  const rate = parseInt(completionRate);
  if (rate === 100) return "text-green-600";
  if (rate > 50) return "text-yellow-600";
  return "text-blue-600";
}

export function WorkoutHistoryPage() {
  const { loadingWorkoutHistory, workoutHistory, fetchWorkoutHistory } =
    useWorkout();

  const [expandedWorkouts, setExpandedWorkouts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);

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

      {workoutHistory.length > 0 && (
        <FilterHistory
          filterModalOpen={filterModalOpen}
          search={searchTerm}
          onSearchChange={setSearchTerm}
          toogleFilterOpen={setFilterModalOpen}
        />
      )}

      <div className="space-y-4">
        {loadingWorkoutHistory ? (
          <Loading />
        ) : workoutHistory.length === 0 ? (
          <WorkoutHistoryEmpty />
        ) : (
          workoutHistory.map((workout) => {
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
          })
        )}
      </div>
    </div>
  );
}
