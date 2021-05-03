using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ListenAndGoAPI.Data;
using ListenAndGoAPI.Models;
using ListenAndGoAPI.Resources.GraphQL.Inputs;
using ListenAndGoAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ListenAndGoAPI.Services
{
    public class PlaylistService : EntityService<Playlist>, IPlaylistService
    {
        private readonly IMapper _mapper;

        public PlaylistService(AppDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public override async Task<Playlist> GetByIdAsync(int id)
        {
            return (await Context.Playlists
                .Include(p => p.Songs)
                .Where(p => p.Id == id).ToListAsync())[0];
        }
        
        public override async Task<IEnumerable<Playlist>> GetAllAsync()
        {
            var playlists =
                from playlist in Context.Playlists
                orderby playlist.DateCreated descending
                select playlist;

            return await playlists.ToListAsync();
        }

        public async Task<bool> AddSongAsync(int playlistId, AddSongInput songInput)
        {
            var playlist = await GetByIdAsync(playlistId);

            // no playlist with given id
            if (playlist is null) return false;
            
            var songInPlaylist =
            (
                from song in playlist.Songs
                where song.Name == songInput.Name
                      && song.Artist == songInput.Artist
                      && song.Type == songInput.Type
                select song
            ).ToList();

            // song already in playlist
            if (songInPlaylist.Count > 0) return false;

            var existingSong =
            (
                from song in Context.Songs
                where song.Name == songInput.Name
                      && song.Artist == songInput.Artist
                      && song.Type == songInput.Type
                select song
            ).ToList();

            // song already in database
            if (existingSong.Count > 0)
            {
                playlist.Songs.Add(existingSong[0]);
                return await Context.SaveChangesAsync() > 0;
            }

            // song not in database
            var newSong = _mapper.Map<AddSongInput, Song>(songInput);
            await Context.AddAsync(newSong);
            playlist.Songs.Add(newSong);
            return await Context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveSongAsync(int playlistId, int songId)
        {
            var playlist = await GetByIdAsync(playlistId);

            if (playlist is null) return false;
            
            var songs =
            (
                from song in playlist.Songs
                where song.Id == songId
                select song
            ).ToList();
            
            // song not in collection
            if (songs.Count <= 0) return false;
            
            playlist.Songs.Remove(songs[0]);
            return await Context.SaveChangesAsync() > 0;
        }
    }
}