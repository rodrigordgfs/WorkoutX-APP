import { Routes, Route } from "react-router-dom";  // Corrigir aqui
import AuthenticatedLayout from "./layout/Authenticated";
import WorkoutPage from "./pages/Workout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticatedLayout />}>
        <Route path="/" element={<WorkoutPage />} />
        {/* <Route path="cadastro" element={<WorkoutRegister />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
