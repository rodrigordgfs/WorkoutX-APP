'use client'

//
import { LayoutDashboard, Calendar, Clock, Target, TrendingUp } from 'lucide-react'
import { MetricsTile } from '@/components/dashboard/metrics-tile'
import { ActivityItem } from '@/components/dashboard/activity-item'
//
import { WeeklyVolumeChart } from '@/components/dashboard/weekly-volume-chart'
import { TopExercisesChart } from '@/components/dashboard/top-exercises-chart'
import { useDashboard } from '@/hooks/use-dashboard'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Componentes de Skeleton para Dashboard
const SkeletonMetricsTile = () => (
  <div className="bg-card rounded-lg border border-input p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-24"></div>
        <div className="h-8 bg-muted rounded animate-pulse w-16"></div>
        <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
      </div>
      <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
    </div>
  </div>
)

const SkeletonChart = () => (
  <div className="bg-card rounded-lg border border-input p-6">
    <div className="space-y-4">
      <div className="h-6 bg-muted rounded animate-pulse w-48"></div>
      <div className="h-64 bg-muted rounded animate-pulse"></div>
    </div>
  </div>
)

const SkeletonActivityItem = () => (
  <div className="bg-card rounded-lg border border-input p-4">
    <div className="flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-muted rounded animate-pulse w-3/4"></div>
        <div className="flex gap-4">
          <div className="h-4 bg-muted rounded animate-pulse w-16"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-12"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-muted rounded animate-pulse w-20"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-24"></div>
      </div>
    </div>
  </div>
)

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard()

  const formatActivityDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    
    // Menos de 1 hora
    if (diffInMinutes < 60) {
      if (diffInMinutes < 1) {
        return 'Agora mesmo'
      }
      return `há ${diffInMinutes} min`
    }
    
    // Menos de 24 horas
    if (diffInHours < 24) {
      if (diffInHours === 1) {
        return 'há 1 hora'
      }
      return `há ${diffInHours} horas`
    }
    
    // Menos de 7 dias
    if (diffInDays < 7) {
      if (diffInDays === 1) {
        return `Ontem, ${format(date, 'HH:mm', { locale: ptBR })}`
      }
      return format(date, "EEEE, HH:mm", { locale: ptBR }).charAt(0).toUpperCase() + format(date, "EEEE, HH:mm", { locale: ptBR }).slice(1)
    }
    
    // Mais de 7 dias - mostrar data completa
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (remainingMinutes === 0) {
      return `${hours}h`
    }
    
    return `${hours}h ${remainingMinutes}min`
  }

  if (isLoading) {
    return (
      <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Page Header Skeleton */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-muted rounded-lg animate-pulse">
            <div className="h-6 w-6 bg-muted rounded"></div>
          </div>
          <div className="h-9 bg-muted rounded animate-pulse w-32"></div>
        </div>

        {/* Metrics Tiles Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {['skeleton-metric-1', 'skeleton-metric-2', 'skeleton-metric-3', 'skeleton-metric-4'].map((id) => (
            <SkeletonMetricsTile key={id} />
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonChart />
          <SkeletonChart />
        </div>

        {/* Recent Activities Skeleton */}
        <div className="space-y-4">
          <div className="h-7 bg-muted rounded animate-pulse w-48"></div>
          <div className="space-y-3">
            {['skeleton-activity-1', 'skeleton-activity-2', 'skeleton-activity-3', 'skeleton-activity-4'].map((id) => (
              <SkeletonActivityItem key={id} />
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
            <LayoutDashboard className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="text-sm text-muted-foreground">Erro ao carregar dashboard</div>
      </div>
    )
  }

  // Preparar dados para os gráficos usando os campos do endpoint
  const weeklyVolumeObj = data?.weeklyVolume
  const weeklyVolume = weeklyVolumeObj
    ? [
        { day: 'Dom', exercises: weeklyVolumeObj.sunday ?? 0 },
        { day: 'Seg', exercises: weeklyVolumeObj.monday ?? 0 },
        { day: 'Ter', exercises: weeklyVolumeObj.tuesday ?? 0 },
        { day: 'Qua', exercises: weeklyVolumeObj.wednesday ?? 0 },
        { day: 'Qui', exercises: weeklyVolumeObj.thursday ?? 0 },
        { day: 'Sex', exercises: weeklyVolumeObj.friday ?? 0 },
        { day: 'Sáb', exercises: weeklyVolumeObj.saturday ?? 0 },
      ]
    : []

  const topExercisesData = (data?.topExercises ?? []).map((item) => ({
    name: item.name,
    value: item.count,
  }))

  return (
    <div className="h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <LayoutDashboard className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Metrics Tiles */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricsTile
          icon={<Calendar className="h-5 w-5 text-primary" />}
          title="Treinos do Mês"
          value={data?.month?.count ?? 0}
          subtitle={`${data?.month?.variation ?? 0}% vs mês anterior`
          }
          trend={(data?.month?.variation ?? 0) > 0 ? 'up' : (data?.month?.variation ?? 0) < 0 ? 'down' : 'neutral'}
        />
        <MetricsTile
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          title="Sequência Atual"
          value={`${data?.streak ?? 0} Dias`}
          subtitle="Consecutivos"
          trend="up"
        />
        <MetricsTile
          icon={<Clock className="h-5 w-5 text-primary" />}
          title="Duração Média"
          value={formatDuration(data?.averageDurationMinutes ?? 0)}
          subtitle="Por treino"
          trend="up"
        />
        <MetricsTile
          icon={<Target className="h-5 w-5 text-primary" />}
          title="Taxa de Conclusão"
          value={`${data?.completionRate ?? 0}%`}
          subtitle="Este mês"
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <WeeklyVolumeChart title="Volume Semanal de Treino" data={weeklyVolume} />
        <TopExercisesChart title="Exercícios Mais Realizados" data={topExercisesData} />
      </div>

      {/* Recent Activities */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Atividades Recentes</h2>
        <div className="space-y-3">
          {data?.activities?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma atividade recente encontrada
            </div>
          ) : (
            data?.activities?.map((activity) => (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                exercises={activity.exercises}
                duration={activity.durationMinutes}
                status={activity.status}
                date={formatActivityDate(activity.startedAt)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
