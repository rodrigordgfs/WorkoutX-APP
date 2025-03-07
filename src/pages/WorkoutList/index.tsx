import { Dumbbell, Plus } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import { useState } from "react";
import WorkoutEmpty from "../../components/WorkoutEmpty";
import WorkoutLoading from "../../components/WorkoutLoading";
import WorkoutListItem from "@/components/WorkoutListItem";
import { SectionTitle } from "@/components/Shared/SectionTitle";

export function WorkoutsListPage() {
  const { workouts, isWorkoutsEmpty, loadingWorkouts } = useWorkout();
  const [openWorkouts, setOpenWorkouts] = useState<string[]>([]);

  const toggleWorkout = (workoutId: string) => {
    setOpenWorkouts((current) =>
      current.includes(workoutId)
        ? current.filter((id) => id !== workoutId)
        : [...current, workoutId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle
        icon={Dumbbell}
        title="Meus Treinos"
        goTo="/workout/new"
        iconGoTo={Plus}
        textGoTo="Novo Treino"
      />

      {loadingWorkouts && <WorkoutLoading />}

      {isWorkoutsEmpty() && <WorkoutEmpty />}

      <div className="grid gap-4">
        {workouts.map((wk) => {
          const isOpen = openWorkouts.includes(wk.id);
          return (
            <WorkoutListItem
              key={wk.id}
              workout={wk}
              isOpen={isOpen}
              onToggle={toggleWorkout}
            />
          );
        })}
      </div>
    </div>
  );
}
