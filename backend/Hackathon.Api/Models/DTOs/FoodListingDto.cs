namespace Hackathon.Api.Models.DTOs
{
    public class FoodListingDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string Unit { get; set; } = string.Empty;
        public string PickupLocation { get; set; } = string.Empty;
        public DateTime ExpiryDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string DonorName { get; set; } = string.Empty;
        public string DonorContact { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? CancellationReason { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
