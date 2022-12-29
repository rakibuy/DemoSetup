using Microsoft.EntityFrameworkCore.Storage;

namespace GSL.CommonRepo.Interface
{
    public interface IUnitOfWorkRepository
    {
        int SaveChangesUpdateCreate(bool updateProperty = true);
        int SaveChanges();
        IDbContextTransaction CreateTransaction();
        void Commit();
        void Rollback();
    }
}
