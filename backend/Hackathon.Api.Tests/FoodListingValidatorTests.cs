using Hackathon.Api.Models.DTOs;
using Hackathon.Api.Validators;
using Xunit;

namespace Hackathon.Api.Tests
{
    public class FoodListingValidatorTests
    {
        [Fact]
        public void Validate_ValidDto_ReturnsTrue()
        {
            var dto = new CreateFoodListingDto
            {
                Title = "Fresh Bread Packets",
                Description = "Freshly baked artisanal bread",
                Category = "Bakery",
                Quantity = 20,
                PickupLocation = "Jaffna Town",
                ExpiryDate = DateTime.UtcNow.AddHours(5),
                DonorName = "Kavindi Perera"
            };

            var (isValid, errorMessage) = CreateFoodListingValidator.Validate(dto);

            Assert.True(isValid);
            Assert.Null(errorMessage);
        }

        [Theory]
        [InlineData("")]
        [InlineData("   ")]
        [InlineData(null)]
        public void Validate_MissingTitle_ReturnsFalse(string? title)
        {
            var dto = new CreateFoodListingDto
            {
                Title = title!,
                Description = "Valid Description",
                Quantity = 5,
                PickupLocation = "Colombo 03",
                ExpiryDate = DateTime.UtcNow.AddHours(2)
            };

            var (isValid, errorMessage) = CreateFoodListingValidator.Validate(dto);

            Assert.False(isValid);
            Assert.Equal("Title is required.", errorMessage);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-5)]
        public void Validate_InvalidQuantity_ReturnsFalse(int quantity)
        {
            var dto = new CreateFoodListingDto
            {
                Title = "Fresh Bread",
                Description = "Valid Description",
                Quantity = quantity,
                PickupLocation = "Kandy Central",
                ExpiryDate = DateTime.UtcNow.AddHours(3)
            };

            var (isValid, errorMessage) = CreateFoodListingValidator.Validate(dto);

            Assert.False(isValid);
            Assert.Equal("Quantity must be greater than zero.", errorMessage);
        }

        [Fact]
        public void Validate_MissingLocation_ReturnsFalse()
        {
            var dto = new CreateFoodListingDto
            {
                Title = "Fresh Bread",
                Description = "Valid Description",
                Quantity = 10,
                PickupLocation = "",
                ExpiryDate = DateTime.UtcNow.AddHours(3)
            };

            var (isValid, errorMessage) = CreateFoodListingValidator.Validate(dto);

            Assert.False(isValid);
            Assert.Equal("Pickup location is required.", errorMessage);
        }

        [Fact]
        public void Validate_PastExpiryDate_ReturnsFalse()
        {
            var dto = new CreateFoodListingDto
            {
                Title = "Fresh Bread",
                Description = "Valid Description",
                Quantity = 10,
                PickupLocation = "Galle Fort",
                ExpiryDate = DateTime.UtcNow.AddHours(-1)
            };

            var (isValid, errorMessage) = CreateFoodListingValidator.Validate(dto);

            Assert.False(isValid);
            Assert.Equal("Expiry date must be in the future.", errorMessage);
        }
    }
}
