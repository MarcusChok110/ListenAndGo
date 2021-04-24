using ListenAndGoAPI.Models;
using ListenAndGoAPI.Models.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ListenAndGoAPI.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, int>
    {
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<Song> Songs { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Playlist>()
                .Property(playlist => playlist.DateCreated)
                .HasDefaultValueSql("now()");
        }
    }
}