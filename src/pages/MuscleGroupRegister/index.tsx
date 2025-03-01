import { FormEvent, useState } from "react";
import { PlusIcon, LoaderIcon } from "lucide-react";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

export const MuscleGroupRegisterPage = () => {
  const { getToken } = useAuth();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
    setImage("");
    setDescription("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle title="Cadastrar Grupo Muscular" icon={PlusIcon} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg grid grid-cols-1 gap-4">
          <label className="block mb-4">
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

          <label className="block mb-4">
            <span className="text-zinc-700 dark:text-zinc-200">
              Imagem (URL)
            </span>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Ex: http://example.com/image.jpg"
              required
              disabled={loading}
            />
          </label>

          <label className="block mb-4">
            <span className="text-zinc-700 dark:text-zinc-200">Descrição</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              rows={3}
              placeholder="Ex: Músculos do peitoral maior e menor"
              required
              disabled={loading}
            />
          </label>
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
