using System.Collections.Generic;
using System;

namespace Tempus.API.Controllers.Dto
{
    public class HoursDto
    {
        public Int64 Date { get; set; }
        public Int16 Hours { get; set; }
        public string Project { get; set; }
        public string Notes { get; set; }
    }
}
