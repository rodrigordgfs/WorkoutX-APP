import { useCallback, useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { IMuscleGroup } from "@/context/WorkoutContext";
import { Button } from "@/components/Shared/Button";
import { Input } from "@/components/Shared/Input";
import { TextArea } from "@/components/Shared/TextArea";
import { ImageSelector } from "@/components/Shared/ImageSelector";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/components/Shared/Select";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  muscleGroupId: z.string().min(1, "Grupo Muscular é obrigatório"),
  series: z.preprocess(
    (val) => String(val),
    z.string().min(1, "Séries é obrigatório")
  ),
  repetitions: z.preprocess(
    (val) => String(val),
    z.string().min(1, "Repetições é obrigatório")
  ),
  weight: z.preprocess(
    (val) => String(val),
    z.string().min(1, "Peso é obrigatório")
  ),
  restTime: z.preprocess(
    (val) => String(val),
    z.string().min(1, "Tempo de Descanso é obrigatório")
  ),
  videoUrl: z.string().url("Link do Vídeo deve ser uma URL válida"),
  instructions: z.string().min(1, "Instruções são obrigatórias"),
  image: z.string().min(1, "A imagem é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export const ExerciseRegisterPage = () => {
  const { getToken } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [muscleGroups, setMuscleGroups] = useState<IMuscleGroup[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMuscleGroups = useCallback(async () => {
    try {
      const { data } = await axios.get("/muscle-group", {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      setMuscleGroups(data);
    } catch {
      toast.error("Falha ao carregar grupos musculares!");
    }
  }, [getToken]);

  useEffect(() => {
    fetchMuscleGroups();
  }, [fetchMuscleGroups]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      await axios.post(
        "/exercise",
        {
          ...data,
          videoUrl: data.videoUrl,
        },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      reset();
      toast.success("Exercício cadastrado com sucesso!");
    } catch {
      toast.error("Falha ao cadastrar exercício!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle title="Cadastrar Exercício" icon={PlusIcon} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-10">
          <div className="flex flex-1 flex-col space-y-4">
            <Input
              title="Nome"
              placeholder="Ex: Supino Reto"
              disabled={loading}
              error={errors.name?.message}
              {...register("name")}
            />
            <Select
              title="Grupo Muscular"
              options={muscleGroups.map((mg) => ({ id: mg.id, name: mg.name }))}
              disabled={loading}
              error={errors.muscleGroupId?.message}
              {...register("muscleGroupId")}
            />
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                title="Séries"
                type="number"
                disabled={loading}
                error={errors.series?.message}
                {...register("series")}
              />
              <Input
                title="Repetições"
                type="number"
                disabled={loading}
                error={errors.repetitions?.message}
                {...register("repetitions")}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                title="Peso"
                type="number"
                disabled={loading}
                error={errors.weight?.message}
                {...register("weight")}
              />
              <Input
                title="Tempo de Descanso"
                type="number"
                disabled={loading}
                error={errors.restTime?.message}
                {...register("restTime")}
              />
            </div>
            <Input
              title="Link do Vídeo"
              placeholder="Ex: https://www.youtube.com/watch?v=video"
              disabled={loading}
              error={errors.videoUrl?.message}
              {...register("videoUrl")}
            />
            <TextArea
              title="Instruções"
              rows={4}
              placeholder="Descreva as instruções"
              disabled={loading}
              error={errors.instructions?.message}
              {...register("instructions")}
            />
          </div>
          <ImageSelector
            title="Selecione a imagem"
            image={watch("image")}
            onChange={(image) =>
              setValue("image", image || "", { shouldValidate: true })
            }
            error={errors.image?.message}
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
