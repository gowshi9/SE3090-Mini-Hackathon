namespace Hackathon.Api.Models.Entities
{
    /// <summary>
    /// Entity representing a food share listing.
    /// </summary>
    public class FoodListing
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string Unit { get; set; } = "servings";
        public string PickupLocation { get; set; } = string.Empty;
        public DateTime ExpiryDate { get; set; }
        public string Status { get; set; } = "Available"; // Available, Reserved, Completed, Expired
        public string DonorName { get; set; } = string.Empty;
        public string DonorContact { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? CancellationReason { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation property
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
