export interface Exercise {
  id: string
  name: string
  image?: string
  description: string
  muscleGroupId: string
  videoUrl?: string
}

export interface MuscleGroup {
  id: string
  name: string
  description: string
  image: string
  exercises: Exercise[]
  createdAt: string
  updatedAt: string
}

export interface CreateMuscleGroupData {
  name: string
  description: string
  image: string
}

export interface CreateExerciseData {
  muscleGroupId: string
  name: string
  image?: string
  description: string
  videoUrl?: string
}

// Simulação de banco de dados em memória compartilhado
export const muscleGroups: MuscleGroup[] = []
