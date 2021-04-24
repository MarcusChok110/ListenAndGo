using Microsoft.EntityFrameworkCore.Migrations;

namespace ListenAndGoAPI.Migrations
{
    public partial class UpdateIdFieldNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistSong_Playlists_PlaylistsPlaylistId",
                table: "PlaylistSong");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistSong_Songs_SongsSongId",
                table: "PlaylistSong");

            migrationBuilder.RenameColumn(
                name: "SongId",
                table: "Songs",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "SongsSongId",
                table: "PlaylistSong",
                newName: "SongsId");

            migrationBuilder.RenameColumn(
                name: "PlaylistsPlaylistId",
                table: "PlaylistSong",
                newName: "PlaylistsId");

            migrationBuilder.RenameIndex(
                name: "IX_PlaylistSong_SongsSongId",
                table: "PlaylistSong",
                newName: "IX_PlaylistSong_SongsId");

            migrationBuilder.RenameColumn(
                name: "PlaylistId",
                table: "Playlists",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistSong_Playlists_PlaylistsId",
                table: "PlaylistSong",
                column: "PlaylistsId",
                principalTable: "Playlists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistSong_Songs_SongsId",
                table: "PlaylistSong",
                column: "SongsId",
                principalTable: "Songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistSong_Playlists_PlaylistsId",
                table: "PlaylistSong");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistSong_Songs_SongsId",
                table: "PlaylistSong");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Songs",
                newName: "SongId");

            migrationBuilder.RenameColumn(
                name: "SongsId",
                table: "PlaylistSong",
                newName: "SongsSongId");

            migrationBuilder.RenameColumn(
                name: "PlaylistsId",
                table: "PlaylistSong",
                newName: "PlaylistsPlaylistId");

            migrationBuilder.RenameIndex(
                name: "IX_PlaylistSong_SongsId",
                table: "PlaylistSong",
                newName: "IX_PlaylistSong_SongsSongId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Playlists",
                newName: "PlaylistId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistSong_Playlists_PlaylistsPlaylistId",
                table: "PlaylistSong",
                column: "PlaylistsPlaylistId",
                principalTable: "Playlists",
                principalColumn: "PlaylistId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistSong_Songs_SongsSongId",
                table: "PlaylistSong",
                column: "SongsSongId",
                principalTable: "Songs",
                principalColumn: "SongId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
