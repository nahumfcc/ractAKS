using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using UsersAPI.Abstractions;
using UsersAPI.Models;

namespace UsersAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserContext _userContext;
       
        private readonly ILogger<UserController> _logger;
        private readonly IJwtProvider _jwtProvider;

        public UserController(
            ILogger<UserController> logger, 
            IJwtProvider jwtProvider,
            UserContext userContext)
        {
            _logger = logger;
            _jwtProvider = jwtProvider;
            _userContext = userContext;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(
            [FromBody] RequestUser loginRequest
            , CancellationToken cancellationToken )
        {
            if(loginRequest == null) { 
                return BadRequest();
            }
            if(_userContext.Users == null)
            {
                return NotFound();
            }
            if(_userContext.Users.Any(r=> r.email == loginRequest.email))
            {
                var response = _jwtProvider.Generate(
                    new User { email = loginRequest.email, password = loginRequest.password });
                _userContext.UsersLogged.Add(response);
                await _userContext.SaveChangesAsync();
                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> CreateUser(
            [FromBody] RequestUser user
            , CancellationToken cancellationToken)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (_userContext.Users.Any(r => r.email == user.email))
            {
                return Ok("El usuario ya existe");
            }
            else
            {
                _userContext.Users.Add(new User { 
                    Id = Guid.NewGuid(),
                    email = user.email,
                    password = user.password
                });
                await _userContext.SaveChangesAsync();
                return Ok(user.email);
            }
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> RefreshToken(
            [FromBody] RequestToken tokenInfo)
        {
            if (tokenInfo == null)
            {
                return BadRequest();
            }
            var response = _jwtProvider.Refresh(tokenInfo);
                if (response == null) {
                    return BadRequest("No se puedo actualizar el token"); 
                }
                else if (response.email.IsNullOrEmpty())
                {
                    return BadRequest("Token invalido");
                }
                return Ok(response);
        }

        [Authorize]
        [HttpGet(Name = "Users")]
        public async Task<IActionResult> Users()
        {
            return Ok(_userContext.Users.Select(a=>a.email));
        }
    }
}