using GSL.CommonRepo.Interface;
using GSL.DataContext.Entity;
using GSL.Service.Interface;

namespace GSL.Service.Implementation
{
    public class LeadsService : ILeadsService
    {
        private readonly ICommonRepository<Lead> _leadRepository;
        private readonly IHttpContextAccessor _httpContext;
        

        public LeadsService(ICommonRepository<Lead> leadRepository,
            IHttpContextAccessor httpContext
            
            )
        {
            _leadRepository = leadRepository;
            _httpContext = httpContext;
             
        }
        public Task<Lead> Add(Lead lead)
        {
            lead.AddedDate = DateTime.Now;
            lead.AddedFromIp = System.Net.Dns.GetHostName();
            var result =  _leadRepository.AddAsync(lead);
             _leadRepository.SaveChanges();
            return result;
        }

        public Lead Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Lead GetLeadByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public Lead GetLeadByid(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Lead> GetLeads()
        {
            var result = _leadRepository.GetAll();
            return result;
        }

        public Task<Lead> Update(Lead lead)
        {
            throw new NotImplementedException();
        }
    }
}
