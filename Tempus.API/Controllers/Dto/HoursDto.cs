using System.Collections.Generic;
using System;

namespace Tempus.API.Controllers.Dto
{
    public class HoursDto
    {
        public Int64 Date { get; set; }
        public float Hours { get; set; }
        public string Project { get; set; }
    }
}
