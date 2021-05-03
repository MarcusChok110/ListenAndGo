using Microsoft.EntityFrameworkCore.Migrations;

namespace ListenAndGoAPI.Migrations
{
    public partial class AddImgUrlToSong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "Songs",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "Songs");
        }
    }
}
