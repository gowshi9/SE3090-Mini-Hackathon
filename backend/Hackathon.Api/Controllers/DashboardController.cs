using Hackathon.Api.Models.DTOs;
using Hackathon.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hackathon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly IFoodListingService _foodListingService;

        public DashboardController(IDashboardService dashboardService, IFoodListingService foodListingService)
        {
            _dashboardService = dashboardService;
            _foodListingService = foodListingService;
        }

        /// <summary>
        /// Gets impact metrics & overview stats for donor dashboard. (Member 4)
        /// </summary>
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var stats = await _dashboardService.GetStatsAsync();
            var listings = await _foodListingService.GetAllAsync(null, null, null, null);

            return Ok(new
            {
                stats,
                listings
            });
        }
    }
}
