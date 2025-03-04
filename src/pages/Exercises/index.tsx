import { useSearchParams } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { LoadingPage } from "@/components/ExercisesPage/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import { ExerciseCard } from "@/components/ExercisesPage/ExerciseCard";
import { useAuth } from "@clerk/clerk-react";
import { IExercise } from "@/context/WorkoutContext";
import ExercisesEmpty from "@/components/ExercisesPage/ExercisesEmpty";

export function ExercisesPage() {
  const { getToken } = useAuth();
  const [searchParams] = useSearchParams();
  const muscleGroupId = searchParams.get("muscleGroupId") || null;

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [muscleGroupName, setMuscleGroupName] = useState<string | null>("");

  const fetchExercises = useCallback(async () => {
    setLoading(true);

    const params: Record<string, string | boolean> = { muscleGroup: true };
    if (muscleGroupId) params.muscleGroupId = muscleGroupId;

    axios
      .get("/exercise", {
        params,
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(({ data }) => {
        setExercises(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "Erro ao buscar os dados dos exercícios"
        );
      });
  }, [getToken, muscleGroupId]);

  useEffect(() => {
    if (muscleGroupId && exercises.length > 0) {
      setMuscleGroupName(exercises[0]?.muscleGroup?.name || "Desconhecido");
    }
  }, [exercises, muscleGroupId]);

  useEffect(() => {
    fetchExercises();
  }, [muscleGroupId, fetchExercises]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SectionTitle
        icon={Dumbbell}
        title={`${
          muscleGroupId
            ? `${
                exercises.length > 0
                  ? `Exercícios: ${muscleGroupName}`
                  : "Exercícios"
              }`
            : "Exercícios"
        }`}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingPage key={index} />
          ))}
        </div>
      ) : exercises.length === 0 ? (
        <ExercisesEmpty />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              repetitions={exercise.repetitions}
              restTime={exercise.restTime}
              series={exercise.series}
              weight={exercise.weight}
              image={exercise.imageUrl}
              instruction={exercise.instructions}
            />
          ))}
        </div>
      )}
    </div>
  );
}
