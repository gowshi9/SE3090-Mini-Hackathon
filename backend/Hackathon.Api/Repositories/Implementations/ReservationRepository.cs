using Hackathon.Api.Data;
using Hackathon.Api.Models.Entities;
using Hackathon.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Hackathon.Api.Repositories.Implementations
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _context;

        public ReservationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetAllAsync()
        {
            return await _context.Reservations
                .Include(r => r.FoodListing)
                .OrderByDescending(r => r.ReservedAt)
                .ToListAsync();
        }

        public async Task<Reservation?> GetByIdAsync(int id)
        {
            return await _context.Reservations
                .Include(r => r.FoodListing)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Reservation> AddAsync(Reservation entity)
        {
            await _context.Reservations.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(Reservation entity)
        {
            _context.Reservations.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
