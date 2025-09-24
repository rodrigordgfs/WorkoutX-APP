'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Save, Search, ChevronDown, ChevronUp, Dumbbell, Trash, GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { useMuscleGroups } from '@/hooks/use-muscle-groups'
import { useExercises } from '@/hooks/use-exercises-list'
import { useCreateWorkout, useWorkout, useUpdateWorkout } from '@/hooks/use-workouts'
import { toast } from 'sonner'

interface SelectedExercise {
  id: string
  name: string
  muscleGroup: string
  image?: string
  sets: number
  reps: number
  weight: number
  rest: number
  isExpanded: boolean
}

// Componente para item arrastável
function DraggableExerciseItem({ 
  exercise, 
  onToggleExpanded, 
  onRemove, 
  onUpdateConfig 
}: {
  exercise: SelectedExercise
  onToggleExpanded: (id: string) => void
  onRemove: (id: string) => void
  onUpdateConfig: (id: string, field: keyof SelectedExercise, value: string | number) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id })

  return (
    <div
      ref={setNodeRef}
      className={`border rounded-lg p-3 sm:p-4 transition-all duration-300 ease-in-out transform ${
        isDragging ? 'scale-105 shadow-xl bg-primary/10 border-primary/30 -translate-y-0.5 z-10' : 'hover:shadow-md'
      }`}
      // Inline styles are required for drag and drop functionality
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {exercise.image ? (
              <Image 
                src={exercise.image} 
                alt={exercise.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm sm:text-base truncate overflow-hidden text-ellipsis whitespace-nowrap">{exercise.name}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground capitalize truncate">{exercise.muscleGroup}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpanded(exercise.id)}
            className="cursor-pointer p-1 sm:p-2"
          >
            {exercise.isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(exercise.id)}
            className="text-destructive hover:text-destructive cursor-pointer p-1 sm:p-2"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-grab active:cursor-grabbing p-1 sm:p-2 hidden sm:flex"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {exercise.isExpanded && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label htmlFor={`sets-${exercise.id}`} className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Séries</label>
              <Input
                id={`sets-${exercise.id}`}
                type="number"
                value={exercise.sets}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateConfig(exercise.id, 'sets', parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
            <div>
              <label htmlFor={`reps-${exercise.id}`} className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Repetições</label>
              <Input
                id={`reps-${exercise.id}`}
                type="number"
                value={exercise.reps}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateConfig(exercise.id, 'reps', parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
            <div>
              <label htmlFor={`weight-${exercise.id}`} className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Peso (kg)</label>
              <Input
                id={`weight-${exercise.id}`}
                type="number"
                value={exercise.weight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateConfig(exercise.id, 'weight', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.5"
              />
            </div>
            <div>
              <label htmlFor={`rest-${exercise.id}`} className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Descanso (min)</label>
              <Input
                id={`rest-${exercise.id}`}
                type="number"
                value={exercise.rest}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateConfig(exercise.id, 'rest', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CreateWorkoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const workoutId = searchParams.get('id') || ''
  const [workoutName, setWorkoutName] = useState('')
  const [privacy, setPrivacy] = useState('PRIVATE')
  const [description, setDescription] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: muscleGroups = [], isLoading: muscleGroupsLoading } = useMuscleGroups()
  const { data: exercises = [], isLoading: exercisesLoading } = useExercises()
  const createWorkoutMutation = useCreateWorkout()
  const updateWorkoutMutation = useUpdateWorkout()
  const { data: workoutToEdit, isLoading: isLoadingWorkout } = useWorkout(workoutId)

  const maxDescriptionLength = 300

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    // Atualizar loading baseado nos dados dos hooks
    setIsLoading(muscleGroupsLoading || exercisesLoading || (!!workoutId && isLoadingWorkout))
  }, [muscleGroupsLoading, exercisesLoading, workoutId, isLoadingWorkout])

  // Preencher formulário no modo edição
  useEffect(() => {
    if (workoutToEdit && workoutId) {
      setWorkoutName(workoutToEdit.name)
      setPrivacy((workoutToEdit.visibility || 'PRIVATE') as string)
      setDescription(workoutToEdit.description || '')
      const mapped: SelectedExercise[] = workoutToEdit.exercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        muscleGroup: ex.muscleGroup?.name || 'Grupo Muscular',
        image: ex.image,
        sets: parseInt(ex.series),
        reps: parseInt(ex.repetitions),
        weight: parseFloat(ex.weight),
        rest: parseInt(ex.restTime),
        isExpanded: false,
      }))
      setSelectedExercises(mapped)
    }
  }, [workoutToEdit, workoutId])

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  const addExercise = (exercise: { id: string; name: string; image?: string; description: string; muscleGroup: { name: string } }) => {
    const newExercise: SelectedExercise = {
      id: exercise.id,
      name: exercise.name,
      muscleGroup: exercise.muscleGroup.name,
      image: exercise.image,
      sets: 4,
      reps: 12,
      weight: 0,
      rest: 60,
      isExpanded: false
    }
    setSelectedExercises([...selectedExercises, newExercise])
  }

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== exerciseId))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setSelectedExercises((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const toggleExerciseExpanded = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.map(ex => 
      ex.id === exerciseId ? { ...ex, isExpanded: !ex.isExpanded } : ex
    ))
  }

  const updateExerciseConfig = (exerciseId: string, field: keyof SelectedExercise, value: string | number) => {
    setSelectedExercises(selectedExercises.map(ex => 
      ex.id === exerciseId ? { ...ex, [field]: value } : ex
    ))
  }

  const filteredGroups = muscleGroups.filter(group => {
    // Se não há termo de busca, mostrar todos os grupos
    if (!searchTerm.trim()) return true
    
    // Verificar se algum exercício do grupo corresponde ao termo de busca
    const groupExercises = exercises.filter(exercise => 
      exercise.muscleGroupId === group.id &&
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    return groupExercises.length > 0
  })

  const filteredExercises = (groupId: string) => {
    // Filtrar exercícios por grupo muscular e termo de busca
    return exercises.filter(exercise => 
      exercise.muscleGroupId === groupId &&
      (searchTerm.trim() === '' || exercise.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }

  if (isLoading) {
    return (
      <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cadastro de Treino</h1>
        </div>
        <div className="space-y-4">
          <div className="h-24 sm:h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="h-80 sm:h-96 bg-muted animate-pulse rounded-lg"></div>
            <div className="lg:col-span-2 h-80 sm:h-96 bg-muted animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{workoutId ? 'Editar Treino' : 'Cadastro de Treino'}</h1>
        </div>
        <Button 
          onClick={async () => {
            const common = {
              name: workoutName,
              privacy: privacy.toUpperCase(),
              description: description || undefined,
              exercises: selectedExercises.map(exercise => ({
                id: exercise.id,
                series: exercise.sets,
                repetitions: exercise.reps,
                weight: exercise.weight,
                rest: exercise.rest
              }))
            }

            try {
              if (workoutId) {
                await updateWorkoutMutation.mutateAsync({ id: workoutId, ...common })
                toast.success('Treino atualizado com sucesso!')
              } else {
                await createWorkoutMutation.mutateAsync(common)
                toast.success('Treino criado com sucesso!')
                // Limpar formulário após sucesso de criação
                setWorkoutName('')
                setPrivacy('PRIVATE')
                setSelectedExercises([])
                setExpandedGroups(new Set())
                setDescription('')
              }
              router.push('/workouts')
            } catch (error) {
              console.error('Erro ao salvar treino:', error)
              toast.error('Erro ao salvar treino. Tente novamente.')
            }
          }}
          disabled={!workoutName.trim() || selectedExercises.length === 0 || createWorkoutMutation.isPending || updateWorkoutMutation.isPending}
          className="w-full sm:w-auto"
        >
          <Save className="h-4 w-4 mr-2" />
          {workoutId ? (updateWorkoutMutation.isPending ? 'Atualizando...' : 'Atualizar Treino') : (createWorkoutMutation.isPending ? 'Salvando...' : 'Salvar Treino')}
        </Button>
      </div>

      {/* Workout Info Card */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="workout-name" className="block text-sm font-medium mb-2">
                Nome do Treino
              </label>
              <Input
                id="workout-name"
                placeholder="Ex: Treino de Peito e Tríceps"
                value={workoutName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkoutName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="privacy" className="block text-sm font-medium mb-2">
                Privacidade
              </label>
              <Select
                id="privacy"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value="PRIVATE">Privado</option>
                <option value="PUBLIC">Público</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Descrição
              </label>
              <Textarea
                id="description"
                placeholder="Descreva o objetivo do treino, estrutura, dicas, etc."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                className="min-h-[160px] sm:min-h-[80px]"
                maxLength={maxDescriptionLength}
              />
              <div className="mt-1 flex items-center justify-end">
                <span className="text-xs text-muted-foreground">
                  {description.length}/{maxDescriptionLength}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Exercise Selection Card - 1/3 */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Selecionar Exercícios</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome do exercício..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {filteredGroups.map((group) => (
              <div key={group.id} className="border rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {group.image ? (
                        <Image 
                          src={group.image} 
                          alt={group.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Dumbbell className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      )}
                    </div>
                    <span className="font-medium text-sm sm:text-base truncate overflow-hidden text-ellipsis whitespace-nowrap">{group.name}</span>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedGroups.has(group.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>
                
                {expandedGroups.has(group.id) && (
                  <div className="border-t p-3 sm:p-4 space-y-2 sm:space-y-3">
                    {filteredExercises(group.id).length > 0 ? (
                      filteredExercises(group.id).map((exercise) => (
                        <div key={exercise.id} className="flex items-center justify-between gap-2 p-2 sm:p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                            {/* Exercise Image */}
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {exercise.image ? (
                                <Image
                                  src={exercise.image}
                                  alt={exercise.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Dumbbell className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                                </div>
                              )}
                            </div>
                            
                            {/* Exercise Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-xs sm:text-sm truncate overflow-hidden text-ellipsis whitespace-nowrap">{exercise.name}</h4>
                              <p className="text-xs text-muted-foreground capitalize truncate">{group.name}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => addExercise(exercise)}
                            disabled={selectedExercises.some(ex => ex.id === exercise.id)}
                            className="cursor-pointer flex-shrink-0"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <Dumbbell className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Nenhum exercício encontrado
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cadastre exercícios para este grupo muscular
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selected Exercises Card - 2/3 */}
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Exercícios Selecionados</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {selectedExercises.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Dumbbell className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm sm:text-base">Nenhum exercício selecionado</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Selecione exercícios do painel ao lado para começar
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={selectedExercises.map(ex => ex.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {selectedExercises.map((exercise) => (
                      <DraggableExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        onToggleExpanded={toggleExerciseExpanded}
                        onRemove={removeExercise}
                        onUpdateConfig={updateExerciseConfig}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
