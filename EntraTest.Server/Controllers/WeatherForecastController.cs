using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using System.Net.Sockets;
using System.Security.Claims;

namespace EntraTest.Server.Controllers
{
    [Authorize]
    [RequiredScope("access_as_user")]
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly AppDbContext _context; // This is your DbContext

        public WeatherForecastController(ILogger<WeatherForecastController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
             
             _logger.LogInformation("Getting weather forecast");
             return await _context.WeatherForecasts.ToListAsync();
        }

        [HttpPost(Name = "PostWeatherForecast")]
        public async Task<IActionResult> CreateWeatherForecast([FromBody] WeatherForecastDto model)
        {
            var weatherForecast = new WeatherForecast
            {
                Summary = model.Summary,
                CreatorId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                
            };

            _context.WeatherForecasts.Add(weatherForecast);
            await _context.SaveChangesAsync();

            return Ok(weatherForecast);
        }
    }
}
