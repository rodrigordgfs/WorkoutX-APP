import { Link } from "react-router-dom";

interface MuscleGroupCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const MuscleGroupCard = ({
  id,
  name,
  image,
  description,
}: MuscleGroupCardProps) => {
  return (
    <Link
      to={`/muscle-group/${id}`}
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
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};
