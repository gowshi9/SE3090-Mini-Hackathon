# SE3090 Mini Hackathon - FoodShare-LK

FoodShare-LK is a community food sharing platform designed to reduce food waste and support local communities in Sri Lanka.

## Repository Structure

```
SE3090-Mini-Hackathon/
├── frontend/             # React + Vite application (Feature-based structure)
├── backend/
│   └── Hackathon.Api/    # ASP.NET Core 8 Web API (Layered architecture)
├── docs/                 # Documentation (Architecture & Database schema)
└── SE3090-Mini-Hackathon.sln
```

## Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js (v18+) & npm

### Backend Setup
```bash
cd backend/Hackathon.Api
dotnet restore
dotnet run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```