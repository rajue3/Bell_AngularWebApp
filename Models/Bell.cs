using System;

namespace BellBrandAPI
{
    public class ItemMaster
    {
        public int ID { get; set; }
        public string? ItemCode { get; set; }
        public string? ItemName { get; set; }
        public int Rate { get; set; }
        public string Qty { get; set; }
        public int Amount
        {
            get { return Convert.ToInt16(Rate) * Convert.ToInt16(Qty); }
        }
    }
    public class LSItems
    {
        public string ItemName { get; set; }
        public int Rate { get; set; }
        public string Qty { get; set; }
        public DateTime ActionDate
        {
            get { return DateTime.Today; }
            set { }
        }
        public string Area { get; set; }
        public int Amount
        {
            get { return Convert.ToInt16(Rate) * Convert.ToInt16(Qty); }
        }
    }
    //using this model as orders and orderitems
    public class tblBills
    {
        public int ID { get; set; }
        public string ItemName { get; set; }
        public string Rate { get; set; }
        public string Qty { get; set; }
        public DateTime BillDate
        {
            get { return DateTime.Now; }
            set { }
        }
        public string Area { get; set; }
        public string Salesman { get; set; }
        public string Customer { get; set; }
        public string Mobile { get; set; }
        public string TotalAmount { get; set; }
        public string Status { get; set; }
        public string Amount
        {
            //get { return Convert.ToInt16(Rate) * Convert.ToInt16(Qty); }
            //get { return decimal.Round(Convert.ToDecimal(Rate) * Convert.ToInt16(Qty)); }
            get { return (Convert.ToDecimal(Rate) * Convert.ToInt16(Qty)).ToString("0.00"); }
        }
    }
    public class AreaMaster
    {
        public string AreaName { get; set; }
        public string Salesman { get; set; }
    }
    //public class tblOrders
    //{
    //    public int OrderID { get; set; }
    //    public string CustomerName { get; set; }
    //    public string Mobile { get; set; }
    //    public string Area { get; set; }
    //    public string OrderDate { get; set; }
    //    public string TotalItems { get; set; }
    //    public string TotalAmount { get; set; }
    //    public string Status { get; set; }
    //}
    //public class tblOrderItems
    //{
    //    public int ID { get; set; }
    //    public int OrderID { get; set; }
    //    public string ItemName { get; set; }
    //    public int Rate { get; set; }
    //    public string Qty { get; set; }
    //    public DateTime ActionDate
    //    {
    //        get { return DateTime.Today; }
    //        set { }
    //    }
    //    public int Amount
    //    {
    //        get { return Convert.ToInt16(Rate) * Convert.ToInt16(Qty); }
    //    }
    //}
    
}