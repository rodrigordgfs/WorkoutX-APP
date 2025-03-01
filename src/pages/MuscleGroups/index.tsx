import { Dumbbell } from "lucide-react";
import { useEffect } from "react";
import { Loading } from "@/components/MuscleGroupPage/Loading";
import { MuscleGroupCard } from "@/components/MuscleGroupPage/MuscleGroupCard";
import { useWorkout } from "@/context/WorkoutContext";
import { SectionTitle } from "@/components/Shared/SectionTitle";

export function MuscleGroupsPage() {
  const { getMuscleGroups, muscleGroups, loadingMuscleGroups } = useWorkout();

  useEffect(() => {
    getMuscleGroups();
  }, [getMuscleGroups]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SectionTitle icon={Dumbbell} title="Grupos Musculares" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingMuscleGroups
          ? Array(4)
              .fill(0)
              .map((_, i) => <Loading key={i} />)
          : muscleGroups.map((group) => (
              <MuscleGroupCard
                key={group.id}
                id={group.id}
                image={group.image || ""}
                name={group.name}
                description={group.description || ""}
              />
            ))}
      </div>
    </div>
  );
}
