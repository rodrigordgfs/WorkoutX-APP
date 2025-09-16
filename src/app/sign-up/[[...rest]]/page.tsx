'use client'

import { SignUp } from '@clerk/nextjs'
import { Dumbbell } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export default function SignUpPage() {
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
              Crie sua conta e comece sua jornada fitness
            </p>
          </div>
        </div>

        {/* Componente de Cadastro do Clerk */}
        <div className="flex justify-center">
          <SignUp 
            appearance={{
              baseTheme: currentTheme === 'dark' ? undefined : undefined,
              variables: {
                colorPrimary: 'hsl(var(--primary))',
                colorBackground: 'hsl(var(--background))',
                colorText: 'hsl(var(--foreground))',
                colorTextSecondary: 'hsl(var(--muted-foreground))',
                colorInputBackground: 'hsl(var(--background))',
                colorInputText: 'hsl(var(--foreground))',
                colorNeutral: 'hsl(var(--muted))',
                borderRadius: '0.5rem',
                fontFamily: 'inherit',
              },
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                card: 'shadow-xl border-0 bg-background',
                headerTitle: 'text-2xl font-semibold text-foreground',
                headerSubtitle: 'text-muted-foreground',
                socialButtonsBlockButton: 'border border-input hover:bg-accent hover:text-accent-foreground bg-background',
                socialButtonsBlockButtonText: 'font-medium text-foreground',
                formFieldInput: 'border-input focus:border-primary focus:ring-primary/20 bg-background text-foreground',
                identityPreviewText: 'text-muted-foreground',
                formFieldLabel: 'text-sm font-medium text-foreground',
                dividerLine: 'bg-border',
                dividerText: 'text-muted-foreground text-xs',
                formHeaderTitle: 'text-2xl font-semibold text-foreground',
                formHeaderSubtitle: 'text-muted-foreground',
                formFieldInputShowPasswordButton: 'text-muted-foreground hover:text-foreground',
                formFieldSuccessText: 'text-green-600 dark:text-green-400',
                formFieldErrorText: 'text-red-600 dark:text-red-400',
                identityPreviewEditButton: 'text-primary hover:text-primary/80',
                footerActionText: 'text-muted-foreground',
                footerActionLink: 'text-primary hover:text-primary/80',
                formResendCodeLink: 'text-primary hover:text-primary/80',
                otpCodeFieldInput: 'bg-background text-foreground border-input focus:border-primary',
                formFieldHintText: 'text-muted-foreground',
                formFieldWarningText: 'text-yellow-600 dark:text-yellow-400',
                formFieldError: 'text-red-600 dark:text-red-400',
                alertText: 'text-foreground',
                formFieldSuccess: 'text-green-600 dark:text-green-400',
              }
            }}
            redirectUrl="/dashboard"
            signInUrl="/login"
          />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Desenvolvido com ❤️ para a comunidade fitness
          </p>
        </div>
      </div>
    </div>
  )
}
