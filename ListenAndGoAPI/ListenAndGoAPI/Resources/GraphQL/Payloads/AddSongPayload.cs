using ListenAndGoAPI.Models;

namespace ListenAndGoAPI.Resources.GraphQL.Payloads
{
    public class AddSongPayload
    {
        public Song Song { get; }

        public AddSongPayload(Song song)
        {
            Song = song;
        }
    }
}