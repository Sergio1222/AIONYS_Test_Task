using AIONYS_TestTask.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AIONYS_TestTask.Helpers
{
    public class SqliteDataContext : DbContext, IDisposable
    {
        public DbSet<Note> Notes { get; set; }

        public SqliteDataContext(DbContextOptions<SqliteDataContext> options)
           : base(options)
        {
            Database.EnsureCreated();
        }

        //Creates some fields in the database
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>().HasData(

                new Note
                {
                    Id = 1,
                    Description = "Today I`m running!"
                },
                new Note
                {
                    Id = 2,
                    Description = "Today I`m reading"
                }
                );
        }
    }
}
