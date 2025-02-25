import { Filter, Search } from "lucide-react";

interface FilterHistoryProps {
  filterModalOpen: boolean;
  search: string;
  onSearchChange: (search: string) => void;
  toogleFilterOpen: (value: boolean) => void;
}

export const FilterHistory = ({
  filterModalOpen,
  search,
  onSearchChange,
  toogleFilterOpen,
}: FilterHistoryProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 mb-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar treinos..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 pl-10 pr-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-zinc-400" size={20} />
        </div>
        <button
          onClick={() => toogleFilterOpen(!filterModalOpen)}
          className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 rounded-lg hover:bg-zinc-200 flex items-center gap-2"
        >
          <Filter size={20} />
          Filtros
        </button>
      </div>

      {filterModalOpen && (
        <div className="mt-4 p-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                Período
              </label>
              <select className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300">
                <option>Último mês</option>
                <option>Últimos 3 meses</option>
                <option>Último ano</option>
                <option>Personalizado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                Status
              </label>
              <select className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300">
                <option>Todos</option>
                <option>Concluídos</option>
                <option>Em andamento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                Ordenar por
              </label>
              <select className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300">
                <option>Mais recentes</option>
                <option>Mais antigos</option>
                <option>Maior progresso</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
