using Hackathon.Api.Models.Entities;

namespace Hackathon.Api.Repositories.Interfaces
{
    public interface IReservationRepository
    {
        Task<IEnumerable<Reservation>> GetAllAsync();
        Task<Reservation?> GetByIdAsync(int id);
        Task<Reservation> AddAsync(Reservation entity);
        Task UpdateAsync(Reservation entity);
    }
}
