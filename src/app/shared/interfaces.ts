import { ModuleWithProviders } from '@angular/core';
export interface ItemDetails {
  ID?: string;
  ShopName: string;
  SalesMan: string;
  ItemCode: string;
  ItemName: string;
  Qty: string;
  STOCK: number;
  TotalPackets: string;
  Cartons: number;
  Packets: number;
  MRP: string;
  PRate : string;
  Rate: string;
  Amount: string;
  IMAGEURL?: string;
  PACKINGTYPE?: string;
  TOTALITEMSINPACK: number;
  TOTALITEMSINCARTON?: string;
  CATEGORY?: string;
  Manufacture?: string;
  Description?: string;
  MinOrderAlert: number;
  ActionDate: string;
}
export class tblSalesReport
  {
      Area?:string;
      BillDate?: any;
      Purchase_Amount:any;
      Amount:any;
      Profit_Amount:any;
      Profit_Percent:any;
      TotalBills?:Int16Array;
      UserName?:string;
  }
export interface IitemDetailsResponse {
  status: boolean;
  itemdetails: ItemDetails;
}
export interface ICustomer {
  id?: string;
  ORDERID?: string;
  CUSTOMERNAME: string;
  Area: string;
  MOBILE: string;
  TotalItems?: number;
  TotalAmount?: number;
  orderTotal?: number;
  ShopName: string;
}

export interface BellCustDetails {
  ID?: string;
  Area: string;
  CustomerName: string;
  ShopName: string;
  MOBILE: string;
  SalesMan:string;
  LAT:string;
  LNG:string;
}

export interface BellAreaWiseOrders {
  id: number;
  ShopName: string;
  CustomerName: string;
  Area: string;
  Moblie: string;
  TotalItems: number;
  TotalAmount: string;
}

export interface ICustomer2 {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    gender: string;
    orderCount?: number;
    orders?: IOrder[];
    orderTotal?: number;
}

export interface IState {
    id: number;
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface ICustomerResponse {
    status: boolean;
    customer: ICustomer;
}
export interface Areas2 {
  value: string;
}
export interface Areas {
  Line: string;
  Area: string;
  Shop: string;
  Customer: string;
}

export interface Shops {
  shopname: string;
}
