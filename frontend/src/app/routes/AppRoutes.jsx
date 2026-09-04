import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { FindFoodPage } from '../../features/find-food/pages/FindFoodPage';
import { PostFoodPage } from '../../features/post-food/pages/PostFoodPage';
import { ReservationPage } from '../../features/reservation/pages/ReservationPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { RegisterPage } from '../../features/auth/pages/RegisterPage';

/**
 * Main Application Routing Configuration.
 * @returns {JSX.Element}
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FindFoodPage />} />
      <Route path="/post-food" element={<PostFoodPage />} />
      <Route path="/reserve/:id" element={<ReservationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
