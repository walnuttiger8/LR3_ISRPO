using Domain.Models;
using Infrastructure.DAL;
using Infrastructure.Repository;
using LR7_PP.Adapters.DTO;
using Microsoft.AspNetCore.Mvc;

namespace LR7_PP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TobaccoController : ControllerBase
    {
        private ApplicationContext _dbContext;
        private TobaccoRepository _tobaccoRepository;
        public TobaccoController(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
            _tobaccoRepository = new TobaccoRepository(dbContext);
        }

        // GET: api/<TobaccoController>
        [HttpGet]
        public async Task<IEnumerable<Tobacco>> Get()
        {
            return await _tobaccoRepository.GetAll();
        }

        // GET api/<TobaccoController>/5
        [HttpGet("{id}")]
        public async Task<Tobacco> Get(Guid id)
        {
            return await _tobaccoRepository.GetById(id);
        }

        // POST api/<TobaccoController>
        [HttpPost]
        public async Task Post([FromBody] TobaccoDTO tobacco)
        {
            var t = await tobacco.Parse();
            await _tobaccoRepository.Add(t);
        }

        // PUT api/<TobaccoController>/5
        [HttpPut("{id}")]
        public async Task Put(Guid id, [FromBody] TobaccoDTO tobacco)
        {
            var t = await _tobaccoRepository.GetById(id);

            t.Name = tobacco.Name;
            t.Manufacturer = tobacco.Manufacturer;
            t.Price = tobacco.Price;
            t.Strength = tobacco.Strength;

            await _tobaccoRepository.Update(t);
        }

        // DELETE api/<TobaccoController>/5
        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            var tobacco = await _tobaccoRepository.GetById(id);
            if (tobacco != null)
                await _tobaccoRepository.Delete(tobacco);
        }
    }
}
