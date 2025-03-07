import { Dumbbell } from "lucide-react";
import { useEffect } from "react";
import { Loading } from "@/components/MuscleGroupPage/Loading";
import { MuscleGroupCard } from "@/components/MuscleGroupPage/MuscleGroupCard";
import { useWorkout } from "@/context/WorkoutContext";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import MuscleGroupEmpty from "@/components/MuscleGroupPage/MuscleGroupEmpty";

export function MuscleGroupsPage() {
  const { getToken } = useAuth();
  const { getMuscleGroups, muscleGroups, loadingMuscleGroups } = useWorkout();

  useEffect(() => {
    getMuscleGroups();
  }, [getMuscleGroups]);

  const handleDeleteMuscleGroup = async (id: string) => {
    axios
      .delete(`/muscle-group/${id}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(() => {
        getMuscleGroups();
      })
      .catch((error) => {
        toast.error("Falha ao deletar grupo muscular!");
        console.error("Failed to delete muscle group", error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SectionTitle icon={Dumbbell} title="Grupos Musculares" />

      {loadingMuscleGroups ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Loading key={i} />
            ))}
        </div>
      ) : muscleGroups.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {muscleGroups.map((group) => (
              <MuscleGroupCard
                key={group.id}
                id={group.id}
                image={group.image || ""}
                name={group.name}
                description={group.description || ""}
                onDelete={handleDeleteMuscleGroup}
              />
            ))}
          </div>
        </div>
      ) : (
        <MuscleGroupEmpty />
      )}
    </div>
  );
}
