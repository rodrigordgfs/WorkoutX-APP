import { FormEvent, useCallback, useEffect, useState } from "react";
import { PlusIcon, LoaderIcon, ImageIcon } from "lucide-react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { IMuscleGroup } from "@/context/WorkoutContext";

export const ExerciseRegisterPage = () => {
  const { getToken } = useAuth();

  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState<IMuscleGroup>();
  const [muscleGroups, setMuscleGroups] = useState<IMuscleGroup[] | []>([]);
  const [series, setSeries] = useState("4");
  const [repetitions, setRepetitions] = useState("12");
  const [weight, setWeight] = useState("10");
  const [restTime, setRestTime] = useState("60");
  const [instructions, setInstructions] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMuscleGroups = useCallback(async () => {
    axios
      .get("/muscle-group", {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      .then(({ data }) => {
        setMuscleGroups(data);
      })
      .catch(() => {
        toast.error("Falha ao carregar grupos musculares!");
      });
  }, [getToken]);

  useEffect(() => {
    fetchMuscleGroups();
  }, [fetchMuscleGroups]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setImagePreview(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log(muscleGroup);

    axios
      .post(
        "/exercise",
        {
          name,
          muscleGroupId: muscleGroup?.id,
          series,
          repetitions,
          weight,
          restTime,
          instructions,
          videoUrl: videoLink,
          image,
        },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            contentType: "application/json",
          },
        }
      )
      .then(() => {
        clearFields();
        toast.success("Exercício cadastrado com sucesso!");
      })
      .catch(() => {
        toast.error("Falha ao cadastrar exercício!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearFields = () => {
    setName("");
    setMuscleGroup(undefined);
    setSeries("4");
    setRepetitions("12");
    setWeight("10");
    setRestTime("60");
    setInstructions("");
    setVideoLink("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle title="Cadastrar Exercício" icon={PlusIcon} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-10">
          <div className="flex flex-1 flex-col space-y-4">
            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">Nome</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </label>
            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">
                Grupo Muscular
              </span>
              <select
                value={muscleGroup?.id || ""}
                onChange={(e) =>
                  setMuscleGroup(
                    muscleGroups.find((group) => group.id === e.target.value)
                  )
                }
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Selecione...</option>
                {muscleGroups?.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1">
                <label className="block w-full">
                  <span className="text-zinc-700 dark:text-zinc-200">
                    Séries
                  </span>
                  <input
                    type="number"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <div className="flex flex-1">
                <label className="block w-full">
                  <span className="text-zinc-700 dark:text-zinc-200">
                    Repetições
                  </span>
                  <input
                    type="number"
                    value={repetitions}
                    onChange={(e) => setRepetitions(e.target.value)}
                    className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1">
                <label className="block w-full">
                  <span className="text-zinc-700 dark:text-zinc-200">Peso</span>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <div className="flex flex-1">
                <label className="block w-full">
                  <span className="text-zinc-700 dark:text-zinc-200">
                    Tempo de Descanço
                  </span>
                  <input
                    type="number"
                    value={restTime}
                    onChange={(e) => setRestTime(e.target.value)}
                    className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
            </div>
            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">
                Link do Video
              </span>
              <input
                type="text"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </label>
            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">
                Instruções
              </span>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows={4}
                placeholder="Ex: Músculos do peitoral maior e menor"
                required
                disabled={loading}
              />
            </label>
          </div>
          <div className="flex flex-col ">
            <span className="text-zinc-700 dark:text-zinc-200 mb-2">
              Selecione a imagem
            </span>
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="w-full md:w-48 h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon
                    size={48}
                    className="text-zinc-500 dark:text-zinc-300"
                  />
                )}
              </div>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors ${
            loading && "opacity-75"
          }`}
          disabled={loading}
        >
          {loading ? (
            <LoaderIcon size={20} className="animate-spin" />
          ) : (
            "Salvar Exercício"
          )}
        </button>
      </form>
    </div>
  );
};
