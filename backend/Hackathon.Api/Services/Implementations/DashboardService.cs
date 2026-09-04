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
            var collectedListings = listings.Where(l => 
                l.Status.Equals("Collected", StringComparison.OrdinalIgnoreCase) || 
                l.Status.Equals("Completed", StringComparison.OrdinalIgnoreCase)).ToList();

            int foodRescued = collectedListings.Sum(l => l.Quantity);
            int reservedQuantity = listings.Where(l => l.Status.Equals("Reserved", StringComparison.OrdinalIgnoreCase)).Sum(l => l.Quantity);
            int mealsSaved = foodRescued + reservedQuantity;

            int activeReservations = listings.Count(l => l.Status.Equals("Reserved", StringComparison.OrdinalIgnoreCase)) 
                + reservations.Count(r => r.Status == "Confirmed");
            
            int completedCollections = collectedListings.Count;
            int co2ReducedKg = (int)(foodRescued > 0 ? foodRescued * 1.25 : mealsSaved * 0.5);

            double reliabilityIndex = (completedCollections + activeReservations) > 0 
                ? Math.Round(((double)completedCollections / (completedCollections + activeReservations)) * 100, 1)
                : 100.0;

            var categoryBreakdown = listings
                .Where(l => l.Status.Equals("Collected", StringComparison.OrdinalIgnoreCase) || l.Status.Equals("Completed", StringComparison.OrdinalIgnoreCase) || l.Status.Equals("Reserved", StringComparison.OrdinalIgnoreCase))
                .GroupBy(l => string.IsNullOrWhiteSpace(l.Category) ? "Cooked Meals" : l.Category)
                .ToDictionary(g => g.Key, g => g.Sum(l => l.Quantity));

            return new DashboardStatsDto
            {
                TotalListings = totalListings,
                MealsSaved = mealsSaved,
                FoodRescued = foodRescued,
                ActiveReservations = activeReservations,
                CompletedCollections = completedCollections,
                Co2ReducedKg = co2ReducedKg,
                ReliabilityIndex = reliabilityIndex,
                CategoryBreakdown = categoryBreakdown
            };
        }
    }
}
