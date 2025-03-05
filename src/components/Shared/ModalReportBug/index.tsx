import { useAuth, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { ImageIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useScreenshot } from "use-react-screenshot";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalReportBug({ isOpen, onClose }: ModalProps) {
  const { user } = useClerk();
  const { getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [, takeScreenshot] = useScreenshot();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle("");
    setDescription("");
    setImageUpload(null);
    setImagePreview(null);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "/report-bug",
        {
          userId: user?.id,
          title,
          description,
          image: imageUpload,
        },
        {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )
      .then(() => {
        toast.success("Bug reportado com sucesso! Obrigado pelo feedback!");
        onClose();
      })
      .catch(() => {
        toast.error("Erro ao reportar o bug. Tente novamente mais tarde.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUpload(reader.result as string);
      setImagePreview(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  const handleCaptureScreen = async () => {
    const modal = document.getElementById("modal-report-bug");
    if (modal) {
      modal.style.display = "none";
    }
    const screenshot = await takeScreenshot(document.body);
    if (modal) {
      modal.style.display = "flex";
    }
    setImageUpload(screenshot);
    setImagePreview(screenshot);
  };

  return (
    <div
      id="modal-report-bug"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Reportar Bug</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className={`p-2 hover:bg-blue-700 rounded-full transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-1 flex-col space-y-4">
              <label className="block">
                <span className="text-zinc-700 dark:text-zinc-200">Título</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Descreva o problema brevemente"
                  className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
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
                  placeholder="Descreva o problema em detalhes. O que aconteceu? O que você esperava que acontecesse?"
                  required
                  disabled={loading}
                />
              </label>
              <div className="block">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-700 dark:text-zinc-200 mb-2">
                    Envie uma imagem do problema
                  </span>
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={handleCaptureScreen}
                  >
                    Printar da tela
                  </button>
                </div>
                <label className="relative cursor-pointer mt-1">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-900 rounded-lg flex items-center justify-center overflow-hidden shadow-md mt-3">
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

            <div className="">
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => onClose()}
                  disabled={loading}
                  className={`px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-950 transition-all ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Por favor, Aguarde!
                    </span>
                  ) : (
                    "Confirmar"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
