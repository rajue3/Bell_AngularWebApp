using System.Collections.Generic;

namespace BellBrandAPI.Models
{
    public class MaserItem
    {
        public int ID { get; set; }
        public int ItemCode { get; set; }
        public string? ItemName { get; set; }
        public int Rate { get; set; }
    }
    public class MaserItems
    {
        public List<MaserItem>? maserItems { get; set; }
    }
}
