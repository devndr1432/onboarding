import { Route, Routes } from "react-router-dom";
import React from "react";
import { Home } from "./pages/Home";
import { EmailForm } from "./pages/EmailForm";
import { Dashboard } from "./pages/Dashboard";
import { RecordPractice } from "./pages/RecordPractice";
import { CheckSystemConfig } from "./pages/CheckSystemConfig";
import { QuizComponent } from "./pages/QuizComponent";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { LandingPage } from "./pages/LandingPage";
import { RealQuiz } from "./pages/RealQuiz";
import { Camera } from "./pages/Camera";


export const PageRoutes = () => {

  return (
    <Routes>
      <Route path="/old-home" element={<Home />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<EmailForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recordpractice" element={<RecordPractice/>} />
      <Route path="/system-config" element={<CheckSystemConfig/>} />
      <Route path="/test-practice" element={<QuizComponent/>} />
      <Route path="/live-quiz" element={<RealQuiz/>} />
      <Route path="/landing-page" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/sign-up" element={<SignupPage/>} />
      <Route path="/camera" element={<Camera/>} />
    </Routes>
  );
};


