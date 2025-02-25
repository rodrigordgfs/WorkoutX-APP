import { Activity } from "lucide-react";
import { RecentActivityCard } from "../RecentActivityCard";
import { IRecentActivity } from "@/context/DashboardContext";

interface RecentActivityProps {
  activities: IRecentActivity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800  p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-blue-500" size={24} />
        <h3 className="text-lg font-semibold">Atividade Recente</h3>
      </div>

      <div className="space-y-4">
        {activities.map((workouSession, index) => (
          <RecentActivityCard key={index} workoutSession={workouSession} />
        ))}
      </div>
    </div>
  );
};
