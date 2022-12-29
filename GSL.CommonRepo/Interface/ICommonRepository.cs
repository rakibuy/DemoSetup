
using GSL.DataContext.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GSL.CommonRepo.Interface
{
    public interface ICommonRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> Get(
         Expression<Func<TEntity, bool>> filter = null,
         Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
         string includeProperties = "");
        TEntity GetById(int id);
        TEntity GetByIdString(string id);

        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate);
        TEntity Add(TEntity entity);
        void AddAll(List<TEntity> entity);
        TEntity Update(TEntity entity);
        TEntity Remove(TEntity entity);
        IEnumerable<TEntity> GetAll(int? index = null, int? count = null);
        IEnumerable<TEntity> GetWhere(Expression<Func<TEntity, bool>> predicate, int? index = null, int? count = null);
        int CountAll();
        int CountWhere(Expression<Func<TEntity, bool>> predicate);
        int SaveChangesUpdateCreate(bool updateProperty = true, long userId = 0);
        int SaveChanges();
        GSLDataContext RunQuery();
        int RawQuery(string query);

        #region async methods
        Task<TEntity> GetByIdAsync(int id);
        Task<TEntity> AddAsync(TEntity entity);
        Task AddAllAsync(List<TEntity> entity);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task<TEntity> DeleteAsync(TEntity entity);
        Task<int> SaveChangesAsync();
        Task<List<TEntity>> GetAsQueryableAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> expression = null);
        #endregion
    }
}