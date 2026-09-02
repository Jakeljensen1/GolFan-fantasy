import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import DashboardPage from "./pages/DashboardPage";
import TournamentPage from "./pages/TournamentPage";
import LineupBuilderPage from "./pages/LineupBuilderPage";
import LineupPage from "./pages/LineupPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tournament/:id"
            element={
              <ProtectedRoute>
                <TournamentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tournament/:id/build"
            element={
              <ProtectedRoute>
                <LineupBuilderPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lineup/:id"
            element={
              <ProtectedRoute>
                <LineupPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}



