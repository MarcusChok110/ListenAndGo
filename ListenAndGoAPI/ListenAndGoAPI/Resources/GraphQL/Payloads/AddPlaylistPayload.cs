using ListenAndGoAPI.Models;

namespace ListenAndGoAPI.Resources.GraphQL.Payloads
{
    public class AddPlaylistPayload
    {
        public Playlist Playlist { get; }

        public AddPlaylistPayload(Playlist playlist)
        {
            Playlist = playlist;
        }
    }
}