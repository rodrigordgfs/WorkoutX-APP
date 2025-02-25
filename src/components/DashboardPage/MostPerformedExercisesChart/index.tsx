import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

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
      <h3 className="text-lg font-semibold mb-4">Exercícios mais realizados</h3>
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
  );
};
