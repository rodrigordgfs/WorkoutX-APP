import { Dumbbell } from 'lucide-react';
import { SignedOut, SignInButton } from '@clerk/clerk-react';

export function LoginPage() {
    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-md w-full px-6">
                    <div className="text-center">
                        <Dumbbell className="h-12 w-12 text-blue-600 mx-auto" />
                        <h2 className="mt-6 text-3xl font-extrabold text-zinc-900">
                            Bem-vindo de volta
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600">
                            Entre para acessar seus treinos
                        </p>
                    </div>

                    <SignedOut>
                        <SignInButton forceRedirectUrl='/'>
                            <button
                                className="w-full flex justify-center py-3 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                            >
                                Clique aqui para entrar
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>

            <div className="hidden lg:block flex-1 relative">
                <div className="absolute inset-0 bg-blue-600/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Gym"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Transforme-se</h2>
                        <p className="text-xl">Comece sua jornada fitness hoje</p>
                    </div>
                </div>
            </div>
        </div>
    );
}