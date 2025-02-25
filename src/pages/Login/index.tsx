import { Dumbbell, ArrowRight, Brain, Users, Trophy } from "lucide-react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

export function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-md w-full px-6 py-12">
          <div className="text-center">
            <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4 animate-pulse">
              <Dumbbell className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-4xl font-extrabold text-zinc-900 tracking-tight">
              Bem-vindo de volta
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Continue sua jornada fitness
            </p>
          </div>

          <div className="mt-12">
            <div className="space-y-4">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-xl shadow-blue-100/20">
                <div className="flex items-center gap-4 text-zinc-700">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Trophy className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Acompanhe seu progresso</h3>
                    <p className="text-sm text-zinc-500">
                      Monitore sua evolução e alcance seus objetivos
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-xl shadow-blue-100/20">
                <div className="flex items-center gap-4 text-zinc-700">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Comunidade ativa</h3>
                    <p className="text-sm text-zinc-500">
                      Conecte-se com outros atletas e compartilhe experiências
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-xl shadow-blue-100/20">
                <div className="flex items-center gap-4 text-zinc-700">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">IA personalizada</h3>
                    <p className="text-sm text-zinc-500">
                      Treinos gerados por IA adaptados ao seu perfil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <SignedOut>
              <SignInButton forceRedirectUrl="/">
                <button className="group w-full flex items-center justify-center gap-2 py-4 px-6 mt-8 border-2 border-blue-600 rounded-xl text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-blue-600/25">
                  Entrar agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80 mix-blend-multiply z-10" />
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Gym"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white max-w-lg px-8">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Transforme seus objetivos em conquistas
            </h2>
            <p className="text-xl opacity-90">
              Junte-se a uma comunidade de pessoas comprometidas com um estilo
              de vida mais saudável e ativo
            </p>
            <div className="mt-12 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold">10k+</div>
                <div className="text-sm opacity-80">Usuários ativos</div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-bold">50k+</div>
                <div className="text-sm opacity-80">Treinos realizados</div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-bold">95%</div>
                <div className="text-sm opacity-80">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
