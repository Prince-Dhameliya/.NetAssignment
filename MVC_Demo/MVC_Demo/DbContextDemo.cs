using System;
using Microsoft.EntityFrameworkCore;
using MVC_Demo.Models;
namespace MVC_Demo
{
	public class DbContextDemo : DbContext
	{
		public DbContextDemo(DbContextOptions<DbContextDemo> options) : base(options)
		{
		}
		public DbSet<Student> Student { get; set; }
		public DbSet<Department> Department { get; set; }
	}
}

