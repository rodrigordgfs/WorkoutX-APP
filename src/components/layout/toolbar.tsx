import { Dumbbell, Bell, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useRouter } from 'next/navigation'

interface ToolbarProps {
  showBackButton?: boolean
  backUrl?: string
}

export function Toolbar({ showBackButton = false, backUrl = '/workouts' }: ToolbarProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push(backUrl)
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        {/* Mobile Layout */}
        <div className="flex w-full items-center justify-between md:hidden">
          {/* Esquerda - Botão do Menu */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => {
                // Aqui você pode adicionar a lógica para abrir o menu mobile
                console.log('Abrir menu mobile')
              }}
            >
              <div className="h-5 w-5">
                <div className="h-0.5 w-5 bg-current mb-1"></div>
                <div className="h-0.5 w-5 bg-current mb-1"></div>
                <div className="h-0.5 w-5 bg-current"></div>
              </div>
              <span className="sr-only">Menu</span>
            </Button>
          </div>
          
          {/* Centro - Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">WorkoutX</span>
          </div>
          
          {/* Direita - Botões */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificações</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden w-full items-center justify-between md:flex">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <Dumbbell className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">WorkoutX</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notificações</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}