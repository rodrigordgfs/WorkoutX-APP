import { FormEvent, useCallback, useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { IMuscleGroup } from "@/context/WorkoutContext";
import { Button } from "@/components/Shared/Button";
import { Input } from "@/components/Shared/Input";
import { Select } from "@/components/Shared/Select/inde";
import { TextArea } from "@/components/Shared/TextArea";
import { ImageSelector } from "@/components/Shared/ImageSelector";

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
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle title="Cadastrar Exercício" icon={PlusIcon} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-10">
          <div className="flex flex-1 flex-col space-y-4">
            <Input
              name="Nome"
              placeholder="Ex: Supino Reto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
            <Select
              name="Grupo Muscular"
              value={muscleGroup?.id || ""}
              onChange={(e) =>
                setMuscleGroup(
                  muscleGroups.find((group) => group.id === e.target.value)
                )
              }
              options={muscleGroups}
              disabled={loading}
              required
            />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1">
                <Input
                  name="Séries"
                  placeholder="4"
                  type="number"
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="flex flex-1">
                <Input
                  name="Repetições"
                  placeholder="12"
                  type="number"
                  value={repetitions}
                  onChange={(e) => setRepetitions(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1">
                <Input
                  name="Peso"
                  placeholder="10"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="flex flex-1">
                <Input
                  name="Tempo de Descanço"
                  placeholder="60"
                  type="number"
                  value={restTime}
                  onChange={(e) => setRestTime(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <Input
              name="Link do Video"
              placeholder="Ex: https://www.youtube.com/watch?v=video"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              disabled={loading}
              required
            />
            <TextArea
              name="Instruções"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              rows={4}
              placeholder="Ex: Músculos do peitoral maior e menor"
              disabled={loading}
            />
          </div>
          <ImageSelector
            name="Selecione a imagem"
            image={image || ""}
            onImageChange={(image) => {
              setImage(image);
            }}
          />
        </div>
        <Button
          text="Cadastrar Exercício"
          icon={PlusIcon}
          loading={loading}
          type="submit"
          fullWidth
        />
      </form>
    </div>
  );
};
