import { useUserProfile } from "@/context/UserContext"
import { useClerk } from "@clerk/clerk-react"
import { X, Dumbbell, Plus, User, Users, LogOut } from "lucide-react"
import { Link } from "react-router-dom"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function Drawer({ isOpen, onClose }: DrawerProps) {
  const { profile } = useUserProfile()
  const { signOut } = useClerk()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Failed to sign out", error)
    }
  }


  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <header className="bg-blue-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-blue-700 rounded-full p-1.5 transition-colors"
          >
            <X size={24} />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="flex items-center gap-4 mt-4">
            <div className="relative h-12 w-12">
              {profile.avatar ? (
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  className="rounded-full w-full h-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-blue-700 border-2 border-white flex items-center justify-center text-lg font-semibold">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="font-semibold">{profile.name}</h2>
              <p className="text-sm text-blue-100">Membro</p>
            </div>
          </div>
        </header>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Dumbbell className="h-5 w-5 text-blue-600" />
                <span>Meus Treinos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/workout/new"
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Plus className="h-5 w-5 text-blue-600" />
                <span>Cadastrar Treino</span>
              </Link>
            </li>

            <div className="h-px bg-gray-200 my-4" />

            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <User className="h-5 w-5 text-blue-600" />
                <span>Meu Perfil</span>
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Users className="h-5 w-5 text-blue-600" />
                <span>Comunidade</span>
              </Link>
            </li>

            <div className="h-px bg-gray-200 my-4" />

            <li>
              <div
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 text-blue-600" />
                <span>Sair</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

