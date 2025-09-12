'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { mockWorkouts } from '@/data/mock-data'
import { Play, Trash2, Clock, Weight, Repeat, Timer, ChevronRight } from 'lucide-react'

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  weight: string
  rest: string
  muscleGroup: string
  instructions?: string
  videoUrl?: string
}

interface Workout {
  id: string
  title: string
  exerciseCount: number
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  muscleGroups: string[]
  createdAt: string
  lastPerformed: string
  exercises: Exercise[]
}

// Componentes de Skeleton
const SkeletonCard = () => (
  <Card>
    <CardHeader>
      <div className="space-y-2">
        <div className="h-6 bg-muted rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-10 bg-muted rounded animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-1/4"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/3"></div>
      </div>
      <div className="space-y-2">
        <div className="h-10 bg-muted rounded animate-pulse"></div>
        <div className="h-10 bg-muted rounded animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
)

const SkeletonExerciseList = () => {
  const skeletonItems = [
    'skeleton-exercise-1',
    'skeleton-exercise-2', 
    'skeleton-exercise-3',
    'skeleton-exercise-4',
    'skeleton-exercise-5',
    'skeleton-exercise-6'
  ]
  
  return (
    <Card className="min-h-[400px] sm:min-h-[600px] flex flex-col">
      <CardHeader>
        <div className="h-6 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {skeletonItems.map((id) => (
            <div key={id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-muted rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                </div>
                <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const SkeletonExerciseDetails = () => {
  const skeletonTiles = [
    'skeleton-tile-1',
    'skeleton-tile-2',
    'skeleton-tile-3',
    'skeleton-tile-4'
  ]
  
  return (
    <Card className="min-h-[400px] sm:min-h-[600px] flex flex-col">
      <CardHeader>
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse w-2/3"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-muted rounded animate-pulse w-20"></div>
            <div className="h-8 bg-muted rounded animate-pulse w-32"></div>
            <div className="h-8 bg-muted rounded animate-pulse w-20"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <div className="aspect-video bg-muted rounded-lg animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-6 bg-muted rounded animate-pulse w-1/4"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {skeletonTiles.map((id) => (
            <div key={id} className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="h-6 w-6 mx-auto mb-2 bg-muted rounded animate-pulse"></div>
              <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function WorkoutDetailPage() {
  const params = useParams()
  const workoutId = params.id as string
  
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseData, setExerciseData] = useState({
    sets: '',
    reps: '',
    weight: '',
    rest: ''
  })

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      // Simular carregamento assíncrono
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setWorkouts(mockWorkouts)
      
      // Debug: verificar o ID recebido
      console.log('Workout ID recebido:', workoutId)
      console.log('Treinos disponíveis:', mockWorkouts.map(w => ({ id: w.id, title: w.title })))
      
      // Encontrar o treino selecionado
      const workout = mockWorkouts.find(w => w.id === workoutId)
      console.log('Treino encontrado:', workout)
      
      if (workout) {
        setSelectedWorkout(workout)
        setSelectedExercise(workout.exercises[0] || null)
      }
      
      setIsLoading(false)
    }
    
    loadData()
  }, [workoutId])

  const handleWorkoutChange = (workoutId: string) => {
    const workout = workouts.find(w => w.id === workoutId)
    if (workout) {
      setSelectedWorkout(workout)
      setSelectedExercise(workout.exercises[0] || null)
      setIsWorkoutStarted(false)
    }
  }

  const handleStartWorkout = () => {
    setIsWorkoutStarted(true)
    setCompletedExercises(new Set())
    setCurrentExerciseIndex(0)
    // Selecionar o primeiro exercício quando iniciar o treino
    if (selectedWorkout && selectedWorkout.exercises.length > 0) {
      setSelectedExercise(selectedWorkout.exercises[0])
    }
  }

  const handleStopWorkout = () => {
    setIsWorkoutStarted(false)
    setCompletedExercises(new Set())
    setCurrentExerciseIndex(0)
    // Voltar para o primeiro exercício do treino atual
    if (selectedWorkout && selectedWorkout.exercises.length > 0) {
      setSelectedExercise(selectedWorkout.exercises[0])
    }
  }

  const handleFinishWorkout = () => {
    if (selectedWorkout) {
      // Marcar o treino como concluído
      setCompletedWorkouts(prev => new Set([...prev, selectedWorkout.id]))
      
      // Encontrar o próximo treino não concluído
      const currentWorkoutIndex = workouts.findIndex(w => w.id === selectedWorkout.id)
      const nextWorkout = workouts.find((workout, index) => 
        index > currentWorkoutIndex && !completedWorkouts.has(workout.id)
      )
      
      if (nextWorkout) {
        // Ir para o próximo treino não concluído
        setSelectedWorkout(nextWorkout)
        setSelectedExercise(nextWorkout.exercises[0] || null)
        setCurrentExerciseIndex(0)
        setCompletedExercises(new Set())
        setIsWorkoutStarted(false)
      } else {
        // Todos os treinos foram concluídos
        setIsWorkoutStarted(false)
        setCompletedExercises(new Set())
        setCurrentExerciseIndex(0)
      }
    }
  }


  const handleCompleteExercise = () => {
    if (selectedExercise) {
      // Preencher os dados do exercício no modal
      setExerciseData({
        sets: selectedExercise.sets.toString(),
        reps: selectedExercise.reps,
        weight: selectedExercise.weight,
        rest: selectedExercise.rest
      })
      setIsModalOpen(true)
    }
  }

  const handleConfirmExercise = () => {
    if (selectedExercise) {
      setCompletedExercises(prev => new Set([...prev, selectedExercise.id]))
      setIsModalOpen(false)
      
      // Ir para o próximo exercício
      if (selectedWorkout) {
        const nextIndex = currentExerciseIndex + 1
        if (nextIndex < selectedWorkout.exercises.length) {
          setCurrentExerciseIndex(nextIndex)
          setSelectedExercise(selectedWorkout.exercises[nextIndex])
        }
        // Não chama handleWorkoutCompleted() automaticamente
        // Aguarda o usuário clicar no botão "Finalizar Treino"
      }
    }
  }

  const handleCancelExercise = () => {
    setIsModalOpen(false)
  }


  const handleUncompleteExercise = () => {
    if (selectedExercise) {
      setCompletedExercises(prev => {
        const newSet = new Set(prev)
        newSet.delete(selectedExercise.id)
        return newSet
      })
    }
  }

  const handlePreviousExercise = () => {
    if (selectedWorkout) {
      const prevIndex = currentExerciseIndex - 1
      if (prevIndex >= 0) {
        setCurrentExerciseIndex(prevIndex)
        setSelectedExercise(selectedWorkout.exercises[prevIndex])
      }
    }
  }

  const handleNextExercise = () => {
    if (selectedWorkout) {
      const nextIndex = currentExerciseIndex + 1
      if (nextIndex < selectedWorkout.exercises.length) {
        setCurrentExerciseIndex(nextIndex)
        setSelectedExercise(selectedWorkout.exercises[nextIndex])
      }
    }
  }

  const isLastExercise = () => {
    if (!selectedWorkout) return false
    return currentExerciseIndex === selectedWorkout.exercises.length - 1
  }


  const isExerciseCompleted = (exerciseId: string) => {
    return completedExercises.has(exerciseId)
  }

  const isFirstExercise = () => {
    return currentExerciseIndex === 0
  }

  const isAllExercisesCompleted = () => {
    if (!selectedWorkout) return false
    return selectedWorkout.exercises.every(exercise => completedExercises.has(exercise.id))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
          {/* Coluna Esquerda - Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            <SkeletonCard />
            <SkeletonExerciseList />
          </div>
          
          {/* Coluna Direita - Skeleton */}
          <div className="lg:col-span-2">
            <SkeletonExerciseDetails />
          </div>
        </div>
      </div>
    )
  }

  if (!selectedWorkout) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">Treino não encontrado</h2>
          <p className="text-muted-foreground">O treino solicitado não foi encontrado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-10 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
        {/* Coluna Esquerda - 1/3 da tela */}
        <div className="space-y-4 sm:space-y-6">
          {/* Card de Seleção do Treino */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                {selectedWorkout.title}
              </CardTitle>
              <CardDescription>
                {selectedWorkout.exerciseCount} exercícios • {selectedWorkout.duration} min
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Select de Treinos */}
              <div>
                <label htmlFor="workout-select" className="text-sm font-medium mb-2 block">Selecionar Treino</label>
                <select
                  id="workout-select"
                  value={selectedWorkout.id}
                  onChange={(e) => handleWorkoutChange(e.target.value)}
                  className="w-full p-2 border-2 border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                >
                  {workouts.map((workout) => (
                    <option key={workout.id} value={workout.id}>
                      {workout.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Informações do Treino */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Grupos Musculares:</span>
                  <span className="font-medium">{selectedWorkout.muscleGroups.join(', ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Último Treino:</span>
                  <span className="font-medium">{selectedWorkout.lastPerformed}</span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-2">
                 <Button 
                   onClick={
                     isWorkoutStarted 
                       ? (isAllExercisesCompleted() ? handleFinishWorkout : handleStopWorkout)
                       : handleStartWorkout
                   }
                   className="flex-1"
                   variant={
                     isWorkoutStarted 
                       ? (isAllExercisesCompleted() ? "default" : "destructive")
                       : "default"
                   }
                 >
                   {isWorkoutStarted ? (
                     isAllExercisesCompleted() ? (
                       <>
                         <Play className="h-4 w-4 mr-2" />
                         Finalizar Treino
                       </>
                     ) : (
                       <>
                         <Trash2 className="h-4 w-4 mr-2" />
                         Parar Treino
                       </>
                     )
                   ) : (
                     <>
                       <Play className="h-4 w-4 mr-2" />
                       Iniciar Treino
                     </>
                   )}
                 </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card de Exercícios */}
          <Card className="min-h-[400px] sm:min-h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Exercícios</CardTitle>
              <CardDescription>
                Clique em um exercício para ver os detalhes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div key={exercise.id}>
                    <button
                      type="button"
                      className={`w-full p-4 text-left hover:bg-accent transition-colors cursor-pointer ${
                        selectedExercise?.id === exercise.id ? 'bg-primary/10 border-l-4 border-primary' : ''
                      } ${
                        isExerciseCompleted(exercise.id) ? 'border-l-4 border-green-500' : ''
                      }`}
                      onClick={() => setSelectedExercise(exercise)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedExercise(exercise)
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {index + 1}.
                            </span>
                            <h4 className="font-medium">{exercise.name}</h4>
                          </div>
                          <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Repeat className="h-3 w-3" />
                              {exercise.sets} séries
                            </span>
                            <span className="flex items-center gap-1">
                              <Weight className="h-3 w-3" />
                              {exercise.weight}
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              {exercise.rest}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                    {index < selectedWorkout.exercises.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita - 2/3 da tela */}
        <div className="lg:col-span-2">
          {selectedExercise ? (
            <Card className="min-h-[400px] sm:min-h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl">{selectedExercise.name}</CardTitle>
                    <CardDescription>
                      Grupo muscular: {selectedExercise.muscleGroup}
                    </CardDescription>
                  </div>
                  {isWorkoutStarted && (
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <div className="flex gap-2">
                        {!isFirstExercise() && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousExercise}
                            className="flex-1 sm:flex-none"
                          >
                            ← Anterior
                          </Button>
                        )}
                        {!isLastExercise() && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextExercise}
                            className="flex-1 sm:flex-none"
                          >
                            Próximo →
                          </Button>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={isExerciseCompleted(selectedExercise.id) ? handleUncompleteExercise : handleCompleteExercise}
                        variant={isExerciseCompleted(selectedExercise.id) ? "outline" : "default"}
                        className="w-full sm:w-auto"
                      >
                        {isExerciseCompleted(selectedExercise.id) ? (
                          <>↶ Desfazer Conclusão</>
                        ) : (
                          <>Concluir Exercício</>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                {/* Video do Exercício */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Vídeo do exercício</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedExercise.videoUrl || 'Vídeo não disponível'}
                    </p>
                  </div>
                </div>

                {/* Instruções */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Instruções</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground">
                      {selectedExercise.instructions || 
                        `Execute o exercício ${selectedExercise.name} com ${selectedExercise.sets} séries de ${selectedExercise.reps} repetições. 
                        Use ${selectedExercise.weight} de peso e descanse ${selectedExercise.rest} entre as séries. 
                        Mantenha a postura correta e execute o movimento de forma controlada.`}
                    </p>
                  </div>
                </div>

                {/* Tiles de Informações */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Repeat className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{selectedExercise.sets}</div>
                    <div className="text-sm text-muted-foreground">Séries</div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Weight className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{selectedExercise.reps}</div>
                    <div className="text-sm text-muted-foreground">Repetições</div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Weight className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{selectedExercise.weight}</div>
                    <div className="text-sm text-muted-foreground">Peso</div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{selectedExercise.rest}</div>
                    <div className="text-sm text-muted-foreground">Descanso</div>
                  </div>
                </div>


              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Selecione um exercício</h3>
                  <p className="text-muted-foreground">
                    Clique em um exercício na lista ao lado para ver os detalhes
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

        {/* Modal de Confirmação */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirmar Exercício</h3>
            <p className="text-muted-foreground mb-4">
              Confirme os dados do exercício <strong>{selectedExercise?.name}</strong>:
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sets-input" className="text-sm font-medium mb-1 block">Séries</label>
                  <input
                    id="sets-input"
                    type="number"
                    value={exerciseData.sets}
                    onChange={(e) => setExerciseData(prev => ({ ...prev, sets: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                  />
                </div>
                <div>
                  <label htmlFor="reps-input" className="text-sm font-medium mb-1 block">Repetições</label>
                  <input
                    id="reps-input"
                    type="text"
                    value={exerciseData.reps}
                    onChange={(e) => setExerciseData(prev => ({ ...prev, reps: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                  />
                </div>
                <div>
                  <label htmlFor="weight-input" className="text-sm font-medium mb-1 block">Peso</label>
                  <input
                    id="weight-input"
                    type="text"
                    value={exerciseData.weight}
                    onChange={(e) => setExerciseData(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                  />
                </div>
                <div>
                  <label htmlFor="rest-input" className="text-sm font-medium mb-1 block">Descanso</label>
                  <input
                    id="rest-input"
                    type="text"
                    value={exerciseData.rest}
                    onChange={(e) => setExerciseData(prev => ({ ...prev, rest: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <Button
                variant="outline"
                onClick={handleCancelExercise}
                className="flex-1 order-2 sm:order-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmExercise}
                className="flex-1 order-1 sm:order-2"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
