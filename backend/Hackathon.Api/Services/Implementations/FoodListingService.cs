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

        public async Task<IEnumerable<FoodListingDto>> GetAllAsync(string? query, string? category, string? location, string? status)
        {
            var entities = await _repository.GetAllAsync(query, category, location, status);
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
                ImageUrl = dto.ImageUrl,
                Status = "Available",
                CreatedAt = DateTime.UtcNow
            };

            var created = await _repository.AddAsync(entity);
            return MapToDto(created);
        }

        public async Task<FoodListingDto?> UpdateAsync(int id, UpdateFoodListingDto dto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            entity.Title = dto.Title;
            entity.Description = dto.Description;
            entity.Category = dto.Category;
            entity.Quantity = dto.Quantity;
            entity.Unit = dto.Unit;
            entity.PickupLocation = dto.PickupLocation;
            entity.ExpiryDate = dto.ExpiryDate;
            if (!string.IsNullOrEmpty(dto.ImageUrl))
            {
                entity.ImageUrl = dto.ImageUrl;
            }
            entity.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(entity);
            return MapToDto(entity);
        }

        public async Task<bool> CancelAsync(int id, string? reason)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return false;

            entity.Status = "Cancelled";
            if (!string.IsNullOrWhiteSpace(reason))
            {
                entity.CancellationReason = reason;
            }
            entity.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(entity);
            return true;
        }

        public async Task<bool> UpdateStatusAsync(int id, string status)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return false;


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
            ImageUrl = entity.ImageUrl,
            CancellationReason = entity.CancellationReason,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }
}
