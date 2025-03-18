import { X } from "lucide-react";

interface ModalImageProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  src: string;
}

export function ModalImage({ isOpen, onClose, title, src }: ModalImageProps) {
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
            className="p-2 hover:bg-blue-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <img
            src={src}
            alt={title}
            className="aspect-square bg-cover object-cover"
          />
        </div>
      </div>
    </div>
  );
}
