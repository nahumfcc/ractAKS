using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UsersAPI.Abstractions;
using UsersAPI.Models;

namespace UsersAPI.Login
{
    internal sealed class JwtProvider : IJwtProvider
    {
        private readonly JwtOptions _options;
        private readonly UserContext _userContext;


        public JwtProvider(
            IOptions<JwtOptions> options, UserContext userContext)
        {
            _options = options.Value;
            _userContext = userContext;
        }

        public UserResponse Generate(User request)
        {
            var claims = new Claim[] {
                new Claim(JwtRegisteredClaimNames.Email, request.email),
                new Claim(ClaimTypes.Name, request.email, ClaimValueTypes.String)
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("EstaEsMiLlaveSecretaParalaAutenticacionEnElAPI")),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    "Todos",
                    "https://localhost:7283",
                    claims,
                    null,
                    DateTime.UtcNow.AddHours(1),
                    signingCredentials);
            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            string refreshToken = GenerateRefreshToken();
            return new UserResponse
            {
                email = request.email,
                Id = request.Id,
                token = tokenValue,
                refreshToken = refreshToken
            };
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public UserResponse Refresh(RequestToken request) {

            string? token = request.token;
            string? refreshToken = request.refreshToken;
            var principal = GetPrincipalFromExpiredToken(token);
            if (principal == null)
            {
                return new UserResponse { email = "", token = "Invalid access token or refresh token" };
            }
            //TODO
            var email = principal.Identity.Name;

            if (email.IsNullOrEmpty())
            {
                return new UserResponse { email = "", token = "Invalid access token or refresh token" };
            }

            var lastSession = _userContext.UsersLogged.Where(r => r.email == email).FirstOrDefault();
            if (lastSession == null)
            {
                return new UserResponse { email = "", token = "Invalid access token or refresh token" };
            }
            if (lastSession.refreshToken != refreshToken)
            {
                return new UserResponse { email = "", token = "Invalid access token or refresh token" };
            }

            var newAccessToken = CreateToken(principal.Claims.ToList());
            var newRefreshToken = GenerateRefreshToken();

            _userContext.UsersLogged.Update(lastSession);

            lastSession.token = new JwtSecurityTokenHandler().WriteToken(newAccessToken);
            lastSession.refreshToken = newRefreshToken;
            _userContext.Entry(lastSession).State = EntityState.Modified;
            _userContext.SaveChanges();

            return lastSession;
        }


        private JwtSecurityToken CreateToken(List<Claim> claims)
        {
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("EstaEsMiLlaveSecretaParalaAutenticacionEnElAPI")),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    "Todos",
                    "https://localhost:7283",
                    claims,
                    null,
                    DateTime.UtcNow.AddHours(1),
                    signingCredentials);
            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

            return token;
        }
        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EstaEsMiLlaveSecretaParalaAutenticacionEnElAPI")),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }
    }
}
