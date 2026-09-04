namespace Hackathon.Api.Models.DTOs
{
    public class DashboardStatsDto
    {
        public int TotalListings { get; set; }
        public int MealsSaved { get; set; }
        public int FoodRescued { get; set; }
        public int ActiveReservations { get; set; }
        public int CompletedCollections { get; set; }
        public int Co2ReducedKg { get; set; }
        public double ReliabilityIndex { get; set; }
        public Dictionary<string, int> CategoryBreakdown { get; set; } = new();
    }
}

