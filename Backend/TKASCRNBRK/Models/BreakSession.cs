
namespace TKASCRNBRK.Models;

public class BreakSession
{
    public int Id { get; set; }
    public DateTime BreakStartedAt { get; set; }
    public DateTime MinimumBreakCompletedAt { get; set; }
}