namespace GSL.VModel
{
    public class LeadVM
    {
        public long Id { get; set; }
        public string Cname { get; set; } = null!;
        public string Cnumber { get; set; } = null!;
        public string? Caddress { get; set; }
        public string Cemail { get; set; } = null!;
        public string? Coccupation { get; set; }
        public string? Cdesignation { get; set; }
        public string AddedBy { get; set; } = null!;

    }
}
