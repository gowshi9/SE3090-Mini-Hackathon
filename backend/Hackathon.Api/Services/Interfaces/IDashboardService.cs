using Hackathon.Api.Models.DTOs;

namespace Hackathon.Api.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardStatsDto> GetStatsAsync();
    }
}
