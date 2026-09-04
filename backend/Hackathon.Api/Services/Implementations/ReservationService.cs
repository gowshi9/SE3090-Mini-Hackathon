using Hackathon.Api.Models.DTOs;
using Hackathon.Api.Models.Entities;
using Hackathon.Api.Repositories.Interfaces;
using Hackathon.Api.Services.Interfaces;

namespace Hackathon.Api.Services.Implementations
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IFoodListingRepository _foodListingRepository;

        public ReservationService(IReservationRepository reservationRepository, IFoodListingRepository foodListingRepository)
        {
            _reservationRepository = reservationRepository;
            _foodListingRepository = foodListingRepository;
        }

        public async Task<IEnumerable<ReservationDto>> GetAllAsync()
        {
            var entities = await _reservationRepository.GetAllAsync();
            return entities.Select(MapToDto);
        }

        public async Task<ReservationDto?> GetByIdAsync(int id)
        {
            var entity = await _reservationRepository.GetByIdAsync(id);
            return entity == null ? null : MapToDto(entity);
        }

        public async Task<ReservationDto> CreateAsync(CreateReservationDto dto)
        {
            var foodItem = await _foodListingRepository.GetByIdAsync(dto.FoodListingId);
            if (foodItem == null)
            {
                throw new KeyNotFoundException($"Food listing with ID {dto.FoodListingId} not found.");
            }

            var entity = new Reservation
            {
                FoodListingId = dto.FoodListingId,
                RecipientName = dto.RecipientName,
                RecipientContact = dto.RecipientContact,
                Notes = dto.Notes,
                Status = "Confirmed",
                ReservedAt = DateTime.UtcNow
            };

            foodItem.Status = "Reserved";
            await _foodListingRepository.UpdateAsync(foodItem);

            var created = await _reservationRepository.AddAsync(entity);
            return MapToDto(created);
        }

        private static ReservationDto MapToDto(Reservation entity) => new()
        {
            Id = entity.Id,
            FoodListingId = entity.FoodListingId,
            RecipientName = entity.RecipientName,
            RecipientContact = entity.RecipientContact,
            Status = entity.Status,
            ReservedAt = entity.ReservedAt,
            Notes = entity.Notes
        };
    }
}
