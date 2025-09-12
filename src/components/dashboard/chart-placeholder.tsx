import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp } from 'lucide-react'

interface ChartPlaceholderProps {
  title: string
  type: 'bar' | 'line'
}

export function ChartPlaceholder({ title, type }: ChartPlaceholderProps) {
  const Icon = type === 'bar' ? BarChart3 : TrendingUp

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <Icon className="h-12 w-12 mb-4" />
          <p className="text-sm text-center">
            Dados insuficientes para exibir o gráfico.
            <br />
            Complete alguns treinos para ver suas estatísticas.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}