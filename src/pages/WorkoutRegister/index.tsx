import React, { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Search,
} from "lucide-react";
import { AIWorkoutFormData, AIWorkoutModal } from "@/components/AIWorkoutModal";
import axios from "axios";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { IMuscleGroup, useWorkout } from "@/context/WorkoutContext";

export type Visibility = "PUBLIC" | "PRIVATE";

export const VisibilityLabels: Record<Visibility, string> = {
  PUBLIC: "Público",
  PRIVATE: "Privado",
};

interface ExerciseData {
  id?: string | undefined;
  name: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
  videoUrl: string;
  imageUrl?: string;
  instructions: string;
  muscleGroup?: IMuscleGroup;
  completed?: boolean;
}

interface SelectedExercise {
  exercise: ExerciseData;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
}

export function WorkoutRegisterPage() {
  const { getToken } = useAuth();
  const { user } = useClerk();
  const { fetchWorkouts } = useWorkout();

  const [loading, setLoading] = useState(true);
  const [workoutName, setWorkoutName] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("PRIVATE");
  const [selectedExercises, setSelectedExercises] = useState<
    SelectedExercise[]
  >([]);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([""]);
  const [expandedExercises, setExpandedExercises] = useState<string[]>([]);
  const [availableExercises, setAvailableExercises] = useState<ExerciseData[]>(
    []
  );
  const [savingWorkout, setSavingWorkout] = useState(false);

  const fetchExercises = useCallback(async () => {
    setLoading(true);
    axios
      .get("/exercise", {
        params: {
          muscleGroup: true,
        },
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setAvailableExercises(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to register muscle group", error);
        toast.error("Falha ao buscar os exercícios!");
      });
  }, [getToken]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const toggleExerciseDetails = (id: string) => {
    setExpandedExercises((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const addExercise = (exercise: ExerciseData) => {
    if (selectedExercises.some((e) => e.exercise.id === exercise.id)) {
      return;
    }

    setSelectedExercises([
      ...selectedExercises,
      {
        exercise,
        series: exercise.series,
        repetitions: exercise.repetitions,
        weight: exercise.weight,
        restTime: exercise.restTime,
      },
    ]);
  };

  const removeExercise = (id: string) => {
    setSelectedExercises(selectedExercises.filter((e) => e.exercise.id !== id));
    setExpandedExercises(expandedExercises.filter((e) => e !== id));
  };

  const updateExerciseDetails = (
    id: string,
    field: keyof Omit<SelectedExercise, "exercise">,
    value: number | string
  ) => {
    setSelectedExercises((prev) =>
      prev.map((e) => (e.exercise.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ workoutName, visibility, exercises: selectedExercises });
    axios
      .post(
        "/workout",
        {
          name: workoutName,
          visibility: visibility,
          userId: user?.id,
          exercises: selectedExercises.map((e) => ({
            id: e.exercise.id,
            series: String(e.series),
            repetitions: String(e.repetitions),
            weight: String(e.weight),
            restTime: String(e.restTime),
          })),
        },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        fetchWorkouts();
        toast.success("Treino gerado com sucesso!");
        clearForm();
      })
      .catch((error) => {
        const title = error.response?.data?.message;
        const errors: Record<string, { field: string; message: string }> =
          error.response?.data?.errors;

        if (errors) {
          Object.values(errors).forEach((errorMessages) => {
            toast.error(errorMessages.message);
          });
        } else {
          console.log(error);
          toast.error(title || "Erro ao cadastrar treino");
        }
      })
      .finally(() => {
        setSavingWorkout(false);
      });
  };

  const clearForm = () => {
    setWorkoutName("");
    setVisibility("PRIVATE");
    setSelectedExercises([]);
    setExpandedGroups([""]);
    setExpandedExercises([]);
  };

  const handleAIGenerate = async (formData: AIWorkoutFormData) => {
    console.log("AI Form Data:", formData);
    // Here you would typically call your AI API
    setIsAIModalOpen(false);
  };

  // Group exercises by muscle group
  const exercisesByGroup = availableExercises.reduce((groups, exercise) => {
    const group = exercise?.muscleGroup?.name || "";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(exercise);
    return groups;
  }, {} as Record<string, ExerciseData[]>);

  // Filter exercises based on search term
  const filteredExercises = searchTerm
    ? availableExercises.filter(
        (e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e?.muscleGroup?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
            <Dumbbell size={24} />
          </div>
          <h2 className="text-2xl font-bold">Cadastro de Treino</h2>
        </div>
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors shadow-md"
        >
          <Sparkles size={20} />
          Gerar com IA
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden animate-pulse h-36 w-full" />

          <div className="flex flex-row gap-4">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden animate-pulse h-[430px] w-full max-w-96" />
            <div className="flex flex-col gap-4 flex-1">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden animate-pulse h-[350px] w-full" />
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden animate-pulse h-16 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4  items-center bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg">
            <label className="flex-1 w-full block mb-4">
              <span className="text-zinc-600 dark:text-zinc-400">
                Nome do Treino
              </span>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Ex: Treino A - Peito e Tríceps"
                required
              />
            </label>

            <label className="max-w-full md:max-w-64 w-full block mb-4">
              <span className="text-zinc-700 dark:text-zinc-200">
                Visibilidade
              </span>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-lg border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                {Object.entries(VisibilityLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Exercise Selection */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Selecionar Exercícios
                </h3>

                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Buscar exercícios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pl-10"
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-zinc-400"
                    size={20}
                  />
                </div>

                {searchTerm ? (
                  <div className="space-y-4 mt-4">
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-200">
                      Resultados da busca
                    </h4>
                    {filteredExercises.length > 0 ? (
                      filteredExercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
                        >
                          <div>
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm text-zinc-600">
                              {exercise?.muscleGroup?.name}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => addExercise(exercise)}
                            className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                            disabled={selectedExercises.some(
                              (e) => e.exercise.id === exercise.id
                            )}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-zinc-500">
                        Nenhum exercício encontrado
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(exercisesByGroup).map(
                      ([group, exercises]) => (
                        <div
                          key={group}
                          className="border border-zinc-200 dark:border-zinc-900 rounded-lg overflow-hidden"
                        >
                          <button
                            type="button"
                            className="w-full flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-950 transition-colors"
                            onClick={() => toggleGroup(group)}
                          >
                            <div className="flex items-center gap-2">
                              <Dumbbell size={18} className="text-blue-600" />
                              <span className="font-medium">{group}</span>
                            </div>
                            {expandedGroups.includes(group) ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>

                          {expandedGroups.includes(group) && (
                            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                              {exercises.map((exercise) => (
                                <div
                                  key={exercise.id}
                                  className="flex items-center justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                                >
                                  <p className="text-sm">{exercise.name}</p>
                                  <button
                                    type="button"
                                    onClick={() => addExercise(exercise)}
                                    className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                                    disabled={selectedExercises.some(
                                      (e) => e.exercise.id === exercise.id
                                    )}
                                  >
                                    <Plus size={18} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Selected Exercises */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Exercícios Selecionados ({selectedExercises.length})
                </h3>

                {selectedExercises.length === 0 ? (
                  <div className="text-center py-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                    <Dumbbell
                      size={32}
                      className="mx-auto mb-2 text-blue-600"
                    />
                    <p className="text-zinc-500 dark:text-zinc-200">
                      Nenhum exercício selecionado
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">
                      Selecione exercícios da lista à esquerda
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedExercises.map((item) => (
                      <div
                        key={item.exercise.id}
                        className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
                      >
                        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-900 flex-shrink-0">
                              <img
                                src={item.exercise.imageUrl}
                                alt={item.exercise.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">
                                {item.exercise.name}
                              </h4>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {item.exercise?.muscleGroup?.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                toggleExerciseDetails(item.exercise.id || "")
                              }
                              className="p-1.5 bg-zinc-200 text-zinc-600 rounded-full hover:bg-zinc-300 transition-colors"
                            >
                              {expandedExercises.includes(
                                item.exercise.id || ""
                              ) ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                removeExercise(item.exercise.id || "")
                              }
                              className="p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {expandedExercises.includes(item.exercise.id || "") && (
                          <div className="p-4 bg-white dark:bg-zinc-800">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <label className="block">
                                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                                  Séries
                                </span>
                                <input
                                  type="number"
                                  value={item.series}
                                  onChange={(e) =>
                                    updateExerciseDetails(
                                      item.exercise.id || "",
                                      "series",
                                      parseInt(e.target.value)
                                    )
                                  }
                                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  min="1"
                                  required
                                />
                              </label>

                              <label className="block">
                                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                                  Repetições
                                </span>
                                <input
                                  type="text"
                                  value={item.repetitions}
                                  onChange={(e) =>
                                    updateExerciseDetails(
                                      item.exercise.id || "",
                                      "repetitions",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  placeholder="Ex: 8-12 ou 12"
                                  required
                                />
                              </label>

                              <label className="block">
                                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                                  Peso (kg)
                                </span>
                                <input
                                  type="number"
                                  value={item.weight}
                                  onChange={(e) =>
                                    updateExerciseDetails(
                                      item.exercise.id || "",
                                      "weight",
                                      parseInt(e.target.value)
                                    )
                                  }
                                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  min="0"
                                  required
                                />
                              </label>

                              <label className="block">
                                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                                  Tempo de Descanso (segundos)
                                </span>
                                <input
                                  type="number"
                                  value={item.restTime}
                                  onChange={(e) =>
                                    updateExerciseDetails(
                                      item.exercise.id || "",
                                      "restTime",
                                      parseInt(e.target.value)
                                    )
                                  }
                                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  min="0"
                                  required
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={selectedExercises.length === 0 || savingWorkout}
                className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  savingWorkout ? "cursor-wait opacity-75" : ""
                }`}
              >
                Salvar Treino
              </button>
            </div>
          </div>
        </form>
      )}

      <AIWorkoutModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGenerate}
      />
    </div>
  );
}
