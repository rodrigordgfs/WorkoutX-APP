'use client'

import { SignIn } from '@clerk/nextjs'
import { Dumbbell } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export default function SignInPage() {
  const { theme } = useTheme()
  
  // Determina o tema atual (resolvendo 'system')
  const currentTheme = theme === 'system' 
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Dumbbell className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">WorkoutX</h1>
            <p className="text-muted-foreground mt-2">
              Sua jornada fitness começa aqui
            </p>
          </div>
        </div>

        {/* Componente de Login do Clerk */}
        <div className="flex justify-center">
          <SignIn 
            appearance={{
              baseTheme: currentTheme === 'dark' ? undefined : undefined,
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                card: 'bg-card border border-border shadow-lg',
                headerTitle: 'text-foreground',
                headerSubtitle: 'text-muted-foreground',
                socialButtonsBlockButton: 'border border-border hover:bg-muted',
                socialButtonsBlockButtonText: 'text-foreground',
                formFieldInput: 'bg-background border-border text-foreground',
                formFieldLabel: 'text-foreground',
                footerActionLink: 'text-primary hover:text-primary/80',
                identityPreviewText: 'text-foreground',
                identityPreviewEditButton: 'text-primary hover:text-primary/80',
              }
            }}
            redirectUrl="/dashboard"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  )
}
