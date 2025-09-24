'use client'

import { useRouter } from 'next/navigation'
import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WorkoutCard } from '@/components/workouts/workout-card'
import { useUserWorkouts } from '@/hooks/use-workouts'

// Componente de Skeleton para WorkoutCard
const SkeletonWorkoutCard = () => (
  <div className="bg-card rounded-lg border border-input p-4 sm:p-6">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="h-6 bg-muted rounded animate-pulse w-3/4 sm:w-48"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2 sm:w-32"></div>
        </div>
        <div className="h-8 w-8 bg-muted rounded animate-pulse flex-shrink-0 ml-2"></div>
      </div>
      
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="h-10 bg-muted rounded animate-pulse w-full sm:w-32"></div>
        <div className="h-8 bg-muted rounded animate-pulse w-full sm:w-24"></div>
      </div>
    </div>
  </div>
)

export default function WorkoutsPage() {
  const router = useRouter()
  const { data: workouts = [], isLoading, error } = useUserWorkouts()

  const handleCreateWorkout = () => {
    router.push('/create-workout')
  }

  if (error) {
    return (
      <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">Meus Treinos</h1>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Erro ao carregar treinos</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Page Header Skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-muted rounded-lg animate-pulse flex-shrink-0">
              <div className="h-6 w-6 bg-muted rounded"></div>
            </div>
            <div className="h-9 bg-muted rounded animate-pulse w-40 flex-1"></div>
          </div>
          <div className="h-10 bg-muted rounded animate-pulse w-20 sm:w-32 flex-shrink-0"></div>
        </div>

        {/* Workout Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['skeleton-workout-1', 'skeleton-workout-2', 'skeleton-workout-3', 'skeleton-workout-4'].map((id) => (
            <SkeletonWorkoutCard key={id} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">Meus Treinos</h1>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button 
            size="sm" 
            className="sm:size-default"
            onClick={handleCreateWorkout}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Novo Treino</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>
      </div>

      {/* Workout Cards */}
      {workouts.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Nenhum treino encontrado</p>
            <p className="text-sm text-muted-foreground">Crie seu primeiro treino para começar!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              id={workout.id}
              title={workout.name}
              exerciseCount={workout.exercises.length}
              exercises={workout.exercises.map(exercise => ({
                name: exercise.name,
                sets: parseInt(exercise.series),
                reps: exercise.repetitions,
                weight: exercise.weight,
                rest: exercise.restTime,
                videoUrl: exercise.videoUrl
              }))}
            />
          ))}
        </div>
      )}
    </div>
  )
}
