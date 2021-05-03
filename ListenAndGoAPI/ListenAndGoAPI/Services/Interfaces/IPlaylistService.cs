using System.Threading.Tasks;
using ListenAndGoAPI.Models;
using ListenAndGoAPI.Resources.GraphQL.Inputs;

namespace ListenAndGoAPI.Services.Interfaces
{
    public interface IPlaylistService : IEntityService<Playlist>
    {
        Task<bool> AddSongAsync(int playlistId, AddSongInput songInput);
        Task<bool> RemoveSongAsync(int playlistId, int songId);
    }
}