import authService from "@/services/auth";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from 'react-toastify';


export interface UserProfile {
    id?: string;
    name: string;
    email: string;
    avatar: string;
    height?: number;
    weight?: number;
    goal?: string;
    experience?: string;
    publicProfile?: boolean;
}

interface UserContextType {
    profile: UserProfile;
    updateProfile: (profile: UserProfile) => void;
    fetchProfile: (userId: string | undefined, name: string | null | undefined, avatar: string | null | undefined, email: string | undefined) => void;
    userProfileLoaded: boolean;
    savingProfile: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [profile, setProfile] = useState<UserProfile>({
        id: '',
        name: '',
        email: '',
        avatar: '',
        height: 0,
        weight: 0,
        goal: '',
        experience: '',
        publicProfile: true,
    });
    const [userProfileLoaded, setUserProfileLoaded] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);

    const fetchProfile = async (userId: string | undefined, name: string | null | undefined, avatar: string | null | undefined, email: string | undefined) => {
        authService.post({ userId, name, avatar, email })
            .then(({ data }) => {
                setProfile(data);
                setUserProfileLoaded(true);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
                setUserProfileLoaded(false);
            });
    }

    const updateProfile = (profile: UserProfile) => {
        console.log('Updating profile:', profile);

        setSavingProfile(true);
        authService.patch(`/${profile.id}`, profile)
            .then(({ data }) => {
                setProfile(data);
                toast.success('Perfil atualizado com sucesso');
            })
            .catch((error) => {
                console.error('Error updating user profile:', error);
                toast.error('Erro ao atualizar o perfil');
            })
            .finally(() => {
                setSavingProfile(false);
            });
    }

    return (
        <UserContext.Provider value={{ profile, updateProfile, fetchProfile, userProfileLoaded, savingProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserProfile = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserProfile must be used within a UserProvider');
    }
    return context;
}
