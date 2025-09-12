import React from 'react'
import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WorkoutCard } from '@/components/workouts/workout-card'

export default function WorkoutsPage() {
  const workouts = [
    {
      title: 'Treino Peito e Tríceps',
      exerciseCount: 8,
      exercises: [
        {
          name: 'Supino Reto',
          sets: 4,
          reps: '8-12',
          weight: '80kg',
          rest: '2min'
        },
        {
          name: 'Supino Inclinado',
          sets: 3,
          reps: '10-12',
          weight: '70kg',
          rest: '90s'
        },
        {
          name: 'Crucifixo',
          sets: 3,
          reps: '12-15',
          weight: '25kg',
          rest: '60s'
        },
        {
          name: 'Paralelas',
          sets: 3,
          reps: '8-12',
          weight: 'Corporal',
          rest: '90s'
        },
        {
          name: 'Tríceps Testa',
          sets: 3,
          reps: '10-12',
          weight: '30kg',
          rest: '60s'
        },
        {
          name: 'Tríceps Corda',
          sets: 3,
          reps: '12-15',
          weight: '40kg',
          rest: '45s'
        },
        {
          name: 'Tríceps Francês',
          sets: 3,
          reps: '10-12',
          weight: '25kg',
          rest: '60s'
        },
        {
          name: 'Flexão Diamante',
          sets: 2,
          reps: '10-15',
          weight: 'Corporal',
          rest: '45s'
        }
      ]
    },
    {
      title: 'Treino Costas e Bíceps',
      exerciseCount: 7,
      exercises: [
        {
          name: 'Puxada Frontal',
          sets: 4,
          reps: '8-12',
          weight: '70kg',
          rest: '2min'
        },
        {
          name: 'Remada Curvada',
          sets: 4,
          reps: '8-10',
          weight: '60kg',
          rest: '2min'
        },
        {
          name: 'Remada Unilateral',
          sets: 3,
          reps: '10-12',
          weight: '30kg',
          rest: '90s'
        },
        {
          name: 'Pullover',
          sets: 3,
          reps: '12-15',
          weight: '20kg',
          rest: '60s'
        },
        {
          name: 'Rosca Direta',
          sets: 4,
          reps: '10-12',
          weight: '15kg',
          rest: '60s'
        },
        {
          name: 'Rosca Martelo',
          sets: 3,
          reps: '12-15',
          weight: '12kg',
          rest: '45s'
        },
        {
          name: 'Rosca Concentrada',
          sets: 3,
          reps: '10-12',
          weight: '10kg',
          rest: '45s'
        }
      ]
    },
    {
      title: 'Treino Pernas',
      exerciseCount: 6,
      exercises: [
        {
          name: 'Agachamento',
          sets: 4,
          reps: '8-12',
          weight: '100kg',
          rest: '3min'
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '12-15',
          weight: '200kg',
          rest: '2min'
        },
        {
          name: 'Extensora',
          sets: 3,
          reps: '12-15',
          weight: '60kg',
          rest: '60s'
        },
        {
          name: 'Flexora',
          sets: 3,
          reps: '12-15',
          weight: '50kg',
          rest: '60s'
        },
        {
          name: 'Panturrilha em Pé',
          sets: 4,
          reps: '15-20',
          weight: '80kg',
          rest: '45s'
        },
        {
          name: 'Panturrilha Sentado',
          sets: 3,
          reps: '15-20',
          weight: '40kg',
          rest: '45s'
        }
      ]
    },
    {
      title: 'Treino Ombros e Abdômen',
      exerciseCount: 8,
      exercises: [
        {
          name: 'Desenvolvimento',
          sets: 4,
          reps: '8-12',
          weight: '50kg',
          rest: '2min'
        },
        {
          name: 'Elevação Lateral',
          sets: 4,
          reps: '12-15',
          weight: '8kg',
          rest: '60s'
        },
        {
          name: 'Elevação Frontal',
          sets: 3,
          reps: '12-15',
          weight: '8kg',
          rest: '60s'
        },
        {
          name: 'Crucifixo Inverso',
          sets: 3,
          reps: '12-15',
          weight: '6kg',
          rest: '60s'
        },
        {
          name: 'Encolhimento',
          sets: 3,
          reps: '12-15',
          weight: '20kg',
          rest: '60s'
        },
        {
          name: 'Abdominal Supra',
          sets: 3,
          reps: '15-20',
          weight: 'Corporal',
          rest: '45s'
        },
        {
          name: 'Prancha',
          sets: 3,
          reps: '30-60s',
          weight: 'Corporal',
          rest: '60s'
        },
        {
          name: 'Oblíquo',
          sets: 3,
          reps: '15-20',
          weight: 'Corporal',
          rest: '45s'
        }
      ]
    }
  ]

  return (
    <div className="h-full w-full p-10 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Treino
        </Button>
      </div>

      {/* Workout Cards */}
      <div className="space-y-4">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.title}
            title={workout.title}
            exerciseCount={workout.exerciseCount}
            exercises={workout.exercises}
          />
        ))}
      </div>
    </div>
  )
}
