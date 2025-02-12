import { Drawer } from "@/components/Drawer";
import Header from "@/components/Header";
import { useMenu } from "@/context/MenuContext";
import { Outlet } from "react-router-dom";
function AuthenticatedLayout() {
    const { toogleMenu, isMenuOpen } = useMenu();

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <Drawer isOpen={isMenuOpen} onClose={() => toogleMenu()} />

            <main className="container mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthenticatedLayout
