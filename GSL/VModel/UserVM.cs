using GSL.DataContext.Entity;

namespace GSL.VModel
{
    public class UserVM
    {
        public long Id { get; set; }
        public Role Role { get; set; } = Role.User;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Number { get; set; } = null!;

        public string? Password { get; set; }

    }




    public class RefreshToken
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Expires { get; set; }
    }

    public class UserDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }




    public class UserAuth
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }

    public class Jwt
    {
        public string key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }
    }
}

