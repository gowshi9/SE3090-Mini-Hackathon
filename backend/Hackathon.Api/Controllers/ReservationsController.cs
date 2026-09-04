using Hackathon.Api.Models.DTOs;
using Hackathon.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hackathon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        /// <summary>
        /// Gets all active food reservations. (Member 3)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetAll()
        {
            var results = await _reservationService.GetAllAsync();
            return Ok(results);
        }

        /// <summary>
        /// Gets details for a specific reservation. (Member 3)
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationDto>> GetById(int id)
        {
            var item = await _reservationService.GetByIdAsync(id);
            if (item == null) return NotFound(new { message = $"Reservation {id} not found" });
            return Ok(item);
        }

        /// <summary>
        /// Creates a new food listing reservation. (Member 3)
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ReservationDto>> Create([FromBody] CreateReservationDto dto)
        {
            var created = await _reservationService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
    }
}
