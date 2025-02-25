import { Search } from "lucide-react";

interface FilterWorkoutProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const FilterWorkout = ({
  searchTerm,
  setSearchTerm,
}: FilterWorkoutProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar treinos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-zinc-900 pl-10 pr-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 text-zinc-400" size={20} />
      </div>
    </div>
  );
};
