using Domain.Models;
using Infrastructure.DAL;
using Infrastructure.Repository.Base;

namespace Infrastructure.Repository
{
    public class TobaccoRepository : Repository<Tobacco>
    {
        public TobaccoRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
