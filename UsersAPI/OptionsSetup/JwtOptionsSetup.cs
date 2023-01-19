using Microsoft.Extensions.Options;
using UsersAPI.Login;

namespace UsersAPI.OptionsSetup
{
    public class JwtOptionsSetup : IConfigureOptions<JwtOptions>
    {
        private const string SectionName = "Jwt";
        private readonly IConfiguration _configuration;

        public JwtOptionsSetup(IConfiguration configurarion)
        {
            _configuration = configurarion;
        }

        public void Configure(JwtOptions options)
        {
            _configuration.GetSection(SectionName).Bind(options);
            var temp = _configuration.GetSection(SectionName);
        }
    }
}
