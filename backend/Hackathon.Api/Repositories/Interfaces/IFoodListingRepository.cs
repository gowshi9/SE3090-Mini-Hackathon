using Hackathon.Api.Models.Entities;

namespace Hackathon.Api.Repositories.Interfaces
{
    public interface IFoodListingRepository
    {
        Task<IEnumerable<FoodListing>> GetAllAsync(string? query = null, string? category = null, string? status = null);
        Task<FoodListing?> GetByIdAsync(int id);
        Task<FoodListing> AddAsync(FoodListing entity);
        Task UpdateAsync(FoodListing entity);
        Task DeleteAsync(int id);
    }
}
