using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GSL.DataContext.Entity
{
    [Table("Leads")]
    public partial class Lead
    {
        [Key]
        public long Id { get; set; }
        [Column("CName")]
        [StringLength(30)]
        [Unicode(false)]
        public string Cname { get; set; } = null!;
        [Column("CNumber")]
        [StringLength(15)]
        [Unicode(false)]
        public string Cnumber { get; set; } = null!;
        [Column("CAddress")]
        [StringLength(500)]
        [Unicode(false)]
        public string? Caddress { get; set; }
        [Column("CEmail")]
        [StringLength(30)]
        [Unicode(false)]
        public string Cemail { get; set; } = null!;
        [Column("COccupation")]
        [StringLength(30)]
        [Unicode(false)]
        public string? Coccupation { get; set; }
        [Column("CDesignation")]
        [StringLength(30)]
        [Unicode(false)]
        public string? Cdesignation { get; set; }
        [StringLength(30)]
        [Unicode(false)]
        public string AddedBy { get; set; } = null!;
        [Column(TypeName = "datetime")]
        public DateTime AddedDate { get; set; }
        [Column("AddedFromIP")]
        [StringLength(30)]
        [Unicode(false)]
        public string AddedFromIp { get; set; } = null!;
        [StringLength(30)]
        [Unicode(false)]
        public string? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }
        [Column("UpdatedFromIP")]
        [StringLength(30)]
        [Unicode(false)]
        public string? UpdatedFromIp { get; set; }
    }
}
