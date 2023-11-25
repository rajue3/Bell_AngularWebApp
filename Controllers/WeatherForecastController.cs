using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BellBrandAPI.DataAdapaters;

namespace BellBrandAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly DAL objDAL;
        
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, DAL _objDAL)
        {
            _logger = logger;
            objDAL = _objDAL;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //[HttpGet]        
            JsonResult objAllItems = objDAL.GetAllItems();
            return objAllItems;
            //return new JsonResult("Added Successfully");

        }

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> GetWeather()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
