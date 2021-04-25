using System;
using System.Collections.Generic;
using ListenAndGoAPI.Models;

namespace ListenAndGoAPI.Resources.GraphQL.Inputs
{
    public record UpdatePlaylistInput(
        int Id,
        string Name,
        string Description,
        DateTime DateCreated,
        bool IsPublic,
        int UserId,
        ICollection<Song> Songs
    );
}