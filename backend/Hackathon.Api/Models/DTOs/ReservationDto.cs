namespace Hackathon.Api.Models.DTOs
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int FoodListingId { get; set; }
        public string RecipientName { get; set; } = string.Empty;
        public string RecipientContact { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime ReservedAt { get; set; }
        public string? Notes { get; set; }
    }
}
