using Hackathon.Api.Models.DTOs;

namespace Hackathon.Api.Validators
{
    public static class CreateReservationValidator
    {
        public static (bool IsValid, string? ErrorMessage) Validate(CreateReservationDto dto)
        {
            if (dto.FoodListingId <= 0) return (false, "Valid FoodListingId is required.");
            if (string.IsNullOrWhiteSpace(dto.RecipientName)) return (false, "Recipient name is required.");
            if (string.IsNullOrWhiteSpace(dto.RecipientContact)) return (false, "Recipient contact details are required.");

            return (true, null);
        }
    }
}
