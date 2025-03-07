import { X } from "lucide-react";
import { Button } from "../Button";

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
            <Button
              text="Cancelar"
              onClick={onClose}
              disabled={loading}
              variant="secondary"
            />
            <Button
              onClick={onConfirm}
              disabled={loading}
              text={loading ? "Por favor, Aguarde!" : "Confirmar"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
