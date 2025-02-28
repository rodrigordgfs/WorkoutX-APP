import { useParams } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { LoadingPage } from "@/components/ExercisesPage/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import { ExerciseCard } from "@/components/ExercisesPage/ExerciseCard";

interface IExercise {
  id: string;
  muscleGroupId: string;
  name: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
  instruction: string;
  imageUrl: string;
  videoUrl: string;
}

interface IMuscleGroup {
  id: string;
  name: string;
  description: string;
  exercises: IExercise[];
}

export function ExercisesPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [muscleGroup, setMuscleGroup] = useState<IMuscleGroup | null>(null);

  const fetchMuscleGroup = useCallback(async () => {
    setLoading(true);
    axios
      .get(`/muscle-group/${id}`, {
        baseURL: import.meta.env.VITE_API_BASE_URL,
      })
      .then(({ data }) => {
        setMuscleGroup(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "Erro ao buscar os dados do grupo muscular"
        );
      });
  }, [id]);

  useEffect(() => {
    fetchMuscleGroup();
  }, [id, fetchMuscleGroup]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SectionTitle
        icon={Dumbbell}
        title={`Exercícios: ${muscleGroup?.name}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <LoadingPage key={index} />
            ))
          : muscleGroup?.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                instruction={exercise.instruction}
                image={exercise.imageUrl}
                name={exercise.name}
                repetitions={exercise.repetitions}
                restTime={exercise.restTime}
                series={exercise.series}
                weight={exercise.weight}
              />
            ))}
      </div>
    </div>
  );
}
