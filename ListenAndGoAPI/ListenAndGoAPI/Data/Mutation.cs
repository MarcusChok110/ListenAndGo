using System.Threading.Tasks;
using AutoMapper;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using ListenAndGoAPI.Models;
using ListenAndGoAPI.Resources.GraphQL.Inputs;
using ListenAndGoAPI.Resources.GraphQL.Payloads;
using ListenAndGoAPI.Services.Interfaces;

namespace ListenAndGoAPI.Data
{
    [Authorize]
    public class Mutation
    {
        private readonly IMapper _mapper;

        public Mutation(IMapper mapper)
        {
            _mapper = mapper;
        }

        // Song Mutations

        public async Task<AddSongPayload> AddSongAsync
        (
            AddSongInput input, [Service] ISongService songService
        )
        {
            var song = _mapper.Map<AddSongInput, Song>(input);
            await songService.CreateAsync(song);

            return new AddSongPayload(song);
        }

        public async Task<UpdateSongPayload> UpdateSongAsync
        (
            UpdateSongInput input, [Service] ISongService songService
        )
        {
            var song = _mapper.Map<UpdateSongInput, Song>(input);
            var success = await songService.UpdateAsync(song);

            return new UpdateSongPayload(success);
        }

        public async Task<DeleteSongPayload> DeleteSongAsync
        (
            DeleteSongInput input, [Service] ISongService songService
        )
        {
            var success = await songService.DeleteAsync(input.Id);

            return new DeleteSongPayload(success);
        }

        // Playlist Mutations

        public async Task<AddPlaylistPayload> AddPlaylistAsync
        (
            AddPlaylistInput input, [Service] IPlaylistService playlistService
        )
        {
            var playlist = _mapper.Map<AddPlaylistInput, Playlist>(input);
            await playlistService.CreateAsync(playlist);

            return new AddPlaylistPayload(playlist);
        }

        public async Task<UpdatePlaylistPayload> UpdatePlaylistAsync
        (
            UpdatePlaylistInput input, [Service] IPlaylistService playlistService
        )
        {
            var playlist = _mapper.Map<UpdatePlaylistInput, Playlist>(input);
            var success = await playlistService.UpdateAsync(playlist);

            return new UpdatePlaylistPayload(success);
        }

        public async Task<DeletePlaylistPayload> DeletePlaylistAsync
        (
            DeletePlaylistInput input, [Service] IPlaylistService playlistService
        )
        {
            var success = await playlistService.DeleteAsync(input.Id);

            return new DeletePlaylistPayload(success);
        }
    }
}