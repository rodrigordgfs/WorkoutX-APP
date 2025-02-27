import { Dumbbell } from "lucide-react";
import { useEffect } from "react";
import { Loading } from "@/components/MuscleGroupPage/Loading";
import { MuscleGroupCard } from "@/components/MuscleGroupPage/MuscleGroupCard";
import { useWorkout } from "@/context/WorkoutContext";

export function MuscleGroupsPage() {
  const { getMuscleGroups, muscleGroups, loadingMuscleGroups } = useWorkout();

  useEffect(() => {
    getMuscleGroups();
  }, [getMuscleGroups]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-lg">
          <Dumbbell size={24} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Grupos Musculares
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingMuscleGroups
          ? Array(4)
              .fill(0)
              .map((_, i) => <Loading key={i} />)
          : muscleGroups.map((group) => (
              <MuscleGroupCard
                key={group.id}
                id={group.id}
                image={group.image}
                name={group.name}
                description={group.description}
              />
            ))}
      </div>
    </div>
  );
}
