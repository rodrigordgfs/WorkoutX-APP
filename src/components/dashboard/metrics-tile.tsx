import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricsTileProps {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export function MetricsTile({
  icon,
  title,
  value,
  subtitle,
  trend = 'neutral',
  trendValue
}: MetricsTileProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-success" />
      case 'down':
        return <TrendingDown className="h-3 w-3 text-destructive" />
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success'
      case 'down':
        return 'text-destructive'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <Card className="hover:shadow-md bg-card transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrendIcon()}
                <span className={cn("text-xs", getTrendColor())}>
                  {trendValue || subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}