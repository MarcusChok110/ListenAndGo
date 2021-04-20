using AutoMapper;
using ListenAndGoAPI.Models.Auth;
using ListenAndGoAPI.Resources.DTOs;

namespace ListenAndGoAPI.Resources
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserAuthDTO, User>();
        }
    }
}