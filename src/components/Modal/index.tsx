import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

export function Modal({
  loading,
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
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
          <p>{content}</p>
        </div>

        <div className="p-6">
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
              onClick={() => onConfirm()}
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
      </div>
    </div>
  );
}
