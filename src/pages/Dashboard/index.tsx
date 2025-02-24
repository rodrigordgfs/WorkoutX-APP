import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Activity,
  TrendingUp,
  Calendar,
  Clock,
  Weight as WeightIcon,
  Target,
  Dumbbell,
  BarChart3,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useClerk } from "@clerk/clerk-react";

interface WorkoutDashboard {
  workoutMonthAmmount: number;
  workoutPercentageChange: number;
  consecutiveWorkoutDays: number;
  averageWorkoutDuration: number;
  completionRate: string;
}

interface WorkoutExercicesAmmount {
  exercise: {
    id: string;
    name: string;
  };
  count: number;
}

interface RecentActivity {
  id: string;
  workout: {
    id: string;
    name: string;
  },
  exerciseCount: number;
  duration: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({
  icon: Icon,
  title,
  value,
  trend,
  color = "blue",
}: {
  icon: any;
  title: string;
  value: string | number | null | undefined;
  trend?: string;
  color?: "blue" | "green" | "yellow" | "purple" | "pink";
}) => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
    <div className="flex items-center gap-4">
      <div
        className={`p-3 bg-${color}-100 dark:bg-${color}-700 text-${color}-200 dark:text-${color}-200 rounded-lg`}
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

// Mock data based on schema
const mockData = {
  user: {
    goal: "MUSCLE_GAIN",
    experience: "INTERMEDIATE",
    weight: 75,
    height: 180,
  },
  workoutStats: {
    totalWorkouts: 45,
    thisMonth: 12,
    streak: 5,
    avgDuration: 65,
    completionRate: 85,
  },
  progressData: {
    weight: [73, 73.5, 74, 74.2, 74.8, 75],
    dates: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  },
  muscleGroups: {
    Peito: 25,
    Costas: 22,
    Pernas: 30,
    Ombros: 15,
    Braços: 18,
    Core: 10,
  },
  personalRecords: [
    { exercise: "Supino Reto", weight: 100, date: "2024-03-15" },
    { exercise: "Agachamento", weight: 140, date: "2024-03-18" },
    { exercise: "Levantamento Terra", weight: 160, date: "2024-03-20" },
    { exercise: "Desenvolvimento", weight: 60, date: "2024-03-22" },
  ],
  recentWorkouts: [
    {
      name: "Treino A - Peito e Tríceps",
      duration: 75,
      exercises: 8,
      intensity: "Alta",
    },
    {
      name: "Treino B - Costas e Bíceps",
      duration: 65,
      exercises: 7,
      intensity: "Média",
    },
  ],
};

// Chart configurations
const progressChart = {
  labels: mockData.progressData.dates,
  datasets: [
    {
      label: "Peso (kg)",
      data: mockData.progressData.weight,
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      tension: 0.4,
    },
  ],
};

export function DashboardPage() {
  const { user } = useClerk();

  const [workoutMonthAmmount, setWorkoutMonthAmmount] = useState<number>(0);
  const [workoutPercentageChange, setWorkoutPercentageChange] =
    useState<number>(0);
  const [consecutiveWorkoutDays, setConsecutiveWorkoutDays] =
    useState<number>(0);
  const [averageWorkoutDuration, setAverageWorkoutDuration] =
    useState<number>(0);
  const [completionRate, setCompletionRate] = useState<string>("0");
  const [workoutExercisesAmmount, setWorkoutExercisesAmmount] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState<boolean>(false);
  const [recentsActivities, setRecentsActivities] = useState<RecentActivity[]>([]);

  const workoutExercisesAmmountChart = {
    labels: Object.keys(workoutExercisesAmmount),
    datasets: [
      {
        data: Object.values(workoutExercisesAmmount),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(234, 179, 8, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(15, 118, 110, 0.8)",
          "rgba(255, 159, 28, 0.8)",
          "rgba(22, 163, 74, 0.8)",
        ],
      },
    ],
  };

  useEffect(() => {
    console.log(Object.keys(workoutExercisesAmmount));
    console.log(Object.values(workoutExercisesAmmount));
  }, [workoutExercisesAmmount]);

  useEffect(() => {
    setLoading(true);
    const fetchWorkoutDashboard = () => {
      axios
        .get("/workout/dashboard", {
          baseURL: import.meta.env.VITE_API_BASE_URL,
          params: {
            userId: user?.id,
          },
        })
        .then(({ data }) => {
          setWorkoutMonthAmmount(data.workoutMonthAmmount);
          setWorkoutPercentageChange(data.workoutPercentageChange);
          setConsecutiveWorkoutDays(data.consecutiveWorkoutDays);
          setAverageWorkoutDuration(data.averageWorkoutDuration);
          setCompletionRate(data.completionRate);
          const exercisesAmmount: Record<string, number> =
            data.workoutExercises.reduce(
              (
                acc: Record<string, number>,
                workout: WorkoutExercicesAmmount
              ) => {
                acc[workout.exercise.name] = workout.count;
                return acc;
              },
              {}
            );
          setWorkoutExercisesAmmount(exercisesAmmount);
          
          setRecentsActivities(data.recentActivities);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);

          const title = error.response?.data?.message;
          const errors: Record<string, { field: string; message: string }> =
            error.response?.data?.errors;
          if (errors) {
            Object.values(errors).forEach((errorMessages) => {
              toast.error(errorMessages.message);
            });
          } else {
            toast.error(title || "Erro ao buscar o dashboard de treinos");
          }
        });
    };

    fetchWorkoutDashboard();
  }, [user]);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
          <BarChart3 size={24} />
        </div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto">
          {/* Loading for Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-lg"></div>
                <div className="space-y-4 w-1/2">
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2"></div>
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-1/3"></div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-lg"></div>
                <div className="space-y-4 w-1/2">
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2"></div>
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-1/3"></div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-lg"></div>
                <div className="space-y-4 w-1/2">
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2"></div>
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-1/3"></div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-300 dark:bg-zinc-700 rounded-lg"></div>
                <div className="space-y-4 w-1/2">
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2"></div>
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading for Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
              <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-4"></div>
              <div className="h-40 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
              <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-4"></div>
              <div className="h-40 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
            </div>
          </div>

          {/* Loading for Personal Records and Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
              <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-4"></div>
              <div className="space-y-4">
                <div className="h-12 bg-zinc-300 dark:bg-zinc-700 rounded w-2/3"></div>
                <div className="h-12 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2"></div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
              <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-4"></div>
              <div className="space-y-4">
                <div className="h-12 bg-zinc-300 dark:bg-zinc-700 rounded w-2/3"></div>
                <div className="h-12 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Loading for Recent Activity */}
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg animate-pulse">
            <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-4"></div>
            <div className="space-y-4">
              <div className="h-16 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
              <div className="h-16 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
              <div className="h-16 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Activity}
              title="Treinos este mês"
              value={workoutMonthAmmount}
              trend={`${workoutPercentageChange}% vs. mês anterior`}
            />
            <StatCard
              icon={Calendar}
              title="Sequência atual"
              value={`${consecutiveWorkoutDays} dias`}
              color="green"
            />
            <StatCard
              icon={Clock}
              title="Duração média"
              value={`${Number(averageWorkoutDuration).toFixed(0)}min`}
              color="yellow"
            />
            <StatCard
              icon={Trophy}
              title="Taxa de conclusão"
              value={`${Number(completionRate).toFixed(0)}%`}
              color="purple"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-800  p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Progresso do Peso</h3>
              <Line
                data={progressChart}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      title: {
                        display: true,
                        text: "Peso (kg)",
                      },
                    },
                  },
                }}
              />
            </div>

            <div className="bg-white dark:bg-zinc-800  p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Exercícios mais realizados
              </h3>
              <div className="aspect-square max-w-md mx-auto">
                <Doughnut
                  data={workoutExercisesAmmountChart}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom" as const,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-zinc-800  p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-blue-500" size={24} />
              <h3 className="text-lg font-semibold">Atividade Recente</h3>
            </div>

            <div className="space-y-4">
              {recentsActivities.map((workouSession, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
                      <Dumbbell size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{workouSession.workout.name}</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        {workouSession.exerciseCount} exercícios • {workouSession.duration ? `${workouSession.duration} minutos` : 'Em andamento'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        workouSession.duration
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {workouSession.duration ? 'Concluído' : 'Em andamento'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
