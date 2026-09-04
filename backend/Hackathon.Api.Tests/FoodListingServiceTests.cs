using Hackathon.Api.Data;
using Hackathon.Api.Models.DTOs;
using Hackathon.Api.Repositories.Implementations;
using Hackathon.Api.Services.Implementations;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Hackathon.Api.Tests
{
    public class FoodListingServiceTests
    {
        private AppDbContext CreateInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        [Fact]
        public async Task CreateAsync_ValidDto_CreatesAndReturnsListing()
        {
            using var context = CreateInMemoryDbContext();
            var repo = new FoodListingRepository(context);
            var service = new FoodListingService(repo);

            var dto = new CreateFoodListingDto
            {
                Title = "Fresh Bread Packets",
                Description = "Freshly baked bread",
                Category = "Bakery",
                Quantity = 20,
                Unit = "portions",
                PickupLocation = "Jaffna Town",
                ExpiryDate = DateTime.UtcNow.AddHours(5),
                DonorName = "Kavindi Perera",
                DonorContact = "kavindi.p@univ.ac.lk",
                ImageUrl = "https://example.com/bread.jpg"
            };

            var result = await service.CreateAsync(dto);

            Assert.NotNull(result);
            Assert.True(result.Id > 0);
            Assert.Equal("Fresh Bread Packets", result.Title);
            Assert.Equal("Available", result.Status);
            Assert.Equal(20, result.Quantity);
            Assert.Equal("Jaffna Town", result.PickupLocation);
        }

        [Fact]
        public async Task UpdateAsync_ExistingId_UpdatesFields()
        {
            using var context = CreateInMemoryDbContext();
            var repo = new FoodListingRepository(context);
            var service = new FoodListingService(repo);

            var createDto = new CreateFoodListingDto
            {
                Title = "Original Title",
                Description = "Original Description",
                Category = "Bakery",
                Quantity = 10,
                PickupLocation = "Colombo 03",
                ExpiryDate = DateTime.UtcNow.AddHours(2)
            };

            var created = await service.CreateAsync(createDto);

            var updateDto = new UpdateFoodListingDto
            {
                Title = "Updated Title",
                Description = "Updated Description",
                Category = "Cooked Meals",
                Quantity = 25,
                Unit = "portions",
                PickupLocation = "Colombo 07",
                ExpiryDate = DateTime.UtcNow.AddHours(4),
                ImageUrl = "https://example.com/updated.jpg"
            };

            var updated = await service.UpdateAsync(created.Id, updateDto);

            Assert.NotNull(updated);
            Assert.Equal("Updated Title", updated.Title);
            Assert.Equal("Updated Description", updated.Description);
            Assert.Equal(25, updated.Quantity);
            Assert.Equal("Colombo 07", updated.PickupLocation);
            Assert.NotNull(updated.UpdatedAt);
        }

        [Fact]
        public async Task CancelAsync_ExistingId_SetsStatusToCancelledAndSavesReason()
        {
            using var context = CreateInMemoryDbContext();
            var repo = new FoodListingRepository(context);
            var service = new FoodListingService(repo);

            var created = await service.CreateAsync(new CreateFoodListingDto
            {
                Title = "Item To Cancel",
                Description = "Desc",
                Category = "Bakery",
                Quantity = 15,
                PickupLocation = "Jaffna Town",
                ExpiryDate = DateTime.UtcNow.AddHours(3)
            });

            var cancelResult = await service.CancelAsync(created.Id, "Surplus batch consumed internally");

            Assert.True(cancelResult);

            var item = await service.GetByIdAsync(created.Id);
            Assert.NotNull(item);
            Assert.Equal("Cancelled", item.Status);
            Assert.Equal("Surplus batch consumed internally", item.CancellationReason);
            Assert.NotNull(item.UpdatedAt);
        }

        [Fact]
        public async Task GetAllAsync_WithFilters_ReturnsMatchingListings()
        {
            using var context = CreateInMemoryDbContext();
            var repo = new FoodListingRepository(context);
            var service = new FoodListingService(repo);

            await service.CreateAsync(new CreateFoodListingDto
            {
                Title = "Fresh Bread Packets",
                Description = "Bakery bread",
                Category = "Bakery",
                Quantity = 20,
                PickupLocation = "Jaffna Town",
                ExpiryDate = DateTime.UtcNow.AddHours(5)
            });

            await service.CreateAsync(new CreateFoodListingDto
            {
                Title = "Vegetable Rice Packs",
                Description = "Cooked meal",
                Category = "Cooked Meals",
                Quantity = 15,
                PickupLocation = "Colombo 03",
                ExpiryDate = DateTime.UtcNow.AddHours(4)
            });

            var bakeryResults = await service.GetAllAsync(null, "Bakery", null);
            Assert.Single(bakeryResults);
            Assert.Equal("Fresh Bread Packets", bakeryResults.First().Title);

            var searchResults = await service.GetAllAsync("Rice", null, null);
            Assert.Single(searchResults);
            Assert.Equal("Vegetable Rice Packs", searchResults.First().Title);
        }
    }
}
