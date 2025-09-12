import React from 'react'
import { LayoutDashboard, Calendar, Clock, Target, TrendingUp } from 'lucide-react'
import { MetricsTile } from '@/components/dashboard/metrics-tile'
import { ActivityItem } from '@/components/dashboard/activity-item'
import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

export default function DashboardPage() {
  const recentActivities = [
    {
      title: 'Treino Peito e Tríceps',
      exercises: 8,
      duration: 45,
      status: 'completed' as const,
      date: 'Hoje, 14:30'
    },
    {
      title: 'Treino Pernas',
      exercises: 6,
      duration: 60,
      status: 'completed' as const,
      date: 'Ontem, 09:15'
    },
    {
      title: 'Treino Costas e Bíceps',
      exercises: 7,
      duration: 50,
      status: 'in-progress' as const,
      date: 'Sexta, 18:00'
    },
    {
      title: 'Treino Ombros',
      exercises: 5,
      duration: 35,
      status: 'pending' as const,
      date: 'Quinta, 16:00'
    }
  ]

  return (
    <div className="h-full w-full p-10 space-y-8">
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
