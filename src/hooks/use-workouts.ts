'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'
import { apiConfig, getApiUrl, authenticatedRequest } from '@/lib/api-config'
import { useClerkToken } from './use-clerk-token'

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
  exercises: WorkoutExercise[]
  description?: string
}

export interface UpdateWorkoutData {
  id: string
  name: string
  privacy: string
  exercises: WorkoutExercise[]
  description?: string
}

export interface WorkoutResponse {
  id: string
  name: string
  privacy: string
  exercises: WorkoutExercise[]
  createdAt: string
  updatedAt: string
  description?: string
}

// Interfaces para os dados que vêm da API
export interface ApiWorkoutExercise {
  id: string
  name: string
  image?: string
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
  image?: string
  videoUrl?: string
  description: string
}

export interface ApiSession {
  id?: string
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'STOPPED' | 'PAUSED'
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
  likesCount: number
  isLiked: boolean
  session: ApiSession
  exercises: ApiWorkoutExercise[]
  description?: string
}

const createWorkout = async (data: CreateWorkoutData, token: string | null): Promise<WorkoutResponse> => {
  console.log('Dados sendo enviados para criação do treino:', data)
  
  return authenticatedRequest<WorkoutResponse>(apiConfig.endpoints.workouts, {
    method: 'POST',
    body: data,
    token
  })
}

const fetchUserWorkouts = async (userId: string, token: string | null): Promise<ApiWorkout[]> => {
  const url = new URL(getApiUrl(apiConfig.endpoints.workouts))
  url.searchParams.append('userId', userId)
  
  console.log('Buscando treinos do usuário:', userId)
  
  return authenticatedRequest<ApiWorkout[]>(url.pathname + url.search, {
    method: 'GET',
    token
  })
}

const fetchWorkout = async (workoutId: string, token: string | null): Promise<ApiWorkout> => {
  console.log('Buscando treino específico:', workoutId)
  
  return authenticatedRequest<ApiWorkout>(`${apiConfig.endpoints.workouts}/${workoutId}`, {
    method: 'GET',
    token
  })
}

const updateWorkout = async (data: UpdateWorkoutData, token: string | null): Promise<ApiWorkout> => {
  console.log('Atualizando treino:', data)
  
  return authenticatedRequest<ApiWorkout>(`${apiConfig.endpoints.workouts}/${data.id}`, {
    method: 'PATCH',
    body: data,
    token
  })
}

const deleteWorkout = async (workoutId: string, token: string | null): Promise<void> => {
  console.log('Deletando treino:', workoutId)
  
  return authenticatedRequest<void>(`${apiConfig.endpoints.workouts}/${workoutId}`, {
    method: 'DELETE',
    token
  })
}

const startWorkout = async (workoutId: string, token: string | null): Promise<ApiWorkout> => {
  console.log('Iniciando treino:', workoutId)
  
  return authenticatedRequest<ApiWorkout>(`${apiConfig.endpoints.workouts}/${workoutId}/start`, {
    method: 'PATCH',
    token
  })
}

const stopWorkout = async (workoutId: string, token: string | null): Promise<ApiWorkout> => {
  console.log('Parando treino:', workoutId)
  
  return authenticatedRequest<ApiWorkout>(`${apiConfig.endpoints.workouts}/${workoutId}/stop`, {
    method: 'PATCH',
    token
  })
}

const pauseWorkout = async (workoutId: string, token: string | null): Promise<ApiWorkout> => {
  console.log('Pausando treino:', workoutId)
  
  return authenticatedRequest<ApiWorkout>(`${apiConfig.endpoints.workouts}/${workoutId}/pause`, {
    method: 'PATCH',
    token
  })
}

const resumeWorkout = async (workoutId: string, token: string | null): Promise<ApiWorkout> => {
  console.log('Retomando treino:', workoutId)
  
  return authenticatedRequest<ApiWorkout>(`${apiConfig.endpoints.workouts}/${workoutId}/start`, {
    method: 'PATCH',
    token
  })
}

const completeWorkout = async (
  workoutId: string,
  token: string | null,
  payload?: { observation?: string }
): Promise<ApiWorkout> => {
  console.log('Finalizando treino:', workoutId, 'payload:', payload)
  
  return authenticatedRequest<ApiWorkout>(`${apiConfig.endpoints.workouts}/${workoutId}/complete`, {
    method: 'PATCH',
    token,
    body: payload && Object.keys(payload).length > 0 ? payload : undefined,
  })
}

const completeExercise = async (workoutId: string, sessionExerciseId: string, exerciseData: {
  series: string;
  repetitions: string;
  weight: string;
  restTime: string;
}, token: string | null): Promise<ApiWorkout> => {
  console.log('Concluindo exercício:', { workoutId, sessionExerciseId, exerciseData })
  
  return authenticatedRequest<ApiWorkout>(`${apiConfig.endpoints.workouts}/${workoutId}/exercise/${sessionExerciseId}/complete`, {
    method: 'PATCH',
    body: {
      series: exerciseData.series,
      repetitions: exerciseData.repetitions,
      weight: exerciseData.weight,
      restTime: exerciseData.restTime
    },
    token
  })
}

const likeWorkout = async (workoutId: string, token: string | null): Promise<{ likesCount: number; isLiked: boolean }> => {
  console.log('Curtindo treino:', workoutId)
  
  return authenticatedRequest<{ likesCount: number; isLiked: boolean }>(`${apiConfig.endpoints.workouts}/${workoutId}/like`, {
    method: 'POST',
    token
  })
}

const unlikeWorkout = async (workoutId: string, token: string | null): Promise<{ likesCount: number; isLiked: boolean }> => {
  console.log('Descurtindo treino:', workoutId)
  
  return authenticatedRequest<{ likesCount: number; isLiked: boolean }>(`${apiConfig.endpoints.workouts}/${workoutId}/like`, {
    method: 'DELETE',
    token
  })
}

export const useCreateWorkout = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (data: CreateWorkoutData) => {
      const token = await getAuthToken()
      return createWorkout(data, token)
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
  const { getAuthToken } = useClerkToken()

  return useQuery({
    queryKey: ['workouts', user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error('Usuário não autenticado')
      }
      const token = await getAuthToken()
      return fetchUserWorkouts(user.id, token)
    },
    enabled: !!user, // Só executa se o usuário estiver autenticado
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  })
}

// Hook para buscar um treino específico
export const useWorkout = (workoutId: string) => {
  const { getAuthToken } = useClerkToken()

  return useQuery({
    queryKey: ['workout', workoutId],
    queryFn: async () => {
      const token = await getAuthToken()
      return fetchWorkout(workoutId, token)
    },
    enabled: !!workoutId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  })
}

// Hook para atualizar um treino
export const useUpdateWorkout = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (data: UpdateWorkoutData) => {
      const token = await getAuthToken()
      return updateWorkout(data, token)
    },
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
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (workoutId: string) => {
      const token = await getAuthToken()
      return deleteWorkout(workoutId, token)
    },
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
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (workoutId: string) => {
      const token = await getAuthToken()
      return startWorkout(workoutId, token)
    },
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
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (workoutId: string) => {
      const token = await getAuthToken()
      return stopWorkout(workoutId, token)
    },
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

// Hook para pausar um treino
export const usePauseWorkout = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (workoutId: string) => {
      const token = await getAuthToken()
      return pauseWorkout(workoutId, token)
    },
    onSuccess: (data, variables) => {
      console.log('Treino pausado com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables] })
    },
    onError: (error) => {
      console.error('Erro ao pausar treino:', error)
    },
  })
}

// Hook para retomar um treino
export const useResumeWorkout = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (workoutId: string) => {
      const token = await getAuthToken()
      return resumeWorkout(workoutId, token)
    },
    onSuccess: (data, variables) => {
      console.log('Treino retomado com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables] })
    },
    onError: (error) => {
      console.error('Erro ao retomar treino:', error)
    },
  })
}

// Hook para finalizar um treino
export const useCompleteWorkout = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (params: { workoutId: string; observation?: string }) => {
      const token = await getAuthToken()
      return completeWorkout(params.workoutId, token, { observation: params.observation })
    },
    onSuccess: (data, variables) => {
      console.log('Treino finalizado com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables.workoutId] })
    },
    onError: (error) => {
      console.error('Erro ao finalizar treino:', error)
    },
  })
}

// Hook para concluir um exercício
export const useCompleteExercise = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async ({ 
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
    }) => {
      const token = await getAuthToken()
      return completeExercise(workoutId, sessionExerciseId, exerciseData, token)
    },
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

// Hook para curtir um treino
export const useLikeWorkout = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (workoutId: string) => {
      const token = await getAuthToken()
      return likeWorkout(workoutId, token)
    },
    onSuccess: (data, variables) => {
      console.log('Treino curtido com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['community'] })
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables] })
    },
    onError: (error) => {
      console.error('Erro ao curtir treino:', error)
    },
  })
}

// Hook para descurtir um treino
export const useUnlikeWorkout = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (workoutId: string) => {
      const token = await getAuthToken()
      return unlikeWorkout(workoutId, token)
    },
    onSuccess: (data, variables) => {
      console.log('Treino descurtido com sucesso:', data)
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['community'] })
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      queryClient.invalidateQueries({ queryKey: ['workout', variables] })
    },
    onError: (error) => {
      console.error('Erro ao descurtir treino:', error)
    },
  })
}
