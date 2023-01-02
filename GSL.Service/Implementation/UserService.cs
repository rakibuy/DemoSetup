using GSL.CommonRepo.Interface;
using GSL.DataContext.DataContext;
using GSL.DataContext.Entity;
using GSL.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace GSL.Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly ICommonRepository<User> _userRepository;
        private readonly IHttpContextAccessor _httpContext;
        internal GSLDataContext _context;

        public UserService(ICommonRepository<User> userRepository,
            IHttpContextAccessor httpContext,
            GSLDataContext context
            )
        {
            _userRepository = userRepository;
            _httpContext = httpContext;
            _context = context;
        }
        public async Task<User> Add(User user)

        {

           
            
            
            user.AddedDate = DateTime.Now;
            user.AddedFromIp = System.Net.Dns.GetHostName();
            var result = await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return result;
        }

        public User Delete(int id)
        {
            var result = _userRepository.GetWhere(x => x.Id == id).FirstOrDefault();
            if (result != null)
            {
                var res = _userRepository.Remove(result);
                _userRepository.SaveChanges();
                return res;
            }
            return null;
        }

        public User GetUserByid(int id)
        {
            var user = _userRepository.GetById(id);
            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            return _userRepository.GetAll();
        }

        public async Task<User> Update(User user)
        {
            var result = _userRepository.GetWhere(x => x.Id == user.Id).FirstOrDefault();
            if (result != null)
            {

                result.UserName = user.UserName;
                result.Email = user.Email;
                result.Number = user.Number;
                result.PasswordHash = user.PasswordHash;
                result.PasswordSalt = user.PasswordSalt;

                
               

                result.UpdatedBy = user.UpdatedBy;
                result.UpdatedDate = DateTime.Now;
                result.UpdatedFromIp = System.Net.Dns.GetHostName();

                //var res = await _userRepository.UpdateAsync(result);
                //await _userRepository.SaveChangesAsync();

                var res = _context.Users.Update(result);
                _context.SaveChanges();


            }
            return null;


        }

        public int GetMaxId()
        {
            int id = 0;
            var dataList = _context.Users.Select(r => Convert.ToInt32(r.Id)).ToList();
            id = dataList.Count() == 0 ? 1 : dataList.Max() + 1;
            return id;
        }

        //get all Councilor
        public IEnumerable<User> GetAllCouncilor()
        {
            string sql = "Select * from Users Where Role in(3, 100)";
            var result = _userRepository.RunQuery().Users.FromSqlRaw(sql).ToList();
            return result;
        }

        public IEnumerable<User> GetAllAdmin()
        {
            string sql = "Select * from Users Where Role=100";
            var result = _userRepository.RunQuery().Users.FromSqlRaw(sql).ToList();
            return result;
        }

        public User GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}
