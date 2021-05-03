using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ListenAndGoAPI.Models.Auth;

namespace ListenAndGoAPI.Models
{
    public class Song
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Artist { get; set; }

        [Required]
        [Column(TypeName = "varchar(7)")]
        public SongType Type { get; set; }

        [Required]
        public string Path { get; set; }

        public ICollection<Playlist> Playlists { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        
        public string ImgUrl { get; set; }

        public enum SongType
        {
            Youtube,
            Spotify,
            Local
        };
    }
}