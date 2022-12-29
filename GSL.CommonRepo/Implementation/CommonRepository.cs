using GSL.CommonRepo.Interface;
using GSL.DataContext.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace GSL.CommonRepo.Implementation
{
    public class CommonRepository<TEntity> : ICommonRepository<TEntity> where TEntity : class
    {
        internal GSLDataContext context;
        internal DbSet<TEntity> dbSet;
        private readonly IHttpContextAccessor _httpContext;
        public CommonRepository(GSLDataContext context, IHttpContextAccessor httpContext)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
            _httpContext = httpContext;
        }



        public int CountAll()
        {
            return dbSet.Count();
        }
        public int CountWhere(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.Where(predicate).Count();
        }
        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.FirstOrDefault(predicate);
        }
        public IEnumerable<TEntity> GetAll(int? index, int? count)
        {
            if (index is null || count is null)
            {
                return dbSet.ToList();
            }
            return dbSet.Skip((int)index).Take((int)count).ToList();

        }
        public TEntity GetById(int id)
        {
            return context.Set<TEntity>().Find(id);
        }
        public IEnumerable<TEntity> GetWhere(Expression<Func<TEntity, bool>> predicate, int? index, int? count)
        {
            return dbSet.Where(predicate).ToList();
        }
        public int SaveChangesUpdateCreate(bool updateProperty, long userId)
        {
            UpdateCreatedAndUpdatedBy(updateProperty, userId);
            var responseResult = context.SaveChanges();
            return responseResult;
        }
        public int SaveChanges()
        {
            var responseResult = context.SaveChanges();
            return responseResult;
        }
        public TEntity Add(TEntity entity)
        {
            try
            {
                var response = dbSet.Add(entity);
                return response.Entity;
            }
            catch (Exception exp)
            {
                throw exp;
            }

        }
        public void AddAll(List<TEntity> entity)
        {
            dbSet.AddRange(entity);
        }
        public TEntity Remove(TEntity entity)
        {
            context.Remove(entity);
            return entity;
        }
        public List<TEntity> RemoveAll(List<TEntity> entity)
        {
            context.RemoveRange(entity);
            return entity;
        }
        // 
        public TEntity Update(TEntity entity)
        {
            context.Update(entity);
            return entity;
        }
        public List<TEntity> UpdateAll(List<TEntity> entity)
        {
            context.UpdateRange(entity);
            return entity;
        }
        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }


            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }
        private void UpdateCreatedAndUpdatedBy(bool updateProperty, long userId)
        {
            if (userId == 0)
            {
                userId = long.Parse(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value);
            }

            foreach (var entry in context.ChangeTracker.Entries())
            {

                if (entry.State == EntityState.Added)
                {
                    entry.CurrentValues["AddedDate"] = DateTime.Now;
                    entry.CurrentValues["AddedBy"] = userId;
                }
                if (updateProperty)
                {
                    entry.CurrentValues["UpdatedDate"] = DateTime.Now;
                    entry.CurrentValues["UpdatedBy"] = userId;
                }

            }
        }
        public GSLDataContext RunQuery()
        {
            return context;
        }
        public int RawQuery(string query)
        {
            var result = context.Database.ExecuteSqlRaw(query);
            return result;            
        }


       

        #region Async Methods
        public async Task<TEntity> GetByIdAsync(int id)
        {
            try
            {
                return await context.Set<TEntity>().FindAsync(id);
            }
            catch (TaskCanceledException ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await context.SaveChangesAsync();
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            try
            {
                await context.Set<TEntity>().AddAsync(entity);
                return entity;
            }
            catch (Exception exp)
            {
                throw exp;
            }

        }

        public async Task AddAllAsync(List<TEntity> entity)
        {
            await context.AddRangeAsync(entity);
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            try
            {
                context.Entry(entity).State = EntityState.Modified;
                return entity;
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        public async Task<TEntity> DeleteAsync(TEntity entity)
        {
            context.Set<TEntity>().Remove(entity);
            return entity;
        }

        public Task<List<TEntity>> GetAsQueryableAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> expression = null)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();

            if (expression != null) query = expression(query);

            return query.AsQueryable().ToListAsync();

        }

        public TEntity GetByIdString(string id)
        {
            return context.Set<TEntity>().Find(id);
        }


        #endregion

    }
}