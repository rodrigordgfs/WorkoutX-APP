import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticatedLayout from "./layout/Authenticated";
import WorkoutPage from "./pages/Workout";
import { LoginPage } from "./pages/Login";
import { useAuth } from "@clerk/clerk-react";
import WorkoutRegisterPage from "./pages/WorkoutRegister";
import LoadingPage from "./pages/Loading";

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <LoadingPage />;

  return (
    <Routes>
      {isSignedIn ? (
        <Route path="/" element={<AuthenticatedLayout />}>
          <Route index element={<WorkoutPage />} />
          <Route path="/workout-register" element={<WorkoutRegisterPage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
