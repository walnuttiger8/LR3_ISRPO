namespace Domain.Models.Base
{
    public abstract class BaseModel
    {
        public Guid Id { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.UtcNow;
    }
}
