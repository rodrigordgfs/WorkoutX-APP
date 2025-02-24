import React from "react";
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
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Activity,
  TrendingUp,
  Calendar,
  Clock,
  Weight as WeightIcon,
  Target,
  Award,
  Flame,
  Dumbbell,
  BarChart3,
  Users,
  Heart,
  Trophy,
  Zap,
} from "lucide-react";

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
  value: string | number;
  trend?: string;
  color?: "blue" | "green" | "yellow" | "purple" | "pink";
}) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex items-center gap-4">
      <div className={`p-3 bg-${color}-100 text-${color}-600 rounded-lg`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
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

const muscleGroupChart = {
  labels: Object.keys(mockData.muscleGroups),
  datasets: [
    {
      data: Object.values(mockData.muscleGroups),
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)", // blue
        "rgba(34, 197, 94, 0.8)", // green
        "rgba(249, 115, 22, 0.8)", // orange
        "rgba(168, 85, 247, 0.8)", // purple
        "rgba(236, 72, 153, 0.8)", // pink
        "rgba(234, 179, 8, 0.8)", // yellow
      ],
    },
  ],
};

export function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <BarChart3 size={24} />
        </div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Activity}
          title="Treinos este mês"
          value={mockData.workoutStats.thisMonth}
          trend="+23% vs. mês anterior"
        />
        <StatCard
          icon={Calendar}
          title="Sequência atual"
          value={`${mockData.workoutStats.streak} dias`}
          color="green"
        />
        <StatCard
          icon={Clock}
          title="Duração média"
          value={`${mockData.workoutStats.avgDuration}min`}
          color="yellow"
        />
        <StatCard
          icon={Trophy}
          title="Taxa de conclusão"
          value={`${mockData.workoutStats.completionRate}%`}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
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

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Volume por Grupo Muscular
          </h3>
          <div className="aspect-square max-w-md mx-auto">
            <Doughnut
              data={muscleGroupChart}
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

      {/* Personal Records and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-500" size={24} />
            <h3 className="text-lg font-semibold">Recordes Pessoais</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mockData.personalRecords.map((record, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900">
                  {record.exercise}
                </h4>
                <div className="mt-2 flex items-center gap-2">
                  <WeightIcon size={16} className="text-blue-600" />
                  <span className="text-2xl font-bold">{record.weight}kg</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{record.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-blue-500" size={24} />
            <h3 className="text-lg font-semibold">Metas e Objetivos</h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-medium">Objetivo Principal</h4>
                  <p className="text-sm text-gray-600">
                    Ganho de Massa Muscular
                  </p>
                </div>
                <Zap className="text-yellow-500" size={24} />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-medium">Meta de Treinos</h4>
                  <p className="text-sm text-gray-600">
                    12 de 15 treinos este mês
                  </p>
                </div>
                <Dumbbell className="text-purple-500" size={24} />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-medium">Meta de Peso</h4>
                  <p className="text-sm text-gray-600">75kg / 78kg</p>
                </div>
                <WeightIcon className="text-green-500" size={24} />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "65%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-blue-500" size={24} />
          <h3 className="text-lg font-semibold">Atividade Recente</h3>
        </div>

        <div className="space-y-4">
          {mockData.recentWorkouts.map((workout, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Dumbbell size={20} />
                </div>
                <div>
                  <h4 className="font-medium">{workout.name}</h4>
                  <p className="text-sm text-gray-600">
                    {workout.exercises} exercícios • {workout.duration} minutos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    workout.intensity === "Alta"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {workout.intensity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
