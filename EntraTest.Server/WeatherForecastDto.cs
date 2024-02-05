﻿namespace EntraTest.Server
{
    public class WeatherForecastDto
    {
        public int Id { get; set; }
        public required string CreatorId { get; set; } // This will store the unique identifier of the user
        
        public DateOnly Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
}
