import { useMenu } from "@/context/MenuContext";
import { Dumbbell, Menu } from "lucide-react";

const Header = () => {
    const { toogleMenu } = useMenu();

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={() => toogleMenu()} className="p-1 rounded-full hover:bg-blue-400 transition-all">
                        <Menu size={24} />
                    </button>
                    <Dumbbell size={24} />
                    <h1 className="text-xl font-bold">WorkoutX</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;