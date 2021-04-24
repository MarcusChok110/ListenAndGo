using System.Collections.Generic;
using ListenAndGoAPI.Models.Auth;
using ListenAndGoAPI.Settings;

namespace ListenAndGoAPI.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateJwt(User user, IList<string> roles);
    }
}