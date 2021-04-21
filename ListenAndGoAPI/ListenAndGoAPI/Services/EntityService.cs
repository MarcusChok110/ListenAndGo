using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListenAndGoAPI.Data;
using ListenAndGoAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ListenAndGoAPI.Services
{
    public class EntityService<TEntity> : IEntityService<TEntity> where TEntity : class
    {
        protected readonly AppDbContext Context;
        
        public EntityService(AppDbContext context)
        {
            Context = context;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await Context.Set<TEntity>().ToListAsync();
        }

        public virtual async Task<TEntity> GetByIdAsync(int id)
        {
            return await Context.Set<TEntity>().FindAsync(id);
        }

        public virtual async Task<TEntity> CreateAsync(TEntity entity)
        {
            Context.Set<TEntity>().Add(entity);
            await Context.SaveChangesAsync();
            return entity;
        }

        public virtual async Task<bool> UpdateAsync(TEntity entity)
        {
            Context.Set<TEntity>().Update(entity);
            return await Context.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> DeleteAsync(int id)
        {
            var entity = await Context.Set<TEntity>().FindAsync(id);

            if (entity == null) return false;
            Context.Set<TEntity>().Remove(entity);
            return await Context.SaveChangesAsync() > 0;
        }
    }
}