using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ListenAndGoAPI.Models.Auth;
using ListenAndGoAPI.Resources.DTOs;
using ListenAndGoAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ListenAndGoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IJwtService _jwtService;

        public AuthController(IMapper mapper, UserManager<User> userManager, IJwtService jwtService)
        {
            _mapper = mapper;
            _userManager = userManager;
            _jwtService = jwtService;
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult> SignUp(UserAuthDTO userAuthDto)
        {
            var user = _mapper.Map<UserAuthDTO, User>(userAuthDto);
            var userSignUpResult = await _userManager.CreateAsync(user, userAuthDto.Password);

            return userSignUpResult.Succeeded
                ? Created(string.Empty, string.Empty)
                : Problem(userSignUpResult.Errors.First().Description, null, 500);
        }

        [HttpPost("SignIn")]
        public async Task<ActionResult> SignIn(UserAuthDTO userAuthDto)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.UserName == userAuthDto.Username);
            if (user is null) return NotFound("Username or password incorrect");

            var userSignInResult = await _userManager.CheckPasswordAsync(user, userAuthDto.Password);

            return userSignInResult
                ? Ok(new {jwtToken = _jwtService.GenerateJwt(user, await _userManager.GetRolesAsync(user))})
                : NotFound("Username or password incorrect");
        }

        [Authorize]
        [HttpGet("Ping")]
        public async Task<ActionResult> Ping()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            return Ok(user);
        }
    }
}