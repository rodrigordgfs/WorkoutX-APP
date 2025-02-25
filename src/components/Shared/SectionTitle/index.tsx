import { LucideIcon } from "lucide-react";

interface TitleProps {
  icon: LucideIcon;
  title: string;
}

export const SectionTitle = ({ icon: Icon, title }: TitleProps) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};
