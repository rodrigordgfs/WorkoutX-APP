import { Drawer } from "@/components/Shared/Drawer";
import Header from "@/components/Shared/Header";
import { useMenu } from "@/context/MenuContext";
import { Outlet } from "react-router-dom";

function AuthenticatedLayout() {
    const { toogleMenu, isMenuOpen } = useMenu();

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
            <Header />

            <Drawer isOpen={isMenuOpen} onClose={() => toogleMenu()} />

            <main className="container mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}

export default AuthenticatedLayout;
