import { useQuery } from '@tanstack/react-query'
import { apiConfig, authenticatedRequest } from '@/lib/api-config'
import { useClerkToken } from './use-clerk-token'

export interface DashboardActivity {
  id: string
  title: string
  exercises: number
  durationMinutes: number
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'UNCOMPLETED'
  startedAt: string
}

export interface DashboardResponse {
  month: {
    count: number
    variation: number
  }
  streak: number
  averageDurationMinutes: number
  completionRate: number
  activities: DashboardActivity[]
  weeklyVolume: {
    sunday: number
    monday: number
    tuesday: number
    wednesday: number
    thursday: number
    friday: number
    saturday: number
  }
  topExercises: Array<{
    name: string
    count: number
  }>
}

const fetchDashboard = async (token: string | null): Promise<DashboardResponse> => {
  return authenticatedRequest<DashboardResponse>(apiConfig.endpoints.dashboard, {
    method: 'GET',
    token
  })
}

export const useDashboard = () => {
  const { getAuthToken } = useClerkToken()

  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const token = await getAuthToken()
      return fetchDashboard(token)
    },
    staleTime: 60 * 1000,
    refetchOnMount: 'always',
  })
}


