using UsersAPI.Models;

namespace UsersAPI.Abstractions
{
    public interface IJwtProvider
    {
        UserResponse Generate(User request);

        UserResponse Refresh(RequestToken request);
    }
}
