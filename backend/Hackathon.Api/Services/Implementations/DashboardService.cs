using Hackathon.Api.Models.DTOs;
using Hackathon.Api.Repositories.Interfaces;
using Hackathon.Api.Services.Interfaces;

namespace Hackathon.Api.Services.Implementations
{
    public class DashboardService : IDashboardService
    {
        private readonly IFoodListingRepository _foodRepository;
        private readonly IReservationRepository _reservationRepository;

        public DashboardService(IFoodListingRepository foodRepository, IReservationRepository reservationRepository)
        {
            _foodRepository = foodRepository;
            _reservationRepository = reservationRepository;
        }

        public async Task<DashboardStatsDto> GetStatsAsync()
        {
            var listings = (await _foodRepository.GetAllAsync()).ToList();
            var reservations = (await _reservationRepository.GetAllAsync()).ToList();

            int totalListings = listings.Count;
            int mealsSaved = listings.Where(l => l.Status == "Completed" || l.Status == "Reserved").Sum(l => l.Quantity);
            int activeReservations = reservations.Count(r => r.Status == "Confirmed");
            int co2ReducedKg = (int)(mealsSaved * 0.5);

            return new DashboardStatsDto
            {
                TotalListings = totalListings,
                MealsSaved = mealsSaved,
                ActiveReservations = activeReservations,
                Co2ReducedKg = co2ReducedKg
            };
        }
    }
}
