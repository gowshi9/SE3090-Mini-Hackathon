namespace Hackathon.Api.Models.DTOs
{
    public class UpdateFoodListingDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string Unit { get; set; } = "servings";
        public string PickupLocation { get; set; } = string.Empty;
        public DateTime ExpiryDate { get; set; }
        public string? ImageUrl { get; set; }
    }
}
