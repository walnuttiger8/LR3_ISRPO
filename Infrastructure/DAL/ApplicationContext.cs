using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DAL
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Tobacco> Tobaccos { get; set; }
    }
}
