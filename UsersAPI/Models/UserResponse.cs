namespace UsersAPI.Models
{
    public class UserResponse: RequestToken
    {
        public Guid Id { get; set; }

        public string email { get; set; }
    }
}
