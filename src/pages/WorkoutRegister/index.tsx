import { useClerk } from "@clerk/clerk-react";
import { LoaderIcon, Plus, PlusIcon, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { AIWorkoutFormData, AIWorkoutModal } from "@/components/AIWorkoutModal";
import { toast } from "react-toastify";
import workoutAIService from "@/services/workoutAi";
import { useNavigate } from "react-router-dom";

export type Visibility = "PUBLIC" | "PRIVATE";

export const VisibilityLabels: Record<Visibility, string> = {
  PUBLIC: "Público",
  PRIVATE: "Privado",
};

interface Exercise {
  name: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
  videoUrl: string;
  instructions: string;
}

const initialExercise: Exercise = {
  name: "",
  series: "",
  repetitions: "",
  weight: "",
  restTime: "",
  videoUrl: "",
  instructions: "",
};

const WorkoutRegisterPage = () => {
  const clerk = useClerk();
  const { addWorkout, appendWorkout } = useWorkout();
  const navigate = useNavigate();

  const [workoutName, setWorkoutName] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("PUBLIC");
  const [exercises, setExercises] = useState<Exercise[]>([
    { ...initialExercise },
  ]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(clerk.user?.id ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleGenerateWorkout = async (form: AIWorkoutFormData) => {
    await new Promise<void>((resolve) => {
      workoutAIService
        .post({
          userId,
          ...form,
        })
        .then(({ data }) => {
          setIsModalOpen(false);
          toast.success("Treino gerado com sucesso!");
          appendWorkout(data);
          navigate(`/workout/${data.id}`);
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
          resolve();
        });
    });
  };

  const addExercise = () => {
    setExercises([...exercises, { ...initialExercise }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    addWorkout(workoutName, visibility, userId, exercises)
      .then(() => {
        clearFields();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearFields = () => {
    setWorkoutName("");
    setExercises([{ ...initialExercise }]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
            <PlusIcon size={24} />
          </div>
          <h2 className="text-2xl font-bold">Cadastrar Treino</h2>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors shadow-md"
        >
          <Sparkles size={20} />
          Gerar com IA
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block mb-4">
            <span className="text-zinc-700 dark:text-zinc-200">
              Nome do Treino
            </span>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Ex: Treino A - Peito e Tríceps"
              required
              disabled={loading}
            />
          </label>

          <label className="block mb-4">
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

        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Exercício {index + 1}</h3>
              {exercises.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExercise(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-zinc-700 dark:text-zinc-200">
                  Nome do Exercício
                </span>
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) =>
                    updateExercise(index, "name", String(e.target.value))
                  }
                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                  disabled={loading}
                />
              </label>

              <label className="block">
                <span className="text-zinc-700 dark:text-zinc-200">
                  URL do Vídeo
                </span>
                <input
                  type="url"
                  value={exercise.videoUrl}
                  onChange={(e) =>
                    updateExercise(index, "videoUrl", String(e.target.value))
                  }
                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                  disabled={loading}
                />
              </label>

              <label className="block">
                <span className="text-zinc-700 dark:text-zinc-200">Séries</span>
                <input
                  value={exercise.series}
                  onChange={(e) =>
                    updateExercise(index, "series", String(e.target.value))
                  }
                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                  disabled={loading}
                />
              </label>

              <label className="block">
                <span className="text-zinc-700 dark:text-zinc-200">
                  Repetições
                </span>
                <input
                  value={exercise.repetitions}
                  onChange={(e) =>
                    updateExercise(index, "repetitions", String(e.target.value))
                  }
                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                  disabled={loading}
                />
              </label>

              <label className="block">
                <span className="text-zinc-700 dark:text-zinc-200">
                  Peso (kg)
                </span>
                <input
                  value={exercise.weight}
                  onChange={(e) =>
                    updateExercise(index, "weight", String(e.target.value))
                  }
                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  min="0"
                  required
                  disabled={loading}
                />
              </label>

              <label className="block">
                <span className="text-zinc-700 dark:text-zinc-200">
                  Tempo de Descanso (segundos)
                </span>
                <input
                  value={exercise.restTime}
                  onChange={(e) =>
                    updateExercise(index, "restTime", String(e.target.value))
                  }
                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  min="0"
                  required
                  disabled={loading}
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-zinc-700 dark:text-zinc-200">
                  Instruções
                </span>
                <textarea
                  value={exercise.instructions}
                  onChange={(e) =>
                    updateExercise(
                      index,
                      "instructions",
                      String(e.target.value)
                    )
                  }
                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  rows={3}
                  required
                  disabled={loading}
                />
              </label>
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={addExercise}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 rounded-lg hover:bg-zinc-200"
          >
            <Plus size={20} />
            Adicionar Exercício
          </button>

          <button
            type="submit"
            className={`flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors ${
              loading && "opacity-75"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <LoaderIcon size={20} className="animate-spin mr-2" />
                Salvando
              </div>
            ) : (
              "Salvar Treino"
            )}
          </button>
        </div>
      </form>

      <AIWorkoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onGenerate={handleGenerateWorkout}
      />
    </div>
  );
};

export default WorkoutRegisterPage;
