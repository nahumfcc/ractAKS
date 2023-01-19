using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsersAPI.Abstractions;
using UsersAPI.Models;

namespace UsersAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IJwtProvider _jwtProvider;

        public UserController(ILogger<UserController> logger, IJwtProvider jwtProvider)
        {
            _logger = logger;
            _jwtProvider = jwtProvider;
        }

        [HttpPost(Name = "Login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginRequest loginRequest
            , CancellationToken cancellationToken )
        {
            if(loginRequest == null) { 
                return BadRequest();
            }
            if(loginRequest.email == "nahum@mail.com")
            {
                return Ok(_jwtProvider.Generate(loginRequest));
            }
            else
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpGet(Name = "Users")]
        public async Task<IActionResult> Users()
        {
            return Ok("Hello world");
        }
    }
}