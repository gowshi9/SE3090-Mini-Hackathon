namespace Hackathon.Api.Models.Entities
{
    /// <summary>
    /// Entity representing a reservation for a food listing.
    /// </summary>
    public class Reservation
    {
        public int Id { get; set; }
        public int FoodListingId { get; set; }
        public string RecipientName { get; set; } = string.Empty;
        public string RecipientContact { get; set; } = string.Empty;
        public string Status { get; set; } = "Confirmed"; // Pending, Confirmed, Cancelled, Fulfilled
        public DateTime ReservedAt { get; set; } = DateTime.UtcNow;
        public string? Notes { get; set; }

        // Navigation property
        public FoodListing? FoodListing { get; set; }
    }
}
