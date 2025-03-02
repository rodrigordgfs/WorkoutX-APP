import { IFilterHistory } from "@/context/WorkoutContext";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
interface FilterHistoryProps {
  filterModalOpen: boolean;
  toogleFilterOpen: (value: boolean) => void;
  onFilter: (filter: IFilterHistory) => void;
}

const periodOptions = [
  { label: "Último mês", value: "last_month" },
  { label: "Últimos 3 meses", value: "last_3_months" },
  { label: "Último ano", value: "last_year" },
  { label: "Todos", value: "all" },
];

const statusOptions = [
  { label: "Concluídos", value: "completed" },
  { label: "Em andamento", value: "in_progress" },
  { label: "Todos", value: "all" },
];

const orderOptions = [
  { label: "Mais recentes", value: "desc" },
  { label: "Mais antigos", value: "asc" },
];

export const FilterHistory = ({
  filterModalOpen,
  onFilter,
  toogleFilterOpen,
}: FilterHistoryProps) => {
  const [filter, setFilter] = useState<IFilterHistory>({
    name: "",
    period: "all",
    status: "all",
    order: "desc",
  });

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 mb-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar treinos..."
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            className="w-full bg-white dark:bg-zinc-900 pl-10 pr-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-zinc-400" size={20} />
        </div>
        <button
          onClick={() => onFilter(filter)}
          className="px-4 py-2 bg-blue-600 rounded-lg flex items-center gap-2"
        >
          <Search size={20} />
          Pesquisar
        </button>
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
              <select
                onChange={(e) =>
                  setFilter({ ...filter, period: e.target.value })
                }
                value={filter.period}
                className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300"
              >
                {periodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                Status
              </label>
              <select
                onChange={(e) =>
                  setFilter({ ...filter, status: e.target.value })
                }
                value={filter.status}
                className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                Ordenar por
              </label>
              <select
                onChange={(e) =>
                  setFilter({ ...filter, order: e.target.value })
                }
                value={filter.order}
                className="w-full bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg border-zinc-300"
              >
                {orderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
