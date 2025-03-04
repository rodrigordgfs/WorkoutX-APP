import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticatedLayout from "./layout/Authenticated";
import WorkoutDetailsPage from "./pages/WorkoutDetails";
import { LoginPage } from "./pages/Login";
import { useAuth } from "@clerk/clerk-react";
import LoadingPage from "./pages/Loading";
import { useEffect } from "react";
import { useWorkout } from "./context/WorkoutContext";
import { WorkoutsListPage } from "./pages/WorkoutList";
import { ProfilePage } from "./pages/Profile";
import { useUserProfile } from "./context/UserContext";
import { CommunityPage } from "./pages/Community";
import { WorkoutHistoryPage } from "./pages/WorkoutHistory";
import { DashboardPage } from "./pages/Dashboard";
import { MuscleGroupsPage } from "./pages/MuscleGroups";
import { ExercisesPage } from "./pages/Exercises";
import { WorkoutRegisterPage } from "./pages/WorkoutRegister";
import { MuscleGroupRegisterPage } from "./pages/MuscleGroupRegister";
import { ExerciseRegisterPage } from "./pages/ExercisesRegister";

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const { fetchProfile, userProfileLoaded, isAdmin } = useUserProfile();
  const { fetchWorkouts, workoutsLoaded } = useWorkout();

  useEffect(() => {
    if (isSignedIn && !userProfileLoaded) {
      fetchProfile();
    }
  }, [fetchProfile, isSignedIn, userProfileLoaded]);

  useEffect(() => {
    if (isSignedIn && !workoutsLoaded) {
      fetchWorkouts();
    }
  }, [isSignedIn, fetchWorkouts, workoutsLoaded]);

  if (!isLoaded || (!userProfileLoaded && isSignedIn)) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      {isSignedIn ? (
        <Route path="/" element={<AuthenticatedLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/workout" element={<WorkoutsListPage />} />
          <Route path="/workout/:id" element={<WorkoutDetailsPage />} />
          <Route path="/workout/new" element={<WorkoutRegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/workout/history" element={<WorkoutHistoryPage />} />
          <Route path="/muscle-group" element={<MuscleGroupsPage />} />
          <Route path="/muscle-group/:id" element={<ExercisesPage />} />
          {isAdmin && (
            <Route
              path="/muscle-group/register"
              element={<MuscleGroupRegisterPage />}
            />
          )}
          {isAdmin && (
            <Route
              path="/muscle-group/register/:id"
              element={<MuscleGroupRegisterPage />}
            />
          )}
          {isAdmin && (
            <Route
              path="/exercises/register/"
              element={<ExerciseRegisterPage />}
            />
          )}
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
