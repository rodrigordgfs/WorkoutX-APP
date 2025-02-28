import { useMenu } from "@/context/MenuContext";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ArrowLeft, Dumbbell, Menu, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { toogleMenu } = useMenu();
  const { theme, toggleTheme } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = () => {
    return window.history.length > 1 && location.pathname !== "/";
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toogleMenu()}
            className="p-1 rounded-full hover:bg-blue-400 transition-all"
          >
            <Menu size={24} />
          </button>
          {canGoBack() && (
            <button
              onClick={() => navigate(-1)}
              className="p-1 rounded-full hover:bg-blue-400 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <Dumbbell size={24} />
          <h1 className="text-xl font-bold">WorkoutX</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-blue-500" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
