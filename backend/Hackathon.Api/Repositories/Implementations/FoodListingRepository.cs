using Hackathon.Api.Data;
using Hackathon.Api.Models.Entities;
using Hackathon.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Hackathon.Api.Repositories.Implementations
{
    public class FoodListingRepository : IFoodListingRepository
    {
        private readonly AppDbContext _context;

        public FoodListingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FoodListing>> GetAllAsync(string? query = null, string? category = null, string? status = null)
        {
            var dbQuery = _context.FoodListings.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query))
            {
                dbQuery = dbQuery.Where(x => x.Title.Contains(query) || x.Description.Contains(query) || x.DonorName.Contains(query));
            }

            if (!string.IsNullOrWhiteSpace(category))
            {
                dbQuery = dbQuery.Where(x => x.Category == category);
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                dbQuery = dbQuery.Where(x => x.Status == status);
            }

            return await dbQuery.OrderByDescending(x => x.CreatedAt).ToListAsync();
        }

        public async Task<FoodListing?> GetByIdAsync(int id)
        {
            return await _context.FoodListings.Include(x => x.Reservations).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<FoodListing> AddAsync(FoodListing entity)
        {
            await _context.FoodListings.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(FoodListing entity)
        {
            _context.FoodListings.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _context.FoodListings.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
