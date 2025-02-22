import { useState } from "react";
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

const workoutHistory: WorkoutHistory[] = [
  {
    id: "ea77307d-9748-4461-8191-6c2b1aab4128",
    startedAt: "2025-02-22T02:36:59.487Z",
    endedAt: null,
    duration: "Em andamento",
    workout: {
      name: "Treino C - Deltoides, Quadríceps e Posterior de Coxa",
      visibility: "PUBLIC",
      createdAt: "2025-02-22T02:11:36.718Z",
    },
    exercises: [
      {
        id: "1d4669a5-20f9-4041-b530-799ebd4f8abc",
        name: "Desenvolvimento de Ombros na Máquina",
        series: "4",
        repetitions: "8 - 12",
        weight: "20",
        restTime: "60",
        completed: false,
      },
      {
        id: "ed236e80-fb2a-4399-8340-2599caa6288f",
        name: "Elevação Frontal com Halteres",
        series: "4",
        repetitions: "8 - 12",
        weight: "10",
        restTime: "45",
        completed: false,
      },
      {
        id: "8eef88d4-2c03-48b3-8e22-206f64eb8ce5",
        name: "Elevação Lateral com Halteres",
        series: "4",
        repetitions: "8 - 12",
        weight: "10",
        restTime: "45",
        completed: false,
      },
      {
        id: "f6054018-f6f4-4fca-b506-eb486004b59e",
        name: "Crucifixo Invertido Usando o Voador",
        series: "4",
        repetitions: "8 - 12",
        weight: "15",
        restTime: "60",
        completed: false,
      },
      {
        id: "1959c25b-e066-4cc1-b965-0c0830c29497",
        name: "Agachamento Livre",
        series: "4",
        repetitions: "8 - 12",
        weight: "40",
        restTime: "90",
        completed: false,
      },
      {
        id: "57c174e7-5473-4c7c-b8e3-700ef240f823",
        name: "Leg Press",
        series: "4",
        repetitions: "8 - 12",
        weight: "80",
        restTime: "90",
        completed: false,
      },
      {
        id: "f699e81c-4ddb-4ffd-a516-94d965b04c1a",
        name: "Avanço com Halteres",
        series: "3",
        repetitions: "8 - 12",
        weight: "15",
        restTime: "60",
        completed: false,
      },
      {
        id: "604485c3-455a-4fc3-b9a0-491bdd123e2c",
        name: "Máquina Flexora",
        series: "4",
        repetitions: "8 - 12",
        weight: "25",
        restTime: "60",
        completed: false,
      },
      {
        id: "995815a6-8775-4758-a7f6-020b7d298e3d",
        name: "Stiff com Barra",
        series: "2",
        repetitions: "8 - 12",
        weight: "30",
        restTime: "60",
        completed: false,
      },
      {
        id: "2ff71c0b-aae4-436c-b892-896e2a95774a",
        name: "Desenvolvimento com Halteres",
        series: "4",
        repetitions: "8 - 12",
        weight: "15",
        restTime: "60",
        completed: true,
      },
    ],
    stats: {
      totalExercises: 10,
      completedExercises: 1,
      completionRate: "10%",
    },
  },
  {
    id: "bcbe2dcd-5666-4ad6-ae61-3ade11d00a85",
    startedAt: "2025-02-22T02:47:37.544Z",
    endedAt: "2025-02-22T04:12:37.544Z",
    duration: "Em andamento",
    workout: {
      name: "Treino A - Peito e Bíceps",
      visibility: "PUBLIC",
      createdAt: "2025-02-22T02:11:36.420Z",
    },
    exercises: [
      {
        id: "3baa4e7a-0b6a-4071-b68a-3bc309306154",
        name: "Rosca Alternada com Halteres",
        series: "4",
        repetitions: "8 - 12",
        weight: "10",
        restTime: "60",
        completed: true,
      },
      {
        id: "c9a66eb4-38f8-4bde-97ac-6e5a1f8358cf",
        name: "Supino Inclinado",
        series: "4",
        repetitions: "8 - 12",
        weight: "20",
        restTime: "60",
        completed: false,
      },
      {
        id: "af69dd17-5929-42a8-8f0d-5dbc108d9db2",
        name: "Rosca Direta com Barra",
        series: "4",
        repetitions: "8 - 12",
        weight: "15",
        restTime: "60",
        completed: false,
      },
      {
        id: "b500a563-d455-4b60-a121-39d6e81697d7",
        name: "Rosca Scott com Barra W",
        series: "4",
        repetitions: "8 - 12",
        weight: "20",
        restTime: "60",
        completed: false,
      },
      {
        id: "f5cf8cd6-3968-486f-a945-e781e6c4c810",
        name: "Rosca Concentrada com Halter",
        series: "4",
        repetitions: "8 - 12",
        weight: "10",
        restTime: "60",
        completed: false,
      },
      {
        id: "31c8c5a0-19ad-4ef4-8c94-ede01bbfb553",
        name: "Supino Reto",
        series: "4",
        repetitions: "8 - 12",
        weight: "20",
        restTime: "60",
        completed: false,
      },
      {
        id: "46cf64af-5d1d-4103-b82e-5b3474028f70",
        name: "Pullover",
        series: "4",
        repetitions: "8 - 12",
        weight: "15",
        restTime: "60",
        completed: true,
      },
      {
        id: "8ce24fdb-4fc1-4f75-aac4-ca33e9cd62af",
        name: "Crossover",
        series: "4",
        repetitions: "8 - 12",
        weight: "10",
        restTime: "60",
        completed: true,
      },
    ],
    stats: {
      totalExercises: 8,
      completedExercises: 3,
      completionRate: "38%",
    },
  },
  {
    id: "a9ac177f-277d-4729-917a-0399ba251a6a",
    startedAt: "2025-02-22T02:11:52.552Z",
    endedAt: "2025-02-22T02:59:16.018Z",
    duration: 47,
    workout: {
      name: "Treino B - Costas e Tríceps",
      visibility: "PUBLIC",
      createdAt: "2025-02-22T02:11:36.604Z",
    },
    exercises: [
      {
        id: "34662ed9-bc30-4404-8504-67cb15f11459",
        name: "Remada Curvado",
        series: "4",
        repetitions: "8 - 12",
        weight: "25",
        restTime: "60",
        completed: true,
      },
      {
        id: "b8c101e6-45a6-47fb-9678-c5d763fa1703",
        name: "Tríceps Corda na Polia",
        series: "4",
        repetitions: "8 - 12",
        weight: "20",
        restTime: "60",
        completed: true,
      },
      {
        id: "c5fe7132-91d1-4ea7-8099-354300aa1de7",
        name: "Tríceps Testa com Barra",
        series: "4",
        repetitions: "8 - 12",
        weight: "15",
        restTime: "60",
        completed: true,
      },
      {
        id: "38ac1d11-9d03-4632-9e6b-9bd2b5f84a58",
        name: "Serrote",
        series: "4",
        repetitions: "8 - 12",
        weight: "20",
        restTime: "60",
        completed: true,
      },
      {
        id: "d5b63170-54e5-432a-b151-8de3924633d9",
        name: "Extensão de Tríceps com Halteres Unilateral",
        series: "4",
        repetitions: "8 - 12",
        weight: "12",
        restTime: "60",
        completed: true,
      },
      {
        id: "d3017e5b-fff4-4358-a07b-044a8b1141d8",
        name: "Puxada Alta",
        series: "4",
        repetitions: "8 - 12",
        weight: "30",
        restTime: "60",
        completed: true,
      },
      {
        id: "46548cb8-6b57-4493-b003-4f5e98ed7a55",
        name: "Levantamento Terra",
        series: "4",
        repetitions: "8 - 12",
        weight: "40",
        restTime: "90",
        completed: true,
      },
      {
        id: "dfb1d3cc-adab-482e-abed-bcae74e71f45",
        name: "Tríceps na Polia com Barra",
        series: "4",
        repetitions: "8 - 12",
        weight: "25",
        restTime: "60",
        completed: true,
      },
    ],
    stats: {
      totalExercises: 8,
      completedExercises: 8,
      completionRate: "100%",
    },
  },
];

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

function formatDuration(duration: string | number) {
  if (typeof duration === "string") {
    return duration;
  }
  const minutes = Math.floor(duration);
  return `${minutes} min`;
}

function getStatusColor(completionRate: string) {
  const rate = parseInt(completionRate);
  if (rate === 100) return "text-green-600";
  if (rate > 50) return "text-yellow-600";
  return "text-blue-600";
}

export function WorkoutHistoryPage() {
  const [expandedWorkouts, setExpandedWorkouts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);

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
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Calendar size={24} />
          </div>
          <h2 className="text-2xl font-bold">Histórico de Treinos</h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar treinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={() => setFilterModalOpen(!filterModalOpen)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <Filter size={20} />
            Filtros
          </button>
        </div>

        {filterModalOpen && (
          <div className="mt-4 p-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Período
                </label>
                <select className="w-full rounded-lg border-gray-300">
                  <option>Último mês</option>
                  <option>Últimos 3 meses</option>
                  <option>Último ano</option>
                  <option>Personalizado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select className="w-full rounded-lg border-gray-300">
                  <option>Todos</option>
                  <option>Concluídos</option>
                  <option>Em andamento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordenar por
                </label>
                <select className="w-full rounded-lg border-gray-300">
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
        {workoutHistory.map((workout) => {
          const isExpanded = expandedWorkouts.includes(workout.id);
          const statusColor = getStatusColor(workout.stats.completionRate);

          return (
            <div
              key={workout.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleWorkout(workout.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                      <Dumbbell size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {workout.workout.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(workout.startedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={20} />
                        <span>{formatDuration(workout.duration)}</span>
                      </div>
                      <div className={`font-medium ${statusColor}`}>
                        {workout.stats.completionRate}
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={24} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={24} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 divide-y divide-gray-100">
                  {workout.exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={`p-4 ${
                        exercise.completed ? "bg-green-50" : "hover:bg-gray-50"
                      } transition-colors`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">
                              {exercise.name}
                            </h4>
                            {exercise.completed && (
                              <CheckCircle2
                                size={16}
                                className="text-green-500"
                              />
                            )}
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            {exercise.series} séries × {exercise.repetitions} •{" "}
                            {exercise.weight}kg • {exercise.restTime}s descanso
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-gray-50">
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
