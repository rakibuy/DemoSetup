using GSL.DataContext.Entity;

namespace GSL.Service.Interface
{
    public interface ILeadsService
    {
        Lead GetLeadByid(int id);
        Lead GetLeadByEmail(string email);
        IEnumerable<Lead> GetLeads();
        Task<Lead> Add(Lead lead);
        Task<Lead> Update(Lead lead);
        Lead Delete(int id);
    }
}
