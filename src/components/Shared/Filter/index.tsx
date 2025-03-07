import { FilterIcon, Search } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "../Button";
interface FilterHistoryProps {
  filterModalOpen: boolean;
  children: ReactNode;
  toogleFilterOpen: (value: boolean) => void;
  onFilter: (text: string) => void;
}

export const Filter = ({
  children,
  filterModalOpen,
  onFilter,
  toogleFilterOpen,
}: FilterHistoryProps) => {
  const [text, setText] = useState<string>();

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 mb-6">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar treinos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 pl-10 pr-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-zinc-400" size={20} />
        </div>
        <div className="flex gap-2 items-center">
        <Button
          onClick={() => onFilter(text || "")}
          text="Pesquisar"
          icon={Search}
          customClass={"md:w-auto w-full"}
        />
        <Button
          onClick={() => toogleFilterOpen(!filterModalOpen)}
          text="Filtros"
          icon={FilterIcon}
          variant="secondary"
          customClass={"md:w-auto w-full"}
        />
        </div>
      </div>

      {filterModalOpen && (
        <div className="mt-4 p-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
