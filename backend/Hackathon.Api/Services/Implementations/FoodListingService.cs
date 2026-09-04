using Hackathon.Api.Models.DTOs;
using Hackathon.Api.Models.Entities;
using Hackathon.Api.Repositories.Interfaces;
using Hackathon.Api.Services.Interfaces;

namespace Hackathon.Api.Services.Implementations
{
    public class FoodListingService : IFoodListingService
    {
        private readonly IFoodListingRepository _repository;

        public FoodListingService(IFoodListingRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<FoodListingDto>> GetAllAsync(string? query, string? category, string? status)
        {
            var entities = await _repository.GetAllAsync(query, category, status);
            return entities.Select(MapToDto);
        }

        public async Task<FoodListingDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity == null ? null : MapToDto(entity);
        }

        public async Task<FoodListingDto> CreateAsync(CreateFoodListingDto dto)
        {
            var entity = new FoodListing
            {
                Title = dto.Title,
                Description = dto.Description,
                Category = dto.Category,
                Quantity = dto.Quantity,
                Unit = dto.Unit,
                PickupLocation = dto.PickupLocation,
                ExpiryDate = dto.ExpiryDate,
                DonorName = dto.DonorName,
                DonorContact = dto.DonorContact,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            };

            var created = await _repository.AddAsync(entity);
            return MapToDto(created);
        }

        public async Task<bool> UpdateStatusAsync(int id, string status)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return false;

            string normalizedTarget = status.Trim();
            string currentStatus = entity.Status.Trim();

            // Validate status transitions for M4 Collection rule: AVAILABLE -> RESERVED -> COLLECTED
            if (normalizedTarget.Equals("Collected", StringComparison.OrdinalIgnoreCase) || 
                normalizedTarget.Equals("Completed", StringComparison.OrdinalIgnoreCase))
            {
                if (currentStatus.Equals("Available", StringComparison.OrdinalIgnoreCase))
                {
                    throw new InvalidOperationException("An available listing must be reserved before it can be collected.");
                }
                if (currentStatus.Equals("Collected", StringComparison.OrdinalIgnoreCase) || 
                    currentStatus.Equals("Completed", StringComparison.OrdinalIgnoreCase))
                {
                    throw new InvalidOperationException("This food listing has already been collected.");
                }
            }

            entity.Status = normalizedTarget;
            await _repository.UpdateAsync(entity);
            return true;
        }

        private static FoodListingDto MapToDto(FoodListing entity) => new()
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            Category = entity.Category,
            Quantity = entity.Quantity,
            Unit = entity.Unit,
            PickupLocation = entity.PickupLocation,
            ExpiryDate = entity.ExpiryDate,
            Status = entity.Status,
            DonorName = entity.DonorName,
            DonorContact = entity.DonorContact,
            CreatedAt = entity.CreatedAt
        };
    }
}
