'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { History, Search, ChevronDown, ChevronUp, Dumbbell, Clock, CheckCircle, Play } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useWorkoutHistory } from '@/hooks/use-workout-history'
import { useDebounce } from '@/hooks/use-debounce'


export default function WorkoutHistoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [expandedWorkouts, setExpandedWorkouts] = useState<Set<string>>(new Set())

  // Debounce do termo de pesquisa (1 segundo)
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  // Preparar filtros para a API
  const apiFilters = {
    workoutName: debouncedSearchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    startDate: dateFrom ? `${dateFrom}T00:00:00.000Z` : undefined,
    endDate: dateTo ? `${dateTo}T23:59:59.000Z` : undefined,
  }

  const { data: workoutHistory = [], isLoading, error } = useWorkoutHistory(apiFilters)

  const toggleWorkout = (workoutId: string) => {
    const newExpanded = new Set(expandedWorkouts)
    if (newExpanded.has(workoutId)) {
      newExpanded.delete(workoutId)
    } else {
      newExpanded.add(workoutId)
    }
    setExpandedWorkouts(newExpanded)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const formattedDate = format(date, "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}min`
    }
    return `${mins}min`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-100'
      case 'IN_PROGRESS':
        return 'text-blue-600 bg-blue-100'
      case 'STOPPED':
        return 'text-orange-600 bg-orange-100'
      case 'PAUSED':
        return 'text-yellow-600 bg-yellow-100'
      case 'NOT_STARTED':
        return 'text-gray-600 bg-gray-100'
      case 'UNCOMPLETED':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getExerciseStatusInfo = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return {
          color: 'text-green-600 bg-green-100',
          icon: CheckCircle,
          text: 'Concluído'
        }
      case 'IN_PROGRESS':
        return {
          color: 'text-blue-600 bg-blue-100',
          icon: Clock,
          text: 'Em andamento'
        }
      case 'NOT_STARTED':
        return {
          color: 'text-gray-600 bg-gray-100',
          icon: Clock,
          text: 'Não iniciado'
        }
      case 'UNCOMPLETED':
        return {
          color: 'text-red-600 bg-red-100',
          icon: Dumbbell,
          text: 'Incompleto'
        }
      default:
        return {
          color: 'text-gray-600 bg-gray-100',
          icon: Clock,
          text: 'Desconhecido'
        }
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Concluído'
      case 'IN_PROGRESS':
        return 'Em Andamento'
      case 'STOPPED':
        return 'Parado'
      case 'PAUSED':
        return 'Pausado'
      case 'NOT_STARTED':
        return 'Não Iniciado'
      case 'UNCOMPLETED':
        return 'Incompleto'
      default:
        return 'Desconhecido'
    }
  }

  // Os filtros já são aplicados na API, então usamos os dados diretamente
  const filteredWorkouts = workoutHistory

  const handleSearch = () => {
    // A busca é feita automaticamente através do filteredWorkouts
    // Este botão pode ser usado para futuras funcionalidades como salvar filtros
    console.log('Pesquisando com filtros:', { searchTerm, statusFilter, dateFrom, dateTo })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setDateFrom('')
    setDateTo('')
  }

  const handleAccessWorkout = (workoutId: string) => {
    router.push(`/workouts/${workoutId}`)
  }

  if (isLoading) {
    return (
      <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <History className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Histórico de Treinos</h1>
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
          <div className="space-y-3">
            {['skeleton-1', 'skeleton-2', 'skeleton-3'].map((id) => (
              <div key={id} className="h-32 bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <History className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Histórico de Treinos</h1>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Erro ao carregar histórico</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <History className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight truncate">Histórico de Treinos</h1>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar treinos por nome"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="all">Todos os status</option>
                <option value="COMPLETED">Concluído</option>
                <option value="IN_PROGRESS">Em Andamento</option>
                <option value="STOPPED">Parado</option>
                <option value="PAUSED">Pausado</option>
                <option value="NOT_STARTED">Não Iniciado</option>
                <option value="UNCOMPLETED">Incompleto</option>
                </select>
              </div>

              {/* Date From */}
              <div>
                <label htmlFor="date-from" className="block text-sm font-medium mb-2">
                  Data Inicial
                </label>
                <input
                  id="date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {/* Date To */}
              <div>
                <label htmlFor="date-to" className="block text-sm font-medium mb-2">
                  Data Final
                </label>
                <input
                  id="date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                {filteredWorkouts.length} treino{filteredWorkouts.length !== 1 ? 's' : ''} encontrado{filteredWorkouts.length !== 1 ? 's' : ''}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full sm:w-auto sm:min-w-0"
                  size="sm"
                >
                  Limpar Filtros
                </Button>
                <Button
                  onClick={handleSearch}
                  className="w-full sm:w-auto sm:min-w-0"
                  size="sm"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Pesquisar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workouts List */}
      <div className="space-y-3">
        {filteredWorkouts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum treino encontrado</p>
              <p className="text-sm text-muted-foreground mt-2">
                {searchTerm ? 'Tente ajustar os filtros de busca' : 'Seus treinos aparecerão aqui'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredWorkouts.map((workout) => (
            <Card key={workout.id} className="overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                    {/* Workout Icon */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                    
                    {/* Workout Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{workout.workoutName}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {formatDate(workout.startedAt)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workout.status)}`}>
                          {getStatusLabel(workout.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Info */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start space-x-2 sm:space-x-0 sm:space-y-2">
                    <div className="flex items-center space-x-3 sm:space-x-0 sm:flex-col sm:items-end">
                      <div className="flex items-center space-x-1 text-xs sm:text-sm font-medium">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{formatDuration(workout.duration)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{workout.completionPercentage}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
          {/* Botão para acessar treino quando em andamento, pausado ou parado */}
          {(workout.status === 'IN_PROGRESS' || workout.status === 'STOPPED' || workout.status === 'PAUSED') && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleAccessWorkout(workout.workoutId)}
                          className="text-xs sm:text-sm"
                        >
                          <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Acessar
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWorkout(workout.id)}
                        className="cursor-pointer p-2 flex-shrink-0"
                      >
                        {expandedWorkouts.has(workout.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedWorkouts.has(workout.id) && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm sm:text-base">Exercícios Realizados</h4>
                      <div className="space-y-2">
                        {workout.exercises.map((exercise, index) => {
                          const statusInfo = getExerciseStatusInfo(exercise.status)
                          const StatusIcon = statusInfo.icon
                          
                          return (
                            <div key={`exercise-${workout.id}-${index}`}>
                              <div className="flex items-center justify-between p-2 sm:p-3 bg-muted/30 rounded-lg">
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-xs sm:text-sm truncate mb-1">{exercise.name}</h5>
                                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                                    <span>{exercise.series} séries</span>
                                    <span>{exercise.repetitions} reps</span>
                                    <span>{exercise.weight}kg</span>
                                    <span>{exercise.restTime}s descanso</span>
                                  </div>
                                </div>
                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex-shrink-0 ml-2 sm:ml-3`}>
                                  <StatusIcon className="h-3 w-3" />
                                  <span className="hidden sm:inline">{statusInfo.text}</span>
                                </div>
                              </div>
                              {index < workout.exercises.length - 1 && (
                                <div className="h-px bg-border mx-2 sm:mx-3 my-2"></div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      
                      {/* Summary Stats */}
                      <div className="mt-4 p-2 sm:p-3 bg-muted/20 rounded-lg">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-medium">
                              Exercícios concluídos: {workout.exercises.filter(ex => ex.status === 'COMPLETED').length} de {workout.exercises.length}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs sm:text-sm font-medium">Taxa de conclusão:</span>
                            <span className="text-xs sm:text-sm font-bold text-primary">{workout.completionPercentage}%</span>
                          </div>
                        </div>
                      </div>
                      
                      {workout.observation && (
                        <div className="mt-3 p-2 sm:p-3 bg-muted/20 rounded-lg">
                          <h5 className="font-medium text-xs sm:text-sm mb-1">Observações</h5>
                          <p className="text-xs sm:text-sm text-muted-foreground">{workout.observation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
