import { useSearchParams } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { LoadingPage } from "@/components/ExercisesPage/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import { ExerciseCard } from "@/components/ExercisesPage/ExerciseCard";
import { useAuth } from "@clerk/clerk-react";
import { IExercise, IMuscleGroup } from "@/context/WorkoutContext";
import ExercisesEmpty from "@/components/ExercisesPage/ExercisesEmpty";
import { Filter } from "@/components/Shared/Filter";

interface IMuscleGroupOption {
  label: string;
  value: string;
}

export function ExercisesPage() {
  const { getToken } = useAuth();
  const [searchParams] = useSearchParams();
  const muscleGroupId = searchParams.get("muscleGroupId") || null;

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [muscleGroupName, setMuscleGroupName] = useState<string | null>("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [muscleGroups, setMuscleGroups] = useState<IMuscleGroupOption[]>([]);
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<string>("");

  const fetchMuscleGroups = useCallback(async () => {
    setLoading(true);

    axios
      .get("/muscle-group", {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(({ data }) => {
        setMuscleGroups(
          data.map((group: IMuscleGroup) => {
            return {
              label: group.name,
              value: group.id,
            };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "Erro ao buscar os dados dos grupos musculares"
        );
      });
  }, [getToken]);

  const fetchExercises = useCallback(
    async (params: { name?: string; muscleGroup?: string }) => {
      setLoading(true);

      const queryParams: Record<string, string | boolean> = { muscleGroup: true };
      if (muscleGroupId) queryParams.muscleGroupId = muscleGroupId;
      if (params.muscleGroup) queryParams.muscleGroupId = params.muscleGroup;
      if (params.name) queryParams.name = params.name;

      axios
        .get("/exercise", {
          params: queryParams,
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then(({ data }) => {
          setExercises(data);
          fetchMuscleGroups();
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            error.response?.data?.message ||
              "Erro ao buscar os dados dos exercícios"
          );
        });
    },
    [getToken, muscleGroupId, fetchMuscleGroups]
  );

  useEffect(() => {
    if (muscleGroupId && exercises.length > 0) {
      setMuscleGroupName(exercises[0]?.muscleGroup?.name || "Desconhecido");
    }
  }, [exercises, muscleGroupId]);

  useEffect(() => {
    fetchExercises({});
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
        <div className="flex flex-col">
          <Filter
            filterModalOpen={filterModalOpen}
            onFilter={(text: string) => {
              fetchExercises({
                name: text,
                muscleGroup: muscleGroupFilter,
              });
            }}
            toogleFilterOpen={setFilterModalOpen}
          >
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                Grupo Muscular
              </label>
              <select
                onChange={(e) => setMuscleGroupFilter(e.target.value)}
                value={muscleGroupFilter}
                className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300"
              >
                {muscleGroups.map((option: IMuscleGroupOption) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </Filter>

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
        </div>
      )}
    </div>
  );
}