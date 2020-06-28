using Microsoft.EntityFrameworkCore.Migrations;

namespace TesteCSharp.Migrations
{
    public partial class ModifiedTelefone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fornecedor",
                table: "Telefones");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Fornecedor",
                table: "Telefones",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
