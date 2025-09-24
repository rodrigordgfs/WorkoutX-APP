'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Users, 
  Search, 
  Heart, 
  Dumbbell, 
  X,
  RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useMuscleGroupsContext } from '@/contexts/muscle-groups-context'
import { useQuery } from '@tanstack/react-query'
import { getApiUrl, authenticatedRequest } from '@/lib/api-config'
import { useClerkToken } from '@/hooks/use-clerk-token'
import { useLikeWorkout, useUnlikeWorkout } from '@/hooks/use-workouts'

interface ApiCommunityWorkout {
  id: string
  name: string
  description: string
  createdAt: string
  user: { id: string; name: string; avatar: string }
  muscleGroups: { id: string; name: string }[]
  likesCount: number
  isLiked: boolean
  exercises?: Array<{
    id: string
    name: string
    image?: string
    videoUrl?: string
    description: string
    series: string
    repetitions: string
    weight: string
    restTime: string
    muscleGroup: { id: string; name: string }
  }>
}

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('all')
  const [order, setOrder] = useState<'most_recent' | 'most_liked'>('most_recent')
  const [selectedWorkout, setSelectedWorkout] = useState<ApiCommunityWorkout | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { muscleGroups } = useMuscleGroupsContext()
  const { getAuthToken } = useClerkToken()
  const likeWorkoutMutation = useLikeWorkout()
  const unlikeWorkoutMutation = useUnlikeWorkout()

  // Debounce para o campo de busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: workouts = [], isLoading } = useQuery({
    queryKey: ['community', { order, selectedMuscleGroup }],
    queryFn: async () => {
      const token = await getAuthToken()
      const url = new URL(getApiUrl('/community'))
      url.searchParams.set('order', order)
      if (selectedMuscleGroup !== 'all') url.searchParams.set('muscleGroupId', selectedMuscleGroup)
      return authenticatedRequest<ApiCommunityWorkout[]>(url.pathname + url.search, { method: 'GET', token })
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    const matchesMuscleGroup = selectedMuscleGroup === 'all' || 
                              workout.muscleGroups.some(group => group.id === selectedMuscleGroup)
     
    return matchesSearch && matchesMuscleGroup
  })

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setSelectedMuscleGroup('all')
    setOrder('most_recent')
  }

  // Ordenação aplicada na API; sem ordenação adicional no cliente

  // Dificuldade removida deste layout

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  const handleViewDetails = (workout: ApiCommunityWorkout) => {
    setSelectedWorkout(workout)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedWorkout(null)
  }

  const handleLikeWorkout = async (workoutId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        // Se já está curtido, descurtir (DELETE)
        await unlikeWorkoutMutation.mutateAsync(workoutId)
      } else {
        // Se não está curtido, curtir (POST)
        await likeWorkoutMutation.mutateAsync(workoutId)
      }
    } catch (error) {
      console.error('Erro ao curtir/descurtir treino:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Comunidade</h1>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5', 'skeleton-6'].map((id) => (
              <div key={id} className="bg-card rounded-lg border border-input p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Comunidade</h1>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar treinos por nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Muscle Group Filter */}
              <div>
                <label htmlFor="muscle-group-filter" className="block text-sm font-medium mb-2">
                  Grupo Muscular
                </label>
                <select
                  id="muscle-group-filter"
                  value={selectedMuscleGroup}
                  onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">Todos os grupos</option>
                  {muscleGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label htmlFor="sort-filter" className="block text-sm font-medium mb-2">
                  Ordenar por
                </label>
                <select
                  id="sort-filter"
                  value={order}
                  onChange={(e) => setOrder(e.target.value as 'most_recent' | 'most_liked')}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="most_recent">Mais recentes</option>
                  <option value="most_liked">Mais curtidos</option>
                </select>
              </div>
            </div>

            {/* Results Count and Clear Filters */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredWorkouts.length} treino{filteredWorkouts.length !== 1 ? 's' : ''} encontrado{filteredWorkouts.length !== 1 ? 's' : ''}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredWorkouts.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum treino encontrado</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tente ajustar os filtros de busca
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredWorkouts.map((workout) => (
            <Card key={workout.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewDetails(workout)}>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{workout.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {workout.description}
                      </p>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src={workout.user.avatar}
                        alt={workout.user.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{workout.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(workout.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Muscle Groups */}
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((group) => (
                      <Badge key={group.id} variant="secondary" className="text-xs">
                        {group.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`p-2 ${workout.isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLikeWorkout(workout.id, workout.isLiked)
                        }}
                        disabled={likeWorkoutMutation.isPending || unlikeWorkoutMutation.isPending}
                      >
                        <Heart className={`h-4 w-4 ${workout.isLiked ? 'fill-current' : ''}`} />
                        <span className="hidden sm:inline ml-1">{workout.likesCount}</span>
                      </Button>
                    
                    </div>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDetails(workout)
                      }}
                      className="text-xs md:text-sm"
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal de Detalhes do Treino */}
      {isModalOpen && selectedWorkout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              {/* Header do Modal */}
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div className="flex-1 pr-2">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{selectedWorkout.name}</h2>
                  <p className="text-sm md:text-base text-muted-foreground">{selectedWorkout.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseModal}
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Informações do Autor */}
              <div className="flex items-center space-x-3 mb-4 md:mb-6 p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                  <Image
                    src={selectedWorkout.user.avatar}
                    alt={selectedWorkout.user.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base truncate">{selectedWorkout.user.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Criado em {formatDate(selectedWorkout.createdAt)}
                  </p>
                </div>
                {/* Badge de dificuldade removida do modal */}
              </div>

              {/* Estatísticas do Treino */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="text-center p-3 md:p-4 bg-muted/30 rounded-lg">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-500 mx-auto mb-1 md:mb-2" />
                  <p className="text-lg md:text-2xl font-bold">{selectedWorkout.likesCount}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">curtidas</p>
                </div>
                <div className="text-center p-3 md:p-4 bg-muted/30 rounded-lg">
                  <Dumbbell className="h-5 w-5 md:h-6 md:w-6 text-primary mx-auto mb-1 md:mb-2" />
                  <p className="text-xs md:text-sm text-muted-foreground">Grupos Musculares</p>
                  <div className="mt-1 flex flex-wrap justify-center gap-1">
                    {selectedWorkout.muscleGroups.map(g => (
                      <Badge key={g.id} variant="secondary" className="text-xs">{g.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lista de exercícios */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Dumbbell className="h-5 w-5 mr-2" />
                  Exercícios ({selectedWorkout.exercises?.length || 0})
                </h3>
                <div className="space-y-3">
                  {selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? (
                    selectedWorkout.exercises.map((exercise, index) => (
                      <div key={exercise.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{exercise.name}</p>
                              <p className="text-sm text-muted-foreground capitalize truncate">{exercise.muscleGroup?.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="text-center">
                            <p className="font-medium">{exercise.series}</p>
                            <p className="text-xs">séries</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{exercise.repetitions}</p>
                            <p className="text-xs">reps</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{exercise.weight}</p>
                            <p className="text-xs">peso</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{exercise.restTime}</p>
                            <p className="text-xs">descanso</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum exercício disponível
                    </p>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleLikeWorkout(selectedWorkout.id, selectedWorkout.isLiked)}
                    disabled={likeWorkoutMutation.isPending || unlikeWorkoutMutation.isPending}
                    className={selectedWorkout.isLiked ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${selectedWorkout.isLiked ? 'fill-current' : ''}`} />
                    {selectedWorkout.isLiked ? 'Descurtir' : 'Curtir'}
                  </Button>
                </div>
                <Button onClick={handleCloseModal}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
