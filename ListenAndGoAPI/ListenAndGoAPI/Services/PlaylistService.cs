using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListenAndGoAPI.Data;
using ListenAndGoAPI.Models;
using ListenAndGoAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ListenAndGoAPI.Services
{
    public class PlaylistService : EntityService<Playlist>, IPlaylistService
    {
        public PlaylistService(AppDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Playlist>> GetAllAsync()
        {
            var playlists =
                from playlist in Context.Playlists
                orderby playlist.DateCreated descending
                select playlist;

            return await playlists.ToListAsync();
        }
    }
}