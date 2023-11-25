using Microsoft.AspNetCore.Mvc;
//using BellBrandAPI.Models;
using BellBrandAPI.DataAdapaters;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace BellBrandAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BellBrandController : ControllerBase
    {
        ILogger _Logger;

        private readonly DAL objDAL;
        public BellBrandController(DAL _objDAL)
        {
            objDAL = _objDAL;

        }
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]/{mobile}")]
        public JsonResult GetCustomersByMobile(string mobile)
        {
            JsonResult objAllItems = objDAL.GetCustomersByMobile(mobile);
            return objAllItems;
        }

        [Route("[action]/{mobile}")]
        [HttpPost]
        public JsonResult UpdateMobileAuthentication(string mobile)
        {
            //objDAL.SaveMobileAuthentication(mobile);
            JsonResult objAllItems = objDAL.SaveMobileAuthentication(mobile);
            return objAllItems;
        }
       
        [HttpGet("[action]")]
        public JsonResult GetAllItems()
        {

            JsonResult objAllItems = objDAL.GetAllItems();
            return objAllItems;
            //return new JsonResult("Added Successfully");

        }

        [Route("[action]/{objAllCartItems}")]
        [HttpPost]
        public JsonResult SaveAllCartItems(List<tblBills> objAllCartItems)
        {
            //https://rajuebps.bsite.net/BellBrand/SaveAllCartItems/OBJALLCARTITEMS
            objDAL.SaveAllCartItems(objAllCartItems);
            return new JsonResult("Cart items saved Successfully");
        }
        [Route("objbills")]
        [HttpPost]
        public JsonResult SaveBillsNew(tblBills objbills)
        {
            objDAL.SaveBillNew(objbills);
            return new JsonResult("Bill details saved Successfully");
        }

        [Route("[action]/{objbills}")]
        [HttpPost]
        public JsonResult UpdateOrderDetails(tblBills objbills)
        {
            string strResponse = objDAL.UpdateOrderDetails(objbills);
            return new JsonResult(strResponse);
        }

        [HttpGet("[action]/{mobile}")]
        public JsonResult GetAllOrdersByMobile(string mobile)
        {
            JsonResult objAllItems = objDAL.GetAllOrdersByMobile(mobile);
            return objAllItems;
        }


        [HttpGet("{area}/{salesman}/{billdate}")]
        public JsonResult GetOrderSheetByArea(string area, string salesman, string billdate)
        {

            //https://localhost:44300/BellBrand/bazar/dd/02
            //https://localhost:44300/BellBrand?area=bazar&salesman=dd&billdate=02
            //https://rajuebps.bsite.net/BellBrand/Bazar/Ramesh2/3  //working
            //https://rajuebps.bsite.net/swagger/index.html  //working
            //https://rajuebps.bsite.net/BellBrand?area=bazar&salesman=dd&billdate=02  // this is not working, pointing to open GET method.

            //https://rajuebps.bsite.net/bellbrand/GetLoading_Items?strArea=hyd&strsalesman=raj&billdate=02022023
            //https://rajuebps.bsite.net/bellbrand/GetLoading_Items?strArea=hyd/strsalesman=raj/billdate=02022023
            //https://rajuebps.bsite.net/BellBrand/GetOrderSheetByArea?strArea=bazar&strSalesman=test&strBilldate=23

            JsonResult objAllItems = objDAL.GetOrderSheetByArea(area, salesman, billdate);
            return objAllItems;
        }
        //[HttpGet("[action]/{area}/{salesman}/{billdate}")]  //is also working.
        //[HttpGet("{id}")]

        [HttpGet("[action]")]
        public JsonResult GetAreaList()
        {
            JsonResult objItems = objDAL.GetAreaList();
            return objItems;
        }
        [HttpGet("[action]/{area}")]
        public JsonResult GetCustomersByArea(string area)
        {
            JsonResult objAllItems = objDAL.GetCustomersByArea(area);
            return objAllItems;
        }

        //// GET api/customers/page/10/10
        //[HttpGet("page/{skip}/{take}")]
        ////[NoCache]
        ////[ProducesResponseType(typeof(List<Customer>), 200)]
        ////[ProducesResponseType(typeof(ApiResponse), 400)]
        //public JsonResult GetAllOrdersByPageWise(int skip, int take)
        //{
        //    try
        //    {
        //        JsonResult objAllItems = objDAL.GetAllOrdersByPageWise(skip, take);
        //        //Response.Headers.Add("X-InlineCount", pagingResult.TotalRecords.ToString()); //this is for pagewise data
        //        //return Ok(pagingResult.Records);
        //        return objAllItems; 
        //    }
        //    catch (Exception exp)
        //    {
        //        _Logger.LogError(exp.Message);
        //        //return BadRequest(new ApiResponse { Status = false });
        //        return new JsonResult(exp.Message);
        //    }
        //}
        [HttpGet("[action]/{status}")]
        public JsonResult GetAllOrdersByStatus(string status)
        {
            JsonResult objAllItems = objDAL.GetAllOrdersByStatus(status);
            return objAllItems;
        }
        [HttpGet("[action]/{orderid}")]
        public JsonResult GetAllOrderItemsByID(int orderid)
        {
            JsonResult objAllItems = objDAL.GetAllOrderItemsByID(orderid);
            return objAllItems;
        }

        //[HttpGet("[action]/{mobile}")]
        //public JsonResult GetAllOrdersByMobile(string mobile)
        //{
        //    JsonResult objAllItems = objDAL.GetAllOrdersByMobile(mobile);
        //    return objAllItems;
        //}
        //[HttpGet]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    var rng = new Random();
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}       
        //[HttpGet("{city}/{country}")]
        //public IActionResult Get(string city, string country)
        //{
        //}
        //not required
        //[HttpGet("[action]")]
        //public JsonResult GetSalesManList()
        //{
        //    JsonResult objItems = objDAL.GetSalesManList();
        //    return objItems;
        //}


        [Route("objbills2")]
        [HttpPost]
        public JsonResult SaveBillsNew2(tblBills objbills2)
        {
            objDAL.SaveBillNew(objbills2);
            return new JsonResult("Bill details saved Successfully");
        }

        ////[Route("api/Values/SaveBills")]
        //[Route("action")]
        //[HttpPost]
        //public string SaveBills(string area)
        //{
        //    //if (!Request.Content.IsMimeMultipartContent("form-data"))
        //    //    return Request.CreateResponse(HttpStatusCode.InternalServerError);

        //    //objDAL.SaveBill(area);
        //    return "success";
        //}      

        //if (!Request.Content.IsMimeMultipartContent("form-data"))
        //      return Request.CreateResponse(HttpStatusCode.InternalServerError);

        //[HttpGet("action")]
        //public MaserItems GetMaserItems()
        //{
        //    return ReadJsonFile();
        //}

        //public MaserItems ReadJsonFile()
        //{
        //    MaserItems allitems = new MaserItems();
        //    //ItemMaster objitem = new ItemMaster();
        //    string jsontext = System.IO.File.ReadAllText(@"./masteritems.json");
        //    //string json = System.IO.File.ReadAllText(Server.MapPath("~/files/myfile.json"));
        //    //var items = JsonSerializer.Deserialize<ItemMaster>(jsontext);

        //    allitems = Newtonsoft.Json.JsonConvert.DeserializeObject<MaserItems>(jsontext) ?? allitems; 

        //    //allitems = items;
        //    return allitems;
        //    //Console.WriteLine($"First name: {person.FirstName}");
        //    //Console.WriteLine($"Last name: {person.LastName}");
        //    //Console.WriteLine($"Job title: {person.JobTitle}");
        //}
    }
}
