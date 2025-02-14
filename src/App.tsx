import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticatedLayout from "./layout/Authenticated";
import WorkoutDetailsPage from "./pages/WorkoutDetails";
import { LoginPage } from "./pages/Login";
import { useAuth, useClerk } from "@clerk/clerk-react";
import WorkoutRegisterPage from "./pages/WorkoutRegister";
import LoadingPage from "./pages/Loading";
import { useEffect } from "react";
import { useWorkout } from "./context/WorkoutContext";
import { WorkoutsListPage } from "./pages/WorkoutList";
import { ProfilePage } from "./pages/Profile";
import { useUserProfile } from "./context/UserContext";

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const { fetchProfile, userProfileLoaded } = useUserProfile();
  const { fetchWorkouts, workoutsLoaded } = useWorkout();
  const { user } = useClerk();

  useEffect(() => {
    if (isSignedIn && !userProfileLoaded) {
      fetchProfile(user?.id, user?.fullName, user?.imageUrl, user?.emailAddresses[0]?.emailAddress);
    }

    if (isSignedIn && !workoutsLoaded) {
      fetchWorkouts(user?.id);
    }

  }, [isSignedIn, fetchWorkouts, workoutsLoaded, user, fetchProfile, userProfileLoaded]);

  if (!isLoaded) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      {isSignedIn ? (
        <Route path="/" element={<AuthenticatedLayout />}>
          <Route index element={<WorkoutsListPage />} />
          <Route path="/workout/:id" element={<WorkoutDetailsPage />} />
          <Route path="/workout/new" element={<WorkoutRegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
