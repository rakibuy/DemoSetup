using GSL.DataContext.Entity;
using GSL.Service.Interface;
using GSL.VModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;

namespace GSL.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        private IWebHostEnvironment _webHostEnvironment;

        public UserController(IUserService userService,

            IWebHostEnvironment webHostEnvironment)
        {
            _userService = userService;
            _webHostEnvironment = webHostEnvironment;

        }

        //add single User
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserVM user)
        {


            CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);



            var data = new User
            {

                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                UserName = user.UserName,
                Role = user.Role,
                Email = user.Email,
                Number = user.Number,
                AddedBy = "test" //HttpContext.User.FindFirstValue("Id"),

            };
            await _userService.Add(data);
            return CreatedAtAction(nameof(AddUser), user.Id, user);
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
