# System Architecture

## Overview
FoodShare-LK is built using a modern decoupled architecture:
- **Frontend**: React (Vite) organized into feature modules (`post-food`, `find-food`, `reservation`, `dashboard`).
- **Backend**: ASP.NET Core Web API using layered architecture (Controllers -> Services -> Repositories -> Entity Framework Core).

## Team Module Responsibilities
- **Member 1**: `post-food` feature (frontend) & `FoodListingsController` creation logic (backend).
- **Member 2**: `find-food` feature (frontend) & `FoodListingsController` query/filter logic (backend).
- **Member 3**: `reservation` feature (frontend) & `ReservationsController` + `ReservationService` (backend).
- **Member 4**: `dashboard` feature (frontend) & `DashboardController` + status tracking (backend).
