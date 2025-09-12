'use client'

import { useState, useEffect } from 'react'
import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WorkoutCard } from '@/components/workouts/workout-card'
import { mockWorkouts } from '@/data/mock-data'

// Componente de Skeleton para WorkoutCard
const SkeletonWorkoutCard = () => (
  <div className="bg-card rounded-lg border p-4 sm:p-6">
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      // Simular carregamento assíncrono
      await new Promise(resolve => setTimeout(resolve, 1200))
      setIsLoading(false)
    }
    
    loadData()
  }, [])
  
  // Usar os dados mock que já têm IDs
  const workouts = mockWorkouts.map(workout => ({
    id: workout.id,
    title: workout.title,
    exerciseCount: workout.exerciseCount,
    exercises: workout.exercises.map(exercise => ({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      rest: exercise.rest
    }))
  }))

  if (isLoading) {
    return (
      <div className="h-full w-full p-10 space-y-8">
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
        <div className="space-y-4">
          {['skeleton-workout-1', 'skeleton-workout-2', 'skeleton-workout-3', 'skeleton-workout-4'].map((id) => (
            <SkeletonWorkoutCard key={id} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full p-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">Meus Treinos</h1>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button size="sm" className="sm:size-default">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Novo Treino</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>
      </div>

      {/* Workout Cards */}
      <div className="space-y-4">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            id={workout.id}
            title={workout.title}
            exerciseCount={workout.exerciseCount}
            exercises={workout.exercises}
          />
        ))}
      </div>
    </div>
  )
}
