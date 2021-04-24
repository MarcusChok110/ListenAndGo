using System.Linq;
using HotChocolate;
using HotChocolate.Data;
using ListenAndGoAPI.Models;

namespace ListenAndGoAPI.Data
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Song> GetSongs([Service] AppDbContext context) => context.Songs;
        
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Playlist> GetPlaylists([Service] AppDbContext context) => context.Playlists;
    }
}