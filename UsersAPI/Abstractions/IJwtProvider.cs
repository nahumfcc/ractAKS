using UsersAPI.Models;

namespace UsersAPI.Abstractions
{
    public interface IJwtProvider
    {
        string Generate(LoginRequest request);
    }
}
