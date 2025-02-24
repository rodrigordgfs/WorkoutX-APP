import { useEffect, useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Dumbbell,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { intervalToDuration } from "date-fns";

interface WorkoutStats {
  totalExercises: number;
  completedExercises: number;
  completionRate: string;
}

interface Exercise {
  id: string;
  name: string;
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
  completed: boolean;
}

interface WorkoutHistory {
  id: string;
  startedAt: string;
  endedAt: string | null;
  duration: string | number;
  workout: {
    name: string;
    visibility: string;
    createdAt: string;
  };
  exercises: Exercise[];
  stats: WorkoutStats;
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dateString));
}

function formatDurationCustom(duration: number | string): string {
  if (typeof duration === "string") {
    return duration;
  }

  if (duration < 60) {
    return `${duration} min`;
  }

  const durationObj = intervalToDuration({
    start: 0,
    end: duration * 60 * 1000,
  });

  return `${durationObj.hours}h ${durationObj.minutes}m`;
}

function getStatusColor(completionRate: string) {
  const rate = parseInt(completionRate);
  if (rate === 100) return "text-green-600";
  if (rate > 50) return "text-yellow-600";
  return "text-blue-600";
}

export function WorkoutHistoryPage() {
  const { user } = useClerk();
  const [expandedWorkouts, setExpandedWorkouts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchWorkoutHistory = () => {
      axios
        .get("/workout/history", {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          params: {
            userId: user?.id,
          },
        })
        .then(({ data }) => {
          setWorkoutHistory(data);
          setLoading(false);
        })
        .catch((error) => {
          const title = error.response?.data?.message;
          const errors: Record<string, { field: string; message: string }> =
            error.response?.data?.errors;
          if (errors) {
            Object.values(errors).forEach((errorMessages) => {
              toast.error(errorMessages.message);
            });
          } else {
            toast.error(title || "Erro ao buscar o histórico de treinos");
          }
        });
    };

    fetchWorkoutHistory();
  }, [user]);

  const toggleWorkout = (workoutId: string) => {
    setExpandedWorkouts((current) =>
      current.includes(workoutId)
        ? current.filter((id) => id !== workoutId)
        : [...current, workoutId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
            <Calendar size={24} />
          </div>
          <h2 className="text-2xl font-bold">Histórico de Treinos</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar treinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 pl-10 pr-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-2.5 text-zinc-400"
              size={20}
            />
          </div>
          <button
            onClick={() => setFilterModalOpen(!filterModalOpen)}
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

      <div className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-zinc-200 rounded-lg" />
                  <div>
                    <div className="h-5 w-48 bg-zinc-200 rounded" />
                    <div className="h-4 w-36 bg-zinc-200 rounded mt-2" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-5 w-24 bg-zinc-200 rounded" />
                  <div className="h-5 w-12 bg-zinc-200 rounded" />
                </div>
              </div>
            ))
          : workoutHistory.map((workout) => {
              const isExpanded = expandedWorkouts.includes(workout.id);
              const statusColor = getStatusColor(workout.stats.completionRate);

              return (
                <div
                  key={workout.id}
                  className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <div
                    className="p-4 sm:p-6 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                    onClick={() => toggleWorkout(workout.id)}
                  >
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
                          <Dumbbell size={20} className="sm:size-6" />
                        </div>
                        <div>
                          <h3 className="text-lg text-zinc-900 dark:text-zinc-50 sm:text-xl font-semibold">
                            {workout.workout.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                            {formatDate(workout.startedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-6">
                        <div className="flex items-center gap-2 sm:gap-4 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base">
                          <Clock size={18} className="sm:size-5" />
                          <span>{formatDurationCustom(workout.duration)}</span>
                        </div>
                        <div
                          className={`text-sm sm:text-base font-medium ${statusColor}`}
                        >
                          {workout.stats.completionRate}
                        </div>
                        {isExpanded ? (
                          <ChevronUp
                            size={20}
                            className="text-zinc-400 sm:size-6"
                          />
                        ) : (
                          <ChevronDown
                            size={20}
                            className="text-zinc-400 sm:size-6"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-zinc-100 divide-y divide-zinc-100">
                      {workout.exercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className={`p-4 ${
                            exercise.completed
                              ? "bg-green-50 dark:bg-green-700"
                              : "hover:bg-zinc-50 dark:hover:bg-zinc-700"
                          } transition-colors`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                                  {exercise.name}
                                </h4>
                                {exercise.completed && (
                                  <CheckCircle2
                                    size={16}
                                    className="text-green-500"
                                  />
                                )}
                              </div>
                              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                {exercise.series} séries ×{" "}
                                {exercise.repetitions} • {exercise.weight}kg •{" "}
                                {exercise.restTime}s descanso
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="p-4 bg-zinc-50 dark:bg-zinc-700 text-center text-blue-600 dark:text-blue-400 font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            Exercícios concluídos:{" "}
                            {workout.stats.completedExercises} de{" "}
                            {workout.stats.totalExercises}
                          </div>
                          <div className={`font-medium ${statusColor}`}>
                            Taxa de conclusão: {workout.stats.completionRate}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}
