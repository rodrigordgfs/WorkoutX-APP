import { X, Dumbbell, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Drawer({ isOpen, onClose }: DrawerProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <button onClick={onClose} className="absolute top-4 right-4">
            <X size={24} />
          </button>
          <div className="mt-8 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              onClick={onClose}
            >
              <Dumbbell size={20} />
              <span>Meus Treinos</span>
            </Link>
            <Link
              to="/cadastro"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              onClick={onClose}
            >
              <Plus size={20} />
              <span>Cadastrar Treino</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}