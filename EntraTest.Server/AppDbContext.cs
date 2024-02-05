using Microsoft.EntityFrameworkCore;

namespace EntraTest.Server
{
    public class AppDbContext : DbContext
    {
        public DbSet<WeatherForecast> WeatherForecasts { get; set; }

        // Other DbSets...

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WeatherForecast>().HasData(
                new WeatherForecast { Id = 1, CreatorId = "Example 1", Summary = "test2"},
                new WeatherForecast { Id = 2, CreatorId = "Example 2", Summary = "test2" }
            );
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}
