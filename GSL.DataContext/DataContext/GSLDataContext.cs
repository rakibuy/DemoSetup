﻿using GSL.DataContext.Entity;
using Microsoft.EntityFrameworkCore;

namespace GSL.DataContext.DataContext
{
    public class GSLDataContext:DbContext
    {
        public GSLDataContext(DbContextOptions<GSLDataContext> options) : base(options){}
        public DbSet<User> Users { get; set; }
    }
}
