import { TrendingUp } from "lucide-react";

interface StatusCardProps {
  children?: React.ReactNode;
  title: string;
  value: string | number | null | undefined;
  trend?: string;
}

export const StatusCard = ({
  children,
  title,
  value,
  trend,
}: StatusCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg flex items-center">
      <div className="flex items-center gap-4">
        {children}
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
