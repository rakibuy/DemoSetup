using GSL.DataContext.Entity;

namespace GSL.Service.Interface
{
    public interface IUserService
    {
        User GetUserByid(int id);
        User GetUserByEmail(string email);
        IEnumerable<User> GetUsers();
        Task<User> Add(User user);
        Task<User> Update(User user);
        User Delete(int id);

    }
}
