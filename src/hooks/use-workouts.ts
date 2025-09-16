'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'
import { apiConfig, getApiUrl } from '@/lib/api-config'

export interface WorkoutExercise {
  id: string
  series: number
  repetitions: number
  weight: number
  rest: number
}

export interface CreateWorkoutData {
  name: string
  privacy: string
  userId: string
  exercises: WorkoutExercise[]
}

export interface UpdateWorkoutData {
  id: string
  name: string
  privacy: string
  exercises: WorkoutExercise[]
}

export interface WorkoutResponse {
  id: string
  name: string
  privacy: string
  exercises: WorkoutExercise[]
  createdAt: string
  updatedAt: string
}

// Interfaces para os dados que vêm da API
export interface ApiWorkoutExercise {
  id: string
  name: string
  image: string
  videoUrl?: string
  description: string
  series: string
  repetitions: string
  weight: string
  restTime: string
  muscleGroup: {
    id: string
    name: string
  }
}

export interface ApiSessionExercise {
  id: string
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  createdAt: string
  updatedAt: string
  series: string
  repetitions: string
  weight: string
  restTime: string
  name: string
  image: string
  videoUrl?: string
  description: string
}

export interface ApiSession {
  id?: string
  status?: 'IN_PROGRESS' | 'COMPLETED'
  startedAt?: string
  endedAt?: string | null
  createdAt?: string
  updatedAt?: string
  exercises?: ApiSessionExercise[]
}

export interface ApiWorkout {
  id: string
  userId: string
  name: string
  visibility: string
  createdAt: string
  updatedAt: string
  session: ApiSession
  exercises: ApiWorkoutExercise[]
}

const createWorkout = async (data: CreateWorkoutData): Promise<WorkoutResponse> => {
  console.log('Dados sendo enviados para criação do treino:', data)
  console.log('URL da API:', getApiUrl(apiConfig.endpoints.workouts))
  
  const response = await fetch(getApiUrl(apiConfig.endpoints.workouts), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar treino')
  }

  return response.json()
}

const fetchUserWorkouts = async (userId: string): Promise<ApiWorkout[]> => {
  const url = new URL(getApiUrl(apiConfig.endpoints.workouts))
  url.searchParams.append('userId', userId)
  
  console.log('Buscando treinos do usuário:', userId)
  console.log('URL da API:', url.toString())
  
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao buscar treinos')
  }

  return response.json()
}

const fetchWorkout = async (workoutId: string): Promise<ApiWorkout> => {
  console.log('Buscando treino específico:', workoutId)
  console.log('URL da API:', getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}`))
  
  const response = await fetch(getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao buscar treino')
  }

  return response.json()
}

const updateWorkout = async (data: UpdateWorkoutData): Promise<ApiWorkout> => {
  console.log('Atualizando treino:', data)
  console.log('URL da API:', getApiUrl(`${apiConfig.endpoints.workouts}/${data.id}`))
  
  const response = await fetch(getApiUrl(`${apiConfig.endpoints.workouts}/${data.id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao atualizar treino')
  }

  return response.json()
}

const deleteWorkout = async (workoutId: string): Promise<void> => {
  console.log('Deletando treino:', workoutId)
  console.log('URL da API:', getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}`))
  
  const response = await fetch(getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao deletar treino')
  }
}

const startWorkout = async (workoutId: string): Promise<ApiWorkout> => {
  console.log('Iniciando treino:', workoutId)
  console.log('URL da API:', getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}/start`))
  
  const response = await fetch(getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}/start`), {
    method: 'PATCH'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao iniciar treino')
  }

  return response.json()
}

const stopWorkout = async (workoutId: string): Promise<ApiWorkout> => {
  console.log('Parando treino:', workoutId)
  console.log('URL da API:', getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}/stop`))
  
  const response = await fetch(getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}/stop`), {
    method: 'PATCH'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao parar treino')
  }

  return response.json()
}

const completeWorkout = async (workoutId: string): Promise<ApiWorkout> => {
  console.log('Finalizando treino:', workoutId)
  console.log('URL da API:', getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}/complete`))
  
  const response = await fetch(getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}/complete`), {
    method: 'PATCH'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao finalizar treino')
  }

  return response.json()
}

const completeExercise = async (workoutId: string, sessionExerciseId: string, exerciseData: {
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
}): Promise<ApiWorkout> => {
  console.log('Concluindo exercício:', { workoutId, sessionExerciseId, exerciseData })
  console.log('URL da API:', getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}/exercise/${sessionExerciseId}/complete`))
  
  const response = await fetch(getApiUrl(`${apiConfig.endpoints.workouts}/${workoutId}/exercise/${sessionExerciseId}/complete`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      series: exerciseData.series,
      repetitions: exerciseData.repetitions,
      weight: exerciseData.weight,
      restTime: exerciseData.restTime
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao concluir exercício')
  }

  return response.json()
}

export const useCreateWorkout = () => {
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: (data: Omit<CreateWorkoutData, 'userId'>) => {
      if (!user) {
        throw new Error('Usuário não autenticado')
      }
      
      const workoutData: CreateWorkoutData = {
        ...data,
        userId: user.id
      }
      
      return createWorkout(workoutData)
    },
    onSuccess: (data) => {
      console.log('Treino criado com sucesso:', data)
      // Invalidar queries relacionadas a treinos se existirem
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
    },
    onError: (error) => {
      console.error('Erro ao criar treino:', error)
    },
  })
}

export const useUserWorkouts = () => {
  const { user } = useUser()

  return useQuery({
    queryKey: ['workouts', user?.id],
    queryFn: () => {
      if (!user) {
        throw new Error('Usuário não autenticado')
      }
      return fetchUserWorkouts(user.id)
    },
    enabled: !!user, // Só executa se o usuário estiver autenticado
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  })
}

// Hook para buscar um treino específico
export const useWorkout = (workoutId: string) => {
  return useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => fetchWorkout(workoutId),
    enabled: !!workoutId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  })
}

// Hook para atualizar um treino
export const useUpdateWorkout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateWorkout,
    onSuccess: (data, variables) => {
      console.log('Treino atualizado com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables.id] })
    },
    onError: (error) => {
      console.error('Erro ao atualizar treino:', error)
    },
  })
}

// Hook para deletar um treino
export const useDeleteWorkout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWorkout,
    onSuccess: (data, variables) => {
      console.log('Treino deletado com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.removeQueries({ queryKey: ['workout', variables] })
    },
    onError: (error) => {
      console.error('Erro ao deletar treino:', error)
    },
  })
}

// Hook para iniciar um treino
export const useStartWorkout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: startWorkout,
    onSuccess: (data, variables) => {
      console.log('Treino iniciado com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables] })
    },
    onError: (error) => {
      console.error('Erro ao iniciar treino:', error)
    },
  })
}

// Hook para parar um treino
export const useStopWorkout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: stopWorkout,
    onSuccess: (data, variables) => {
      console.log('Treino parado com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables] })
    },
    onError: (error) => {
      console.error('Erro ao parar treino:', error)
    },
  })
}

// Hook para finalizar um treino
export const useCompleteWorkout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: completeWorkout,
    onSuccess: (data, variables) => {
      console.log('Treino finalizado com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables] })
    },
    onError: (error) => {
      console.error('Erro ao finalizar treino:', error)
    },
  })
}

// Hook para concluir um exercício
export const useCompleteExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      workoutId, 
      sessionExerciseId, 
      exerciseData 
    }: { 
      workoutId: string; 
      sessionExerciseId: string;
      exerciseData: {
        series: string;
        repetitions: string;
        weight: string;
        restTime: string;
      };
    }) => 
      completeExercise(workoutId, sessionExerciseId, exerciseData),
    onSuccess: (data, variables) => {
      console.log('Exercício concluído com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables.workoutId] })
    },
    onError: (error) => {
      console.error('Erro ao concluir exercício:', error)
    },
  })
}
