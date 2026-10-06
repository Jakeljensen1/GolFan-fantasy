import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import DashboardPage from "./pages/DashboardPage";
import TournamentPage from "./pages/TournamentPage";
import LineupBuilderPage from "./pages/LineupBuilderPage";
import TournamentLeaderboardPage from "./pages/TournamentLeaderboardPage";
import LineupPage from "./pages/LineupPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthRedirect from "./components/AuthRedirect";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*root redirect*/}
          <Route path="/" element={<AuthRedirect />} />

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
            path="/tournament/:id/leaderboard"
            element={<TournamentLeaderboardPage />}
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
          <Route
            path="/"
            element={
              <AuthRedirect />
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}



