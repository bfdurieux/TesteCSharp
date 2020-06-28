using Microsoft.EntityFrameworkCore.Migrations;

namespace TesteCSharp.Migrations
{
    public partial class ModifiedFornecedor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fornecedores_Empresas_EmpresaID",
                table: "Fornecedores");

            migrationBuilder.AlterColumn<int>(
                name: "EmpresaID",
                table: "Fornecedores",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Fornecedores_Empresas_EmpresaID",
                table: "Fornecedores",
                column: "EmpresaID",
                principalTable: "Empresas",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fornecedores_Empresas_EmpresaID",
                table: "Fornecedores");

            migrationBuilder.AlterColumn<int>(
                name: "EmpresaID",
                table: "Fornecedores",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Fornecedores_Empresas_EmpresaID",
                table: "Fornecedores",
                column: "EmpresaID",
                principalTable: "Empresas",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
