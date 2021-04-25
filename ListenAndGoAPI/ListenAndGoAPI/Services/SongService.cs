using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListenAndGoAPI.Data;
using ListenAndGoAPI.Models;
using ListenAndGoAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ListenAndGoAPI.Services
{
    public class SongService : EntityService<Song>, ISongService
    {
        public SongService(AppDbContext context) : base(context)
        {
        }
    }
}