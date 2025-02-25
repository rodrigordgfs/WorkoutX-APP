import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { TrendingUp } from "lucide-react"; // Adicionando o ícone

interface WeeklyTrainingVolumeProps {
  value: Record<string, number>;
}

export const WeeklyTrainingVolumeChart = ({
  value,
}: WeeklyTrainingVolumeProps) => {
  const [weeklyTrainingVolumeChart, setWeeklyTrainingVolumeChart] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderRadius: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (value && Object.keys(value).length > 0) {
      setWeeklyTrainingVolumeChart({
        labels: Object.keys(value),
        datasets: [
          {
            label: "Volume (kg)",
            data: Object.values(value),
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderRadius: 8,
          },
        ],
      });
    }
  }, [value]);

  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-500" size={24} /> {/* Ícone adicionado */}
        <h3 className="text-lg font-semibold">Volume Semanal de Treino</h3>
      </div>
      {Object.keys(value).length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          Nenhum dado disponível para o volume semanal de treino.
        </p>
      ) : (
        <Bar
          data={weeklyTrainingVolumeChart}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom" as const,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Volume Total (kg)",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};
