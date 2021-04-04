using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AIONYS_TestTask.Entities;
using AIONYS_TestTask.Helpers;

namespace AIONYS_TestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly SqliteDataContext _context;

        public NotesController(SqliteDataContext context)
        {
            _context = context;
        }

        //GET: api/Notes
        /// <summary>
        /// We receive all your notes
        /// </summary>
        /// <returns>Notes</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _context.Notes.ToListAsync();
        }

        // GET: api/Notes/5
        /// <summary>
        /// We get one note per id
        /// </summary>
        /// <returns>Notes[id]</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // PUT: api/Notes/5
        /// <summary>
        /// Changes the note by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="note"></param>
        /// <returns>Returns the server's response to the change</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, Note note)
        {
            note.Id = id;
            if (note == null)
            {
                return BadRequest();
            }
            if (!_context.Notes.Any(x => x.Id == note.Id))
            {
                return NotFound();
            }
            _context.Update(note);
            await _context.SaveChangesAsync();
            return Ok(note);
        }

        // POST: api/Notes
        /// <summary>
        /// Creates a new row in the table Notes
        /// </summary>
        /// <param name="note"></param>
        /// <returns>Returns the server's response to the change</returns>
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote( Note note)
        {
            if (note == null)
            {
                return BadRequest();
            }
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            return Ok(note);
        }

        // DELETE: api/Notes/5
        /// <summary>
        /// Removes a specific row from the database for a specific ID element
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Note>> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return note;
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}
