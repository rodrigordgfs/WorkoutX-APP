import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Bar } from "react-chartjs-2";

interface WeeklyTrainingVolumeProps {
  value: Record<string, number>;
}

export const WeeklyTrainingVolumeChart = ({
  value,
}: WeeklyTrainingVolumeProps) => {
  const weeklyTrainingVolumeChart = {
    labels: Object.keys(value).map((date) => {
      const dayAbbr = format(parseISO(date), "EEE", { locale: ptBR });
      return dayAbbr.charAt(0).toUpperCase() + dayAbbr.slice(1, 3);
    }),
    datasets: [
      {
        label: "Volume (kg)",
        data: Object.values(value),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Volume Semanal de Treino</h3>
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
    </div>
  );
};
