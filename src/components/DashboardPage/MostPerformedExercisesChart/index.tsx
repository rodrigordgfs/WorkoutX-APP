import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Dumbbell } from "lucide-react"; // Importando o ícone de halteres

interface MostPerformedExercisesChartProps {
  value: Record<string, number>;
}

export const MostPerformedExercisesChart = ({
  value,
}: MostPerformedExercisesChartProps) => {
  const [workoutExercisesAmmountChart, setWorkoutExercisesAmmountChart] =
    useState<{
      labels: string[];
      datasets: {
        data: number[];
        backgroundColor: string[];
      }[];
    }>({
      labels: [],
      datasets: [],
    });

  useEffect(() => {
    if (value && Object.keys(value).length > 0) {
      setWorkoutExercisesAmmountChart({
        labels: Object.keys(value),
        datasets: [
          {
            data: Object.values(value),
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
      });
    }
  }, [value]);

  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Dumbbell size={24} className="text-blue-500" /> {/* Ícone de Dumbbell */}
        <h3 className="text-lg font-semibold">Exercícios mais realizados</h3>
      </div>
      {Object.keys(value).length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          Nenhum dado disponível para os exercícios mais realizados.
        </p>
      ) : (
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
      )}
    </div>
  );
};
