using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MVC_Demo.Models
{
	public class Student
	{
		[Key]
		public int ID { get; set; }

		[Required]
		[StringLength(80, ErrorMessage = "Name should be max 80 characters")]
		public string Name { get; set; } = null!;

		[Required]
		public string Class { get; set; } = null!;

        [Display(Name = "Department")]
        public virtual int DeptID { get; set; }

        [ForeignKey("DeptID")]
        public virtual Department? Department { get; set; }
    }
}

