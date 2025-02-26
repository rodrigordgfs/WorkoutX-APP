import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (weight: number, reps: number, series: number) => void;
  title: string;
}

export function ModalDoneExercise({
  loading,
  isOpen,
  onClose,
  onConfirm,
  title,
}: ModalProps) {
  const [weight, setWeight] = useState(20);
  const [reps, setReps] = useState(12);
  const [series, setSeries] = useState(4);

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

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Peso (kg)</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setWeight((prev) => Math.max(0, prev - 1))}
                className="p-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-semibold">{weight}</span>
              <button
                onClick={() => setWeight((prev) => prev + 1)}
                className="p-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Repetições</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setReps((prev) => Math.max(1, prev - 1))}
                className="p-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-semibold">{reps}</span>
              <button
                onClick={() => setReps((prev) => prev + 1)}
                className="p-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Séries</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSeries((prev) => Math.max(1, prev - 1))}
                className="p-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-semibold">{series}</span>
              <button
                onClick={() => setSeries((prev) => prev + 1)}
                className="p-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 flex justify-between">
          <button
            onClick={onClose}
            disabled={loading}
            className={`px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-950 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(weight, reps, series)}
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Aguarde..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
