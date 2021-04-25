using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ListenAndGoAPI.Models.Auth;
using ListenAndGoAPI.Resources.DTOs;
using ListenAndGoAPI.Services.Interfaces;
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
        private readonly RoleManager<Role> _roleManager;
        private readonly IJwtService _jwtService;

        public AuthController(IMapper mapper, UserManager<User> userManager,
            RoleManager<Role> roleManager, IJwtService jwtService)
        {
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtService = jwtService;
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult> SignUp(UserAuthDTO userAuthDto)
        {
            var user = _mapper.Map<UserAuthDTO, User>(userAuthDto);
            var userCreateResult = await _userManager.CreateAsync(user, userAuthDto.Password);

            return userCreateResult.Succeeded
                ? Created(string.Empty, string.Empty)
                : Problem(userCreateResult.Errors.First().Description, null, 500);
        }

        [HttpPost("SignIn")]
        public async Task<ActionResult> SignIn(UserAuthDTO userAuthDto)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.UserName == userAuthDto.Username);
            if (user is null) return NotFound("Username not found");

            var userSignInResult = await _userManager.CheckPasswordAsync(user, userAuthDto.Password);

            return userSignInResult
                ? Ok(_jwtService.GenerateJwt(user, await _userManager.GetRolesAsync(user)))
                : BadRequest("Username or password incorrect");
        }

        [HttpPost("Roles")]
        public async Task<ActionResult> CreateRole(string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName)) return BadRequest("Role name not provided");

            var newRole = new Role {Name = roleName};
            var roleResult = await _roleManager.CreateAsync(newRole);

            return roleResult.Succeeded
                ? Ok()
                : Problem(roleResult.Errors.First().Description, null, 500);
        }

        [HttpPost("User/{username}/Role")]
        public async Task<ActionResult> AddUserToRole(string username, [FromBody] string roleName)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.UserName == username);
            var result = await _userManager.AddToRoleAsync(user, roleName);

            return result.Succeeded
                ? Ok()
                : Problem(result.Errors.First().Description, null, 500);
        }

        [HttpGet("Ping")]
        public ActionResult Ping()
        {
            return Ok("You are authorized with a JWT.");
        }
    }
}