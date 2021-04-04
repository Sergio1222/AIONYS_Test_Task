using Microsoft.EntityFrameworkCore.Migrations;

namespace AIONYS_TestTask.Migrations
{
    public partial class SQliteMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Description" },
                values: new object[] { 1, "Today I`m running!" });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Description" },
                values: new object[] { 2, "Today I`m reading" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");
        }
    }
}
