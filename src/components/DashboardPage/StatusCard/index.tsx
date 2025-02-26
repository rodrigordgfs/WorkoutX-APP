import { LucideIcon, TrendingUp } from "lucide-react";

interface StatusCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number | null | undefined;
  trend?: string;
  color?: "blue" | "green" | "yellow" | "purple" | "pink";
}

export const StatusCard = ({
  icon: Icon,
  title,
  value,
  color,
  trend,
}: StatusCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-4">
        <div
          className={`p-3 bg-${color}-500 dark:bg-${color}-100 text-white dark:text-${color}-200 rounded-lg`}
        >
          <Icon size={24} />
        </div>
        <div>
          <p className="text-sm text-zinc-900 dark:text-zinc-200">{title}</p>
          <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-300">
            {value}
          </p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp size={16} />
              {trend}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
