using System.Collections.Generic;

namespace Tempus.API.Controllers.Dto
{
    public class AuthenticateUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
