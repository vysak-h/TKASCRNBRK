using Microsoft.EntityFrameworkCore;

namespace TKASCRNBRK.Models;

public class BreakSessionContext : DbContext
{
    public BreakSessionContext(DbContextOptions<BreakSessionContext> options)
        : base(options)
        {}

        public DbSet<BreakSession> BreakSessions { get; set; } = null;
}