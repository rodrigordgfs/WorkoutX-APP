'use client'

import { useState, useEffect } from 'react'
import { LayoutDashboard, Calendar, Clock, Target, TrendingUp } from 'lucide-react'
import { MetricsTile } from '@/components/dashboard/metrics-tile'
import { ActivityItem } from '@/components/dashboard/activity-item'
import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      // Simular carregamento assíncrono
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  const recentActivities = [
    {
      title: 'Treino Peito e Tríceps',
      exercises: 8,
      duration: 45,
      status: 'COMPLETED' as const,
      date: 'Hoje, 14:30'
    },
    {
      title: 'Treino Pernas',
      exercises: 6,
      duration: 60,
      status: 'COMPLETED' as const,
      date: 'Ontem, 09:15'
    },
    {
      title: 'Treino Costas e Bíceps',
      exercises: 7,
      duration: 50,
      status: 'IN_PROGRESS' as const,
      date: 'Sexta, 18:00'
    },
    {
      title: 'Treino Ombros',
      exercises: 5,
      duration: 35,
      status: 'NOT_STARTED' as const,
      date: 'Quinta, 16:00'
    }
  ]

  if (isLoading) {
    return (
      <div className="h-full w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
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

  return (
    <div className="h-full w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
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
          value={12}
          subtitle="0% vs mês anterior"
          trend="neutral"
        />
        <MetricsTile
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          title="Sequência Atual"
          value="3 Dias"
          subtitle="Consecutivos"
          trend="up"
        />
        <MetricsTile
          icon={<Clock className="h-5 w-5 text-primary" />}
          title="Duração Média"
          value="48 min"
          subtitle="Por treino"
          trend="up"
        />
        <MetricsTile
          icon={<Target className="h-5 w-5 text-primary" />}
          title="Taxa de Conclusão"
          value="85%"
          subtitle="Este mês"
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartPlaceholder
          title="Volume Semanal de Treino"
          type="bar"
        />
        <ChartPlaceholder
          title="Exercícios Mais Realizados"
          type="line"
        />
      </div>

      {/* Recent Activities */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Atividades Recentes</h2>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <ActivityItem
              key={activity.title}
              title={activity.title}
              exercises={activity.exercises}
              duration={activity.duration}
              status={activity.status}
              date={activity.date}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
