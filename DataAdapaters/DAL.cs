using BellBrandAPI.Controllers;
using BellBrandAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Data;
using System;
using Microsoft.AspNetCore.Http;
using System.Collections.Specialized;
using System.Net;
using System.Web;
using System.Collections.Generic;

namespace BellBrandAPI.DataAdapaters
{
    public class DAL
    {
        //private readonly ILogger<BellController> _logger;
        ILogger _Logger;
        string strDBConnectionString;
        private readonly IConfiguration _configuration;

        public DAL(IConfiguration configuration)
        {
            _configuration = configuration;
            strDBConnectionString = _configuration.GetConnectionString("BellBrandDBConn");
        }        
        public JsonResult GetCustomersByMobile(string strMobile)
        {
            //string query = @"Select Areaname,salesman,customername,shopname,mobile from dbo.tblCustomers Where status='Active' And Areaname='"+ strArea +"' ";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_GET_CUSTOMER_INFOBY_MOBILE", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@MOBILE", strMobile);
                myCon.Open();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }
            return new JsonResult(table);
        }
        public JsonResult GetAllOrdersByMobile(string strMobile)
        {
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_Get_OrdersByMobile", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@MOBILE", strMobile);
                myCon.Open();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }
            return new JsonResult(table);
        }
        
        public JsonResult SaveMobileAuthentication(string strMobile)
        {
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_UpdateMobileAuth", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@MOBILE", strMobile);
                myCon.Open();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }
            return new JsonResult(table);
        }

        //not using this
        public JsonResult GetAllItems()
        {
            //TODO: change to SP
            //string query = @"Select ItemID,ItemName,Rate,PACKINGTYPE,TOTALITEMSINPACK,CATEGORY from dbo.tblItemMaster";
            DataTable table = new DataTable();
            //string sqlDataSource = _configuration.GetConnectionString("BellBrandDBConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_GET_ALLITEMS", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                myCon.Open();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();                
            }
            return new JsonResult(table);
        }

        public JsonResult GetAreaList()
        {
            //string query = @"Select AreaName,Salesman from dbo.AreaMaster Where status='Active' ";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_GET_AREALIST", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@AREA", strArea);
                myCon.Open();
                //cmd.ExecuteNonQuery();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
                //myCon.Open();
                //using (SqlCommand myCommand = new SqlCommand(query, myCon))
                //{
                //    myReader = myCommand.ExecuteReader();
                //    table.Load(myReader);

                //    myReader.Close();
                //    myCon.Close();
                //}
            }

            return new JsonResult(table);
        }
        public JsonResult GetOrderSheetByArea(string strArea, string strSalesman, string strLSdate)
        {
            //string query = @"Select ID,ItemName,Rate,T_B as Stock,BillDate,Area from dbo.LS where area='" + strArea + "' ";
            DataTable table = new DataTable();
            //string sqlDataSource = _configuration.GetConnectionString("BellBrandDBConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_GET_ORDERITEMSBYAREA", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@AREA", strArea);
                cmd.Parameters.AddWithValue("@LSDATE", strLSdate);
                cmd.Parameters.AddWithValue("@SALESMAN", strSalesman);
                myCon.Open();
                //cmd.ExecuteNonQuery();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();

                //using (SqlCommand myCommand = new SqlCommand(query, myCon))
                //{
                //    myReader = myCommand.ExecuteReader();
                //    table.Load(myReader);

                //    myReader.Close();
                //    myCon.Close();
                //}
            }

            return new JsonResult(table);
        }
        //public JsonResult GetCustomersByMobile(string strMobile)
        //{
        //    //string query = @"Select Areaname,salesman,customername,shopname,mobile from dbo.tblCustomers Where status='Active' And Areaname='"+ strArea +"' ";
        //    DataTable table = new DataTable();
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
        //    {
        //        SqlCommand cmd = new SqlCommand("USP_GET_CUSTOMERSBYMOBILE", myCon);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("@MOBILE", strMobile);
        //        myCon.Open();
        //        myReader = cmd.ExecuteReader();
        //        table.Load(myReader);
        //        myReader.Close();
        //        myCon.Close();
        //    }
        //    return new JsonResult(table);
        //}
        public JsonResult GetCustomersByArea(string strArea)
        {
            //string query = @"Select Areaname,salesman,customername,shopname,mobile from dbo.tblCustomers Where status='Active' And Areaname='"+ strArea +"' ";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_GET_CUSTOMERSBYAREA", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@AREA", strArea);
                myCon.Open();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }
            return new JsonResult(table);
        }
        //public JsonResult GetAllOrdersByPageWise(int skip,int take)
        //{
        //    DataTable dtData = new DataTable();
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
        //    {
        //        SqlCommand cmd = new SqlCommand("USP_GET_ALL_OrdersByStatus", myCon);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("@STATUS", "ALL");
        //        myCon.Open();
        //        myReader = cmd.ExecuteReader();
        //        dtData.Load(myReader);
        //        myReader.Close();
        //        myCon.Close();
        //    }
        //    List<tblBills> objItems = new List<tblBills>();
        //    tblBills objOrder;
        //    foreach (DataRow dr in dtData.Rows)
        //    {
        //        objOrder = new tblBills();
        //        //objOrder.ID = dr("ID");
        //        objItems.Add(objOrder);
        //    }
        //    var customers = objOrder.
        //                        .OrderBy(c => c.LastName)
        //                        .Include(c => c.State)
        //                        .Include(c => c.Orders)
        //                        .Skip(skip)
        //                        .Take(take)
        //                        .ToListAsync();
        //    return new JsonResult(dtData);

        //}
        public JsonResult GetAllOrdersByStatus(string strStatus)
        {
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_GET_ALL_OrdersByStatus", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@STATUS", strStatus);
                myCon.Open();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }
            return new JsonResult(table);
        }
        public JsonResult GetAllOrderItemsByID(int orderid)
        {
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_Get_OrderItemsByOrderID", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ORDERID", orderid);
                myCon.Open();
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }
            return new JsonResult(table);
        }
        public string SaveAllCartItems(List<tblBills> objItems)
        {
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                myCon.Open();
                
                SqlCommand cmd = new SqlCommand("USP_SAVE_ORDER_DETAILS", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER", objItems[0].Customer);
                cmd.Parameters.AddWithValue("@AREA", objItems[0].Area);
                cmd.Parameters.AddWithValue("@MOBILE", objItems[0].Mobile);
                cmd.Parameters.AddWithValue("@AMOUNT", objItems[objItems.Count - 1].TotalAmount);  //as the actual Total amt is adding to the last record.
                cmd.Parameters.AddWithValue("@ORDERDATE", objItems[0].BillDate);
                myReader = cmd.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                
                int OrderID = Convert.ToInt32(table.Rows[0][0]);

                foreach (tblBills p in objItems)
                {
                    cmd = new SqlCommand("USP_SAVE_ORDER_ITEMDETAILS", myCon);
                    cmd.CommandType = CommandType.StoredProcedure;                    
                    cmd.Parameters.AddWithValue("@ITEMNAME", p.ItemName);
                    cmd.Parameters.AddWithValue("@RATE", p.Rate);
                    cmd.Parameters.AddWithValue("@QTY", p.Qty);
                    cmd.Parameters.AddWithValue("@ORDERDATE", p.BillDate);
                    cmd.Parameters.AddWithValue("@ORDERID", OrderID);
                    cmd.ExecuteNonQuery();
                }
                myCon.Close();
            }
            return "Bill details saved Successfully";
        }
        public string SaveBillNew(tblBills p)
        {
            //string query = @"Insert into dbo.Bills(ItemName,Rate,Packets,Amount,BillDate,Area,Salesman) values ('" + p.ItemName + "'," + p.Rate + "," + p.Qty + "," + p.Amount + ",'" + p.BillDate + "','" + p.Area + "','" + p.Salesman + "'); \n";
            //DataTable table = new DataTable();
            //string sqlDataSource = _configuration.GetConnectionString("BellBrandDBConn");
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                //myCon.Open();
                //using (SqlCommand myCommand = new SqlCommand(query, myCon))
                //{
                //    myCommand.ExecuteNonQuery();
                //    myCon.Close();
                //}

                SqlCommand cmd = new SqlCommand("USP_SAVE_BILLS", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ITEMNAME", p.ItemName);
                cmd.Parameters.AddWithValue("@RATE", p.Rate);
                cmd.Parameters.AddWithValue("@QTY", p.Qty);
                cmd.Parameters.AddWithValue("@AMOUNT", p.Amount);
                cmd.Parameters.AddWithValue("@BILLDATE", p.BillDate);
                cmd.Parameters.AddWithValue("@AREA", p.Area);
                cmd.Parameters.AddWithValue("@SALESMAN", p.Salesman);
                cmd.Parameters.AddWithValue("@CUSTOMER", p.Customer);
                myCon.Open();
                cmd.ExecuteNonQuery();
                myCon.Close();
            }
            return "Bill details saved Successfully";

        }
        public string UpdateOrderDetails(tblBills p)
        {
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                SqlCommand cmd = new SqlCommand("USP_UPDATE_ORDER_DETAILS", myCon);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CUSTOMER", p.Customer);
                cmd.Parameters.AddWithValue("@ORDERID", p.ID);
                cmd.Parameters.AddWithValue("@STATUS", p.Status);
                myCon.Open();
                cmd.ExecuteNonQuery();
                myCon.Close();
            }
            return "Order status updated Successfully";
        }

        //not using this
        public JsonResult GetLoading_Items(string strArea,string strSalesman, string strBilldate)
        {
            strBilldate = DateTime.ParseExact(strBilldate,"d",null).ToString();
            //DateTime myDate;
            //if (!DateTime.TryParse(dateString, out myDate))
            //{
            //    // handle parse failure
            //}

            string query = @"Select ID,ItemName,Rate,T_B as Qty,BillDate from dbo.LS where area='" + strArea + "' and Salesman='" + strSalesman + "' and Billdate='" + strBilldate + "'  ";
            DataTable table = new DataTable();
            //string sqlDataSource = _configuration.GetConnectionString("BellBrandDBConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
        

        //NOT USING
        public JsonResult GetSalesManList()
        {
            string query = @"Select ItemValue from dbo.MasterItems where ItemType='salesman' ";
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        
        public string SaveBill(string strArea)  //tblBills p
        {           
            //var request = HttpContext.Current.Request;
            
            //string vals = request.Form.GetValues("medicineOrder").First();

            //NameValueCollection vals2 = HttpUtility.ParseQueryString(vals);

            ////example values:
            //string value1 = vals2.GetValues("username").First();
            //string value2 = vals2.GetValues("FullName").First();

            //int count = vals2.Count; // 11

            

            //string query = @"Insert into dbo.Bills(ItemName,Rate,Packets,BillDate,Area) values ('" + p.ItemName + "'," + p.Rate + "," + p.Qty + ",'" + p.BillDate + "','" + p.Area + "'); \n";
            ////query = query + @"Update dbo.LS set T_B=T_B - " + p.Qty + " where ItemName='" + p.ItemName + "' and Area='" + p.Area + "' ";
            //// and BillDate='" + p.BillDate + "'  //billdate cannot be considered incase if sales man work more than a day

            //DataTable table = new DataTable();
            ////string sqlDataSource = _configuration.GetConnectionString("BellBrandDBConn");
            //using (SqlConnection myCon = new SqlConnection(strDBConnectionString))
            //{
            //    myCon.Open();
            //    using (SqlCommand myCommand = new SqlCommand(query, myCon))
            //    {
            //        myCommand.ExecuteNonQuery();
            //        myCon.Close();
            //    }
            //}
            
            return "Bill details saved Successfully";
        }
    }
}
