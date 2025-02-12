import { Dumbbell } from "lucide-react";

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex items-center gap-2">
                <Dumbbell size={24} />
                <h1 className="text-xl font-bold">WorkoutX</h1>
            </div>
        </header>
    );
};

export default Header;