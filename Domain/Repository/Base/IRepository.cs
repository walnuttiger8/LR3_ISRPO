using Domain.Models.Base;

namespace Domain.Repository.Base
{
    public interface IRepository<T> where T : BaseModel
    {
        Task<IReadOnlyList<T>> GetAll();
        Task<T> GetById(Guid id);
        Task<T> Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
    }
}
