using Hackathon.Api.Models.DTOs;

namespace Hackathon.Api.Services.Interfaces
{
    public interface IFoodListingService
    {
        Task<IEnumerable<FoodListingDto>> GetAllAsync(string? query, string? category, string? status);
        Task<FoodListingDto?> GetByIdAsync(int id);
        Task<FoodListingDto> CreateAsync(CreateFoodListingDto dto);
        Task<FoodListingDto?> UpdateAsync(int id, UpdateFoodListingDto dto);
        Task<bool> CancelAsync(int id, string? reason);
        Task<bool> UpdateStatusAsync(int id, string status);
    }
}
