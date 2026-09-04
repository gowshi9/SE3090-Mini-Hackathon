using Hackathon.Api.Models.DTOs;

namespace Hackathon.Api.Services.Interfaces
{
    public interface IReservationService
    {
        Task<IEnumerable<ReservationDto>> GetAllAsync();
        Task<ReservationDto?> GetByIdAsync(int id);
        Task<ReservationDto> CreateAsync(CreateReservationDto dto);
    }
}
