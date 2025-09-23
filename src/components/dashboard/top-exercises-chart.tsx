'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Pie, PieChart, Cell } from 'recharts'

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
      </CardContent>
    </Card>
  )
}


