using Domain.Models.Base;

namespace Domain.Models
{
    public class Tobacco : BaseModel
    {
        public string Manufacturer { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Strength { get; set; }
        public byte[] Image { get; set; }

        
        public Tobacco(string manufacturer, string name, float price, int strength, byte[] image)
        {
            Manufacturer = manufacturer;
            Name = name;
            Price = price;
            Strength = strength;
            Image = image;
        }

        public Tobacco()
        {
        }
    }
}
