'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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
        <ChartContainer config={chartConfig} className="h-full">
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="exercises" fill="#005BFF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


