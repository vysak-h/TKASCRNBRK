using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TKASCRNBRK.Models;

namespace TKASCRNBRK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreakSessionController : ControllerBase
    {
        private readonly BreakSessionContext _context;

        public BreakSessionController(BreakSessionContext context)
        {
            _context = context;
        }

        // GET: api/BreakSession
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BreakSession>>> GetbreakSessions()
        {
            return await _context.BreakSessions.ToListAsync();
        }

        // GET: api/BreakSession/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BreakSession>> GetBreakSession(int id)
        {
            var breakSession = await _context.BreakSessions.FindAsync(id);

            if (breakSession == null)
            {
                return NotFound();
            }

            return breakSession;
        }

        // PUT: api/BreakSession/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBreakSession(int id, BreakSession breakSession)
        {
            if (id != breakSession.Id)
            {
                return BadRequest();
            }

            _context.Entry(breakSession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BreakSessionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BreakSession
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BreakSession>> PostBreakSession(BreakSession breakSession)
        {
            _context.BreakSessions.Add(breakSession);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBreakSession", new { id = breakSession.Id }, breakSession);
        }

        // DELETE: api/BreakSession/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBreakSession(int id)
        {
            var breakSession = await _context.BreakSessions.FindAsync(id);
            if (breakSession == null)
            {
                return NotFound();
            }

            _context.BreakSessions.Remove(breakSession);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BreakSessionExists(int id)
        {
            return _context.BreakSessions.Any(e => e.Id == id);
        }
    }
}
