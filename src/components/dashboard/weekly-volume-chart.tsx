'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { BarChart3 } from 'lucide-react'

interface WeeklyVolumeChartProps {
  title?: string
  data: Array<{ day: string; exercises: number }>
}

const chartConfig = {
  exercises: {
    label: "Exercícios",
    theme: {
      light: "#005BFF",
      dark: "#005BFF",
    },
  },
}

export function WeeklyVolumeChart({ title = 'Volume Semanal de Treino', data }: WeeklyVolumeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        {(!data || data.every((d) => (d.exercises ?? 0) === 0)) ? (
          <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground text-sm gap-2">
            <BarChart3 className="h-8 w-8" />
            <span>Nenhum dado disponível para o período</span>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full">
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="exercises" fill="#005BFF" radius={[6, 6, 0, 0]} />
          </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}


