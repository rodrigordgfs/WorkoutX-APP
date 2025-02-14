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

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const { fetchWorkouts, isWorkoutsLoaded } = useWorkout();
  const { user } = useClerk();

  useEffect(() => {
    const checkAndFetchWorkouts = async () => {
      if (isSignedIn) {
        const loaded = await isWorkoutsLoaded();
        if (!loaded) {
          fetchWorkouts(user?.id);
        }
      }
    };

    checkAndFetchWorkouts();
  }, [isSignedIn, fetchWorkouts, isWorkoutsLoaded, user]);

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
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
