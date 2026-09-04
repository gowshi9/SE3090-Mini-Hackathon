import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { FindFoodPage } from '../../features/find-food/pages/FindFoodPage';
import { PostFoodPage } from '../../features/post-food/pages/PostFoodPage';
import { ReservationPage } from '../../features/reservation/pages/ReservationPage';
import { MyReservationsPage } from '../../features/reservation/pages/MyReservationsPage';
import { ReservationConfirmedPage } from '../../features/reservation/pages/ReservationConfirmedPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { CollectionPage } from '../../features/dashboard/pages/CollectionPage';
import { ImpactPage } from '../../features/dashboard/pages/ImpactPage';

/**
 * Main Application Routing Configuration.
 * @returns {JSX.Element}
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FindFoodPage />} />
      <Route path="/post-food" element={<PostFoodPage />} />
      <Route path="/reserve" element={<ReservationPage />} />
      <Route path="/reserve/:id" element={<ReservationPage />} />
      <Route path="/my-reservations" element={<MyReservationsPage />} />
      <Route path="/reservation-confirmed" element={<ReservationConfirmedPage />} />
      <Route path="/reservation/:id/confirmed" element={<ReservationConfirmedPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/impact" element={<ImpactPage />} />
    </Routes>
  );
}


