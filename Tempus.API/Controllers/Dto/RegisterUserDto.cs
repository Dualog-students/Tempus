using System.Collections.Generic;

namespace Tempus.API.Controllers.Dto
{
    public class RegisterUserDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Position { get; set; }
        public int PartTimePercentage { get; set; }
        public List<string> Projects { get; set; }
    }
}
