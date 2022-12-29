using GSL.CommonRepo.Interface;
using GSL.DataContext.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace GSL.CommonRepo.Implementation
{
    public class UnitOfWorkRepository : IUnitOfWorkRepository, IDisposable
    {
        internal GSLDataContext _context;
        private readonly IHttpContextAccessor _httpContext;


        public UnitOfWorkRepository(IHttpContextAccessor httpContext, GSLDataContext context)
        {
            _httpContext = httpContext;
            _context = context;
        }
       

        //This CreateTransaction() method will create a database Trnasaction so that we can do database operations by
        //applying do evrything and do nothing principle
        public IDbContextTransaction CreateTransaction()
        {
            return _context.Database.BeginTransaction();
        }

        public void Commit()
        {
            _context.Database.CommitTransaction();
        }

        public void Rollback()
        {
            //_context.Rollback();
            _context.Dispose();
        }
        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
        public int SaveChangesUpdateCreate(bool updateProperty)
        {
            UpdateCreatedAndUpdatedBy(updateProperty);
            var responseResult = _context.SaveChanges();
            return responseResult;
        }
        private void UpdateCreatedAndUpdatedBy(bool updateProperty)
        {
            long userId = long.Parse(_httpContext.HttpContext.User
            .Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value);
            foreach (var entry in _context.ChangeTracker.Entries())
            {

                if (entry.State == EntityState.Added)
                {
                    entry.CurrentValues["CreatedOn"] = DateTime.UtcNow;
                    entry.CurrentValues["CreatedBy"] = userId;
                }
                if (updateProperty)
                {
                    entry.CurrentValues["UpdatedOn"] = DateTime.UtcNow;
                    entry.CurrentValues["UpdatedBy"] = userId;
                }

            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
