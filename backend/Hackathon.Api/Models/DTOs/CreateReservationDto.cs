namespace Hackathon.Api.Models.DTOs
{
    public class CreateReservationDto
    {
        public int FoodListingId { get; set; }
        public string RecipientName { get; set; } = string.Empty;
        public string RecipientContact { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }
}
