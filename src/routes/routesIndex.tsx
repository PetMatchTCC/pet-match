import { Routes, BrowserRouter, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import SignUpPage from "@/pages/SignUpPage.tsx";
import LogInPage from "@/pages/LogInPage.tsx";

export function RoutesIndex() {
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
          element={<SignUpPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
