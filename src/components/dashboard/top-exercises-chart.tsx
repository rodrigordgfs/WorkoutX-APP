'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Pie, PieChart, Cell } from 'recharts'
import { PieChart as PieIcon } from 'lucide-react'

interface TopExercisesChartProps {
  title?: string
  data: Array<{ name: string; value: number }>
}

const chartConfig = {
  value: {
    label: "Quantidade",
  },
  primary: {
    label: 'Principal',
    theme: { light: 'hsl(var(--color-primary))', dark: 'hsl(var(--color-primary))' },
  },
}

// Usaremos apenas a cor primária para todas as fatias

export function TopExercisesChart({ title = 'Exercícios Mais Realizados', data }: TopExercisesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        {(!data || data.every((d) => (d.value ?? 0) === 0)) ? (
          <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground text-sm gap-2">
            <PieIcon className="h-8 w-8" />
            <span>Nenhum dado disponível para o período</span>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={40}
                paddingAngle={4}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={'#005BFF'} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}


