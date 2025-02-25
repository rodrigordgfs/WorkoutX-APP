import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface TitleProps {
  icon: LucideIcon;
  title: string;
  goTo?: string;
  iconGoTo?: LucideIcon;
  textGoTo?: string;
}

export const SectionTitle = ({
  icon: Icon,
  iconGoTo: IconGoTo,
  title,
  textGoTo,
  goTo,
}: TitleProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {goTo && (
        <Link
          to={goTo}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {IconGoTo && <IconGoTo size={20} />}
          {textGoTo}
        </Link>
      )}
    </div>
  );
};
