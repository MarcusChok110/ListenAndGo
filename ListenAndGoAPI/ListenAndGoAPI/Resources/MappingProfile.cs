using AutoMapper;
using ListenAndGoAPI.Models;
using ListenAndGoAPI.Models.Auth;
using ListenAndGoAPI.Resources.DTOs;
using ListenAndGoAPI.Resources.GraphQL.Inputs;

namespace ListenAndGoAPI.Resources
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Auth
            CreateMap<UserAuthDTO, User>();
            
            // Songs
            CreateMap<AddSongInput, Song>();
            CreateMap<UpdateSongInput, Song>();
            
            // Playlists
            CreateMap<AddPlaylistInput, Playlist>();
            CreateMap<UpdatePlaylistInput, Playlist>();
        }
    }
}