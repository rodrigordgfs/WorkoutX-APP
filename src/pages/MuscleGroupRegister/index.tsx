import { FormEvent, useState } from "react";
import { PlusIcon, LoaderIcon, ImageIcon } from "lucide-react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

export const MuscleGroupRegisterPage = () => {
  const { getToken } = useAuth();

  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setImagePreview(URL.createObjectURL(file)); // Pré-visualização
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        "/muscle-group",
        { name, image, description },
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

  const clearFields = () => {
    setName("");
    setImage(null);
    setImagePreview(null);
    setDescription("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle title="Cadastrar Grupo Muscular" icon={PlusIcon} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-10">
          {/* Campos de Nome e Descrição */}
          <div className="flex flex-1 flex-col space-y-4">
            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">Nome</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Ex: Peito"
                required
                disabled={loading}
              />
            </label>

            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">
                Descrição
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows={4}
                placeholder="Ex: Músculos do peitoral maior e menor"
                required
                disabled={loading}
              />
            </label>
          </div>

          {/* Upload de Imagem */}
          <div className="flex flex-col justify-center">
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
              <div className="w-48 h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
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
            <div className="flex items-center gap-2">
              <LoaderIcon size={20} className="animate-spin mr-2" />
              Salvando
            </div>
          ) : (
            "Salvar Grupo Muscular"
          )}
        </button>
      </form>
    </div>
  );
};
