import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserProfile } from "@/context/UserContext";
import { Ellipsis } from "lucide-react";

interface MuscleGroupCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  onDelete: (id: string) => void;
}

export const MuscleGroupCard = ({
  id,
  name,
  image,
  description,
  onDelete,
}: MuscleGroupCardProps) => {
  const { isAdmin } = useUserProfile();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    setMenuOpen(false);
    e.preventDefault();
    onDelete(id);
  };

  const handleGoToExercises = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/exercises?muscleGroupId=${id}`);
  };

  return (
    <div
      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
        handleGoToExercises(event)
      }
      className="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105"
    >
      <div className="aspect-square relative">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/75 to-transparent" />

        {/* Menu de opções */}
        {isAdmin && (
          <div className="absolute top-3 right-3">
            <button
              className="text-white hover:bg-blue-600 transition-all p-2 h-10 w-10 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }}
            >
              <Ellipsis size={24} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-10 border border-gray-200 dark:border-gray-700">
                <button
                  className="block w-full text-left px-4 py-2 text-white hover:bg-red-100 dark:hover:bg-gray-700"
                  onClick={handleDelete}
                >
                  Deletar grupo
                </button>
              </div>
            )}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
