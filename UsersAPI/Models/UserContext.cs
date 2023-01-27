using Microsoft.EntityFrameworkCore;

namespace UsersAPI.Models
{
    public class UserContext:DbContext
    {
        public UserContext(DbContextOptions<UserContext> options):base(options)
        {

        }

        public DbSet<User> Users { get;set; } = null!;

        public DbSet<UserResponse> UsersLogged { get;set; } = null!;
    }
}
