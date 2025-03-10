import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/Shared/Button";
import { Input } from "@/components/Shared/Input";
import { TextArea } from "@/components/Shared/TextArea";
import { ImageSelector } from "@/components/Shared/ImageSelector";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  image: z.string().min(1, "A imagem é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export const MuscleGroupRegisterPage = () => {
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

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    axios
      .post(
        "/muscle-group",
        { ...data },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            contentType: "application/json",
          },
        }
      )
      .then(() => {
        reset();
        toast.success("Grupo muscular cadastrado com sucesso!");
      })
      .catch((error) => {
        console.error("Failed to register muscle group", error);
        toast.error("Falha ao cadastrar grupo muscular!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle title="Cadastrar Grupo Muscular" icon={PlusIcon} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-10">
          <div className="flex flex-1 flex-col space-y-4">
            <Input
              title="Nome"
              placeholder="Ex: Peito"
              disabled={loading}
              error={errors.name?.message}
              {...register("name")}
            />

            <TextArea
              title="Descrição"
              placeholder="Ex: Músculos do peitoral maior e menor"
              disabled={loading}
              rows={4}
              error={errors.description?.message}
              {...register("description")}
            />
          </div>

          <ImageSelector
            image={watch("image")}
            onChange={(image) =>
              setValue("image", image || "", { shouldValidate: true })
            }
            title="Selecione a imagem"
            error={errors.image?.message}
          />
        </div>

        <Button
          loading={loading}
          text="Cadastrar Grupo Muscular"
          type="submit"
          icon={PlusIcon}
          fullWidth
        />
      </form>
    </div>
  );
};
