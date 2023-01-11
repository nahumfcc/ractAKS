using Microsoft.EntityFrameworkCore;

namespace CatalogsAPI.Models
{
    public class CatalogContext: DbContext
    {
        public CatalogContext(DbContextOptions<CatalogContext> options):base(options)
        {

        }

        public DbSet<ProductItem> ProductItems { get; set; } = null!;
    }
}
