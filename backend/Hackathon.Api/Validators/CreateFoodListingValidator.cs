using Hackathon.Api.Models.DTOs;

namespace Hackathon.Api.Validators
{
    public static class CreateFoodListingValidator
    {
        public static (bool IsValid, string? ErrorMessage) Validate(CreateFoodListingDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title)) return (false, "Title is required.");
            if (string.IsNullOrWhiteSpace(dto.Description)) return (false, "Description is required.");
            if (string.IsNullOrWhiteSpace(dto.PickupLocation)) return (false, "Pickup location is required.");
            if (dto.Quantity <= 0) return (false, "Quantity must be greater than zero.");
            if (dto.ExpiryDate <= DateTime.UtcNow) return (false, "Expiry date must be in the future.");

            return (true, null);
        }
    }
}
