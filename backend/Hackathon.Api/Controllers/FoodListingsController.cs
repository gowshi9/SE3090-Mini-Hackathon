using Hackathon.Api.Models.DTOs;
using Hackathon.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hackathon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodListingsController : ControllerBase
    {
        private readonly IFoodListingService _foodListingService;

        public FoodListingsController(IFoodListingService foodListingService)
        {
            _foodListingService = foodListingService;
        }

        /// <summary>
        /// Gets all food listings with optional query, category, and status filtering. (Member 2)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodListingDto>>> GetAll(
            [FromQuery] string? query,
            [FromQuery] string? category,
            [FromQuery] string? status)
        {
            var results = await _foodListingService.GetAllAsync(query, category, status);
            return Ok(results);
        }

        /// <summary>
        /// Gets single food listing details by ID. (Member 2)
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodListingDto>> GetById(int id)
        {
            var item = await _foodListingService.GetByIdAsync(id);
            if (item == null) return NotFound(new { message = $"Food listing {id} not found" });
            return Ok(item);
        }

        /// <summary>
        /// Creates a new surplus food listing. (Member 1)
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<FoodListingDto>> Create([FromBody] CreateFoodListingDto dto)
        {
            var created = await _foodListingService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        /// <summary>
        /// Updates status of a food listing. (Member 4)
        /// </summary>
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var success = await _foodListingService.UpdateStatusAsync(id, request.Status);
            if (!success) return NotFound();
            return NoContent();
        }
    }

    public class UpdateStatusRequest
    {
        public string Status { get; set; } = string.Empty;
    }
}
