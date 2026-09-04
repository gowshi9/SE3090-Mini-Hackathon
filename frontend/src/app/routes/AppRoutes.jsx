import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { FindFoodPage } from '../../features/find-food/pages/FindFoodPage';
import { PostFoodPage } from '../../features/post-food/pages/PostFoodPage';
import { ReservationPage } from '../../features/reservation/pages/ReservationPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { CollectionPage } from '../../features/dashboard/pages/CollectionPage';
import { ImpactPage } from '../../features/dashboard/pages/ImpactPage';
import { AdminPage } from '../../features/admin/pages/AdminPage';

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
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/impact" element={<ImpactPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
