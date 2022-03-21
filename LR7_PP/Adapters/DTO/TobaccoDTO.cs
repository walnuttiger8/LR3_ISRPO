using Domain.Models;

namespace LR7_PP.Adapters.DTO
{
    public class TobaccoDTO
    {
        public string Manufacturer { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Strength { get; set; }
        public string Image { get; set; }


        public async Task<Tobacco> Parse()
        {
            var tobacco = new Tobacco()
            {
                Manufacturer = Manufacturer,
                Name = Name,
                Price = Price,
                Strength = Strength,
                Image = Convert.FromBase64String(Image),
            };
            return tobacco;
        }

    }
}
