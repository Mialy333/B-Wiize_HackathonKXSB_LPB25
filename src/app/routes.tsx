import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ChallengesPage from "../features/challenges/pages/ChallengesPage";
import EducationPage from "../features/education/pages/EducationPage";
import RewardsPage from "../features/rewards/pages/RewardsPage";
import NewsPage from "../features/news/pages/NewsPage";
import CommunityPage from "../features/community/pages/CommunityPage";
import SettingsPage from "../features/settings/pages/SettingsPage";

import Layout from '../components/Layout/Layout';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}