import { Routes, BrowserRouter, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LogInPage from "@/pages/LogInPage.tsx";
import ProtectedRoute from "./protectedRoute";
import FeedPage from "@/pages/FeedPage";
import { useAuth } from "@/contexts/AuthContext";
import PawLoader from "@/components/custom/PawLoader";
import SignUpIndex from "@/pages/SignUpIndex";
import ShelterSignUpPage from "@/pages/ShelterSignUpPage";
import AdopterSignUpPage from "@/pages/AdopterSignUpPage";
import UserPage from "@/pages/UserPage";
import MyProfilePage from "@/pages/MyProfilePage";
import ReportPage from "@/pages/ReportPage";
import NotificationPage from "@/pages/NotificationsPage";
import ChatPage from "@/pages/ChatPage";
import SettingsPage from "@/pages/SettingsPage";
import DenouncePage from "@/pages/DenouncePage";

export function RoutesIndex() {
  const { loading } = useAuth();
  if (loading) return <PawLoader />;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/home"
          element={<LandingPage />}
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/contact"
          element={<ContactPage />}
        />
        <Route
          path="/login"
          element={<LogInPage />}
        />
        <Route
          path="/signup"
          element={<SignUpIndex />}
        />
        <Route
          path="/shelter"
          element={<ShelterSignUpPage />}
        />
        <Route
          path="/adopter"
          element={<AdopterSignUpPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/feed"
            element={<FeedPage />}
          />
          <Route
            path="/chat"
            element={<ChatPage />}
          />
          <Route
            path="/user/:uid"
            element={<UserPage />}
          />
          <Route
            path="/me"
            element={<MyProfilePage />}
          />
          <Route
            path="/notifications"
            element={<NotificationPage />}
          />
          <Route
            path="/report"
            element={<ReportPage />}
          />
          <Route
            path="/denounce/:id"
            element={<DenouncePage />}
          />
          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
