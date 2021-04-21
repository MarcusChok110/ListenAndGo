using System.Collections.Generic;
using System.Threading.Tasks;
using ListenAndGoAPI.Data;

namespace ListenAndGoAPI.Services.Interfaces
{
    /// <summary>
    /// Default REST CRUD operations for service mapped to an Entity / Model
    /// </summary>
    /// <typeparam name="TEntity">Entity / Model in database</typeparam>
    public interface IEntityService<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(int id);
        Task<TEntity> CreateAsync(TEntity entity);
        Task<bool> UpdateAsync(TEntity entity);
        Task<bool> DeleteAsync(int id);
    }
}