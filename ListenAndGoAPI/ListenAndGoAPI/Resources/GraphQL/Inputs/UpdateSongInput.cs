using System;
using System.Collections.Generic;
using ListenAndGoAPI.Models;

namespace ListenAndGoAPI.Resources.GraphQL.Inputs
{
    public record UpdateSongInput(
        int Id,
        DateTime ReleaseDate,
        string Name,
        string Artist,
        Song.SongType Type,
        string Path,
        ICollection<Playlist> Playlists,
        int UserId
    );
}