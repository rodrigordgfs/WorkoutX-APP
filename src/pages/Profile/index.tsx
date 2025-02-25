import React, { useState, useEffect } from "react";
import { User, Save, LoaderIcon } from "lucide-react";
import { UserProfile, useUserProfile } from "@/context/UserContext";
import { SectionTitle } from "@/components/Shared/SectionTitle";

export type FitnessGoal =
  | "WEIGHT_LOSS"
  | "MUSCLE_GAIN"
  | "MAINTENANCE"
  | "ENDURANCE"
  | "GENERAL_FITNESS"
  | "REHABILITATION"
  | "ATHLETIC_PERFORMANCE"
  | "STRESS_RELIEF"
  | "PERFORMANCE"
  | "MOBILITY"
  | "COMPETITION"
  | "ENERGY_BOOST"
  | "STRENGTH"
  | "MUSCLE_DEFINITION"
  | "OUTDOOR_PREP"
  | "MENTAL_HEALTH";

export const FitnessGoalLabels: Record<FitnessGoal, string> = {
  WEIGHT_LOSS: "Perda de Peso",
  MUSCLE_GAIN: "Ganho de Massa Muscular",
  MAINTENANCE: "Manutenção do Peso",
  ENDURANCE: "Melhora da Resistência Física",
  GENERAL_FITNESS: "Aumento da Flexibilidade",
  REHABILITATION: "Reabilitação e Recuperação Física",
  ATHLETIC_PERFORMANCE: "Melhoria da Saúde Cardiovascular",
  STRESS_RELIEF: "Redução do Estresse e Ansiedade",
  PERFORMANCE: "Aprimoramento da Performance Esportiva",
  MOBILITY: "Melhoria da Mobilidade e Postura",
  COMPETITION: "Treinamento para Competições",
  ENERGY_BOOST: "Aumento da Energia e Disposição",
  STRENGTH: "Fortalecimento Muscular Geral",
  MUSCLE_DEFINITION: "Definição Muscular",
  OUTDOOR_PREP: "Preparação para Atividades ao Ar Livre",
  MENTAL_HEALTH: "Melhoria da Saúde Mental e Bem-Estar",
};

export type ExperienceLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "PROFESSIONAL"
  | "ATHLETE"
  | "CASUAL"
  | "REHABILITATION"
  | "SENIOR";

export const ExperienceLevelLabels: Record<ExperienceLevel, string> = {
  BEGINNER: "Iniciante",
  INTERMEDIATE: "Intermediário",
  ADVANCED: "Avançado",
  PROFESSIONAL: "Profissional",
  ATHLETE: "Atleta",
  CASUAL: "Casual/Fitness Leve",
  REHABILITATION: "Reabilitação",
  SENIOR: "Idoso/Condicionamento Específico",
};

export function ProfilePage() {
  const { profile, savingProfile, updateProfile } = useUserProfile();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (profile) {
      setUserProfile({
        id: profile.id ?? "",
        name: profile.name ?? "",
        email: profile.email ?? "",
        avatar: profile.avatar ?? "",
        height: profile.height ?? 0,
        weight: profile.weight ?? 0,
        goal: profile.goal ?? "weight-loss",
        experience: profile.experience ?? "beginner",
        publicProfile: profile.publicProfile ?? true,
      });
    }
  }, [profile]);

  const handleChange = (
    field: keyof UserProfile,
    value: string | number | boolean
  ) => {
    if (userProfile) {
      setUserProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(userProfile as UserProfile);
  };

  if (!userProfile) {
    return <p className="text-center text-zinc-500">Carregando perfil...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle title="Editar Perfil" icon={User} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center mb-6">
            {userProfile.avatar ? (
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-blue-500 rounded-full border-4 border-blue-200 shadow-lg">
                <User size={64} className="text-white" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">Nome</span>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-lg border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </label>

            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">Email</span>
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-lg border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </label>

            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">
                Altura (cm)
              </span>
              <input
                type="number"
                value={userProfile.height}
                onChange={(e) =>
                  handleChange("height", parseInt(e.target.value))
                }
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-lg border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                min="100"
                max="250"
                required
              />
            </label>

            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">
                Peso (kg)
              </span>
              <input
                type="number"
                value={userProfile.weight}
                onChange={(e) =>
                  handleChange("weight", parseInt(e.target.value))
                }
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-lg border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                min="30"
                max="300"
                required
              />
            </label>

            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">Objetivo</span>
              <select
                value={userProfile.goal}
                onChange={(e) =>
                  handleChange("goal", e.target.value as FitnessGoal)
                }
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-lg border-zinc-300 dark:border-zinc-950 shadow-sm focus:border-blue-300 dark:focus:border-blue-700 focus:ring focus:ring-blue-200 dark:focus:ring-blue-700 focus:ring-opacity-50"
              >
                {Object.entries(FitnessGoalLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-zinc-700 dark:text-zinc-200">
                Nível de Experiência
              </span>
              <select
                value={userProfile.experience}
                onChange={(e) =>
                  handleChange("experience", e.target.value as ExperienceLevel)
                }
                className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-lg border-zinc-300 dark:border-zinc-950 shadow-sm focus:border-blue-300 dark:focus:border-blue-700 focus:ring focus:ring-blue-200 dark:focus:ring-blue-700 focus:ring-opacity-50"
              >
                {Object.entries(ExperienceLevelLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={userProfile.publicProfile}
                  onChange={(e) =>
                    handleChange("publicProfile", e.target.checked)
                  }
                  className="rounded border-zinc-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="text-zinc-700 dark:text-zinc-200">
                  Tornar meu perfil público na comunidade
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          {savingProfile ? (
            <div className="flex items-center gap-2">
              <LoaderIcon size={20} className="animate-spin mr-2" />
              Salvando
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save size={20} />
              Salvar Alterações
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
