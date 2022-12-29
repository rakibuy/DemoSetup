using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GSL.DataContext.Entity
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? VisitorId { get; set; }

        //User jwt Authentication start
        public string Username { get; set; } = string.Empty;
        public Role Role { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        //User jwt Authentication end

        public string? Email { get; set; }

        public string? Remark { get; set; }

        public bool JobAssignStatus { get; set; }

        public int? JobDetailsId { get; set; }




        [StringLength(100)]
        public string FullName { get; set; } = null!;
        public string? Password { get; set; }
        [StringLength(100)]





        public string? EmployeeId { get; set; }
        [StringLength(100)]

        public bool IsVerified { get; set; }

        [Column("NID")]
        [StringLength(20)]
        [Unicode(false)]
        public string? Nid { get; set; }


        public bool IsSysAdmin { get; set; }
        public bool IsAdmin { get; set; }
        public int PasswordFailCount { get; set; }
        public bool UserLocked { get; set; }
        public bool Active { get; set; }
        public bool Archive { get; set; }
        public bool IsManagement { get; set; }







        [Column(TypeName = "datetime")]
        public DateTime AddedDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }
        [StringLength(30)]
        [Unicode(false)]
        public string AddedBy { get; set; } = null!;
        [StringLength(30)]
        [Unicode(false)]
        public string? UpdatedBy { get; set; }
        [Column("AddedFromIP")]
        [StringLength(15)]
        [Unicode(false)]
        public string AddedFromIp { get; set; } = null!;
        [Column("UpdatedFromIP")]
        [StringLength(15)]
        [Unicode(false)]
        public string? UpdatedFromIp { get; set; }








        [Column(TypeName = "datetime")]
        public DateTime? UserLockedDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? VerificationDate { get; set; }


        [Column(TypeName = "datetime")]
        public DateTime? ErrorTime { get; set; }
        [StringLength(10)]
        [Unicode(false)]
        public string? CompanyId { get; set; }
        [StringLength(10)]
        [Unicode(false)]
        public string? BranchId { get; set; }

        [StringLength(50)]
        [Unicode(false)]
        public string? ContactNo { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string? UserId { get; set; }
        [StringLength(10)]
        [Unicode(false)]
        public string? CompanyGroupId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? PasswordLastChangedDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UserUnlockDate { get; set; }
        public bool? PasswordNeverExpired { get; set; }
        public bool? PasswordChangeOnFirstLogin { get; set; }
        [StringLength(300)]
        [Unicode(false)]
        public string? Image { get; set; }
        [StringLength(36)]
        [Unicode(false)]
        public string? AuthToken { get; set; }

    }
    public enum Role
    {
        
        User = 10,
        Admin = 100
    }
}

