import { createContext, FC, ReactNode, useContext, useState } from "react";

interface MenuContextType {
    isMenuOpen: boolean;
    toogleMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider: FC<MenuProviderProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toogleMenu = () => {
        setIsMenuOpen((isOpen) => !isOpen);
    };

    return (
        <MenuContext.Provider value={{ isMenuOpen, toogleMenu }}>
            {children}
        </MenuContext.Provider>
    );
}

export const useMenu = (): MenuContextType => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
}