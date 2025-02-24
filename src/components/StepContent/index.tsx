import { AIWorkoutFormData } from "../AIWorkoutModal";

interface StepContentProps {
  step: number;
  formData: AIWorkoutFormData;
  updateFormData: <K extends keyof AIWorkoutFormData>(
    key: K,
    value: AIWorkoutFormData[K]
  ) => void;
}

export function StepContent({
  step,
  formData,
  updateFormData,
}: StepContentProps) {
  const RadioGroup = ({
    name,
    options,
    value,
    onChange,
  }: {
    name: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="w-4 h-4 text-blue-600 border-zinc-300 focus:ring-blue-500"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );

  switch (step) {
    case 1:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">1. Objetivo do Treino</h3>
          <RadioGroup
            name="objective"
            options={[
              "Ganho de massa muscular",
              "Perda de gordura",
              "Condicionamento físico",
              "Força e resistência",
              "Definição muscular",
            ]}
            value={formData.objective}
            onChange={(value) => updateFormData("objective", value)}
          />
        </div>
      );
    case 2:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            2. Experiência e Nível de Treino
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Há quanto tempo você treina?
              </p>
              <RadioGroup
                name="trainingTime"
                options={[
                  "Nunca treinei",
                  "Menos de 6 meses",
                  "Entre 6 meses e 1 ano",
                  "Mais de 1 ano",
                ]}
                value={formData.trainingTime}
                onChange={(value) => updateFormData("trainingTime", value)}
              />
            </div>
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Como você classificaria seu nível de experiência?
              </p>
              <RadioGroup
                name="experienceLevel"
                options={["Iniciante", "Intermediário", "Avançado"]}
                value={formData.experienceLevel}
                onChange={(value) => updateFormData("experienceLevel", value)}
              />
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            3. Frequência e Disponibilidade
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Quantas vezes por semana pretende treinar?
              </p>
              <RadioGroup
                name="frequency"
                options={["2x", "3x", "4x", "5x ou mais"]}
                value={formData.frequency}
                onChange={(value) => updateFormData("frequency", value)}
              />
            </div>
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Quanto tempo disponível tem para cada treino?
              </p>
              <RadioGroup
                name="duration"
                options={[
                  "Até 30 minutos",
                  "30 a 45 minutos",
                  "45 minutos a 1 hora",
                  "Mais de 1 hora",
                ]}
                value={formData.duration}
                onChange={(value) => updateFormData("duration", value)}
              />
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">4. Equipamentos e Estrutura</h3>
          <div className="space-y-4">
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Onde você pretende treinar?
              </p>
              <RadioGroup
                name="location"
                options={["Academia", "Casa", "Ar livre"]}
                value={formData.location}
                onChange={(value) => updateFormData("location", value)}
              />
            </div>
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Tem acesso a quais equipamentos?
              </p>
              {[
                "Halteres",
                "Barra e anilhas",
                "Máquina de musculação",
                "Faixas elásticas",
                "Nenhum equipamento",
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.equipment.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData("equipment", [
                          ...formData.equipment,
                          option,
                        ]);
                      } else {
                        updateFormData(
                          "equipment",
                          formData.equipment.filter((item) => item !== option)
                        );
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            5. Preferências e Restrições
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Você tem alguma limitação física ou lesão que precisa ser
                considerada?
              </p>
              <RadioGroup
                name="hasPhysicalLimitation"
                options={["Sim", "Não"]}
                value={formData.hasPhysicalLimitation ? "Sim" : "Não"}
                onChange={(value) =>
                  updateFormData("hasPhysicalLimitation", value === "Sim")
                }
              />
            </div>
            {formData.hasPhysicalLimitation && (
              <div>
                <label
                  htmlFor="limitation-description"
                  className="block text-zinc-700 dark:text-zinc-200 mb-2"
                >
                  Descreva sua limitação:
                </label>
                <input
                  id="limitation-description"
                  type="text"
                  value={formData.limitationDescription}
                  onChange={(e) =>
                    updateFormData("limitationDescription", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Gosta mais de treinos com:
              </p>
              <RadioGroup
                name="preferredTrainingStyle"
                options={[
                  "Peso corporal",
                  "Máquinas",
                  "Halteres e barras",
                  "Mistura de todos",
                ]}
                value={formData.preferredTrainingStyle}
                onChange={(value) =>
                  updateFormData("preferredTrainingStyle", value)
                }
              />
            </div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">6. Hábitos e Estilo de Vida</h3>
          <div className="space-y-4">
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Como está sua alimentação?
              </p>
              <RadioGroup
                name="nutrition"
                options={[
                  "Balanceada",
                  "Regular, mas sem acompanhamento",
                  "Preciso melhorar",
                ]}
                value={formData.nutrition}
                onChange={(value) => updateFormData("nutrition", value)}
              />
            </div>
            <div>
              <p className="text-zinc-700 dark:text-zinc-200 mb-2">
                Como está sua qualidade de sono?
              </p>
              <RadioGroup
                name="sleepQuality"
                options={[
                  "Excelente (7-9h por noite)",
                  "Regular (5-6h por noite)",
                  "Ruim (menos de 5h por noite)",
                ]}
                value={formData.sleepQuality}
                onChange={(value) => updateFormData("sleepQuality", value)}
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
