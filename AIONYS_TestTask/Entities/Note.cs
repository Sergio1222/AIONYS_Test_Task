using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AIONYS_TestTask.Entities
{
    /// <summary>
    ///A simple class-model for the task
    /// </summary>
    public class Note
    {
        /// <summary>
        /// Note id, important for working with the Entity Framework(primary key)
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Note description, main field
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Designer without parameters, to work with the Entity Framework
        /// </summary>
        public Note() { }
    }
}
