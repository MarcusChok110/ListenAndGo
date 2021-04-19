using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ListenAndGoAPI.Models.Auth;

namespace ListenAndGoAPI.Models
{
    public class Playlist
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Description { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreated { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<Song> Songs { get; set; }
    }
}