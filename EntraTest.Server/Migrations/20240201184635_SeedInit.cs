using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EntraTest.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "WeatherForecasts",
                columns: new[] { "Id", "CreatorId", "Date", "Summary", "TemperatureC" },
                values: new object[,]
                {
                    { 1, "Example 1", new DateOnly(1, 1, 1), "test2", 0 },
                    { 2, "Example 2", new DateOnly(1, 1, 1), "test2", 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "WeatherForecasts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "WeatherForecasts",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
