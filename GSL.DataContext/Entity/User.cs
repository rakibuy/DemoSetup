using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GSL.DataContext.Entity
{
    public partial class User
    {
        [Key]
        public long Id { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string UserName { get; set; } = null!;
        [StringLength(50)]
        [Unicode(false)]
        public string Email { get; set; } = null!;
        [StringLength(15)]
        [Unicode(false)]
        public string Number { get; set; } = null!;
        [MaxLength(1)]
        public byte[] PasswordHash { get; set; } = null!;
        [MaxLength(1)]
        public byte[] PasswordSalt { get; set; } = null!;
        [StringLength(1)]
        [Unicode(false)]
        public string? RefreshToken { get; set; }
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }
        public Role Role { get; set; } = Role.User;
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

    public enum Role
    {
        User = 10,
        Admin = 100
    }
}
