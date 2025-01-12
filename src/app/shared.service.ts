//import { Observable } from "rxjs";
import { Observable, throwError, } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent } from "@angular/common/http";
import { IitemDetailsResponse, ItemDetails } from './shared/interfaces';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  ///readonly APIUrl = "https://ebps.in/";

  readonly APIUrl = "https://api.zionwellmark.in/";
  //readonly APIUrl = "https://localhost:44328/";

  constructor(private http: HttpClient) { }

  getBellWeeklyReport(strArea:string,date1:any): Observable<any[]> {
    //alert(date1 + '-' + date2);
    //alert(this.APIUrl + 'bell/GetLSItemsByDate/' + strType + '/' + date1 +'/'+ date2);
    return this.http.get<any>(this.APIUrl + 'bell/GetWeeklySales/' + strArea + '/' + date1 );
  }
  GetSaleItemsbyBillDate(strArea:string,shop:string,date1:any,date2:any): Observable<any[]> {
    //return this.http.get<any>(this.APIUrl + 'bell/GetSaleItemsbyBillDate/' + strArea + '/' + shop.replace('/','@') + '/' + date1+ '/' + date2 );
    //USP_ITEMS_WISE_SALES_COUNT_BY_BILLDATE
    return this.http.get<any>(this.APIUrl + 'bell/GetSalebyShopsBillDate/ITEMWISE/' + strArea + '/' + shop.replace('/','@') + '/' + date1+ '/' + date2 );
    //USP_ITEMS_WISE_SALES_COUNT_BY_BILLDATE
  }
  GetSalebyShopsBillDateWithBillNo(strReportType:string,strArea:string,shop:string,date1:any,date2:any): Observable<any[]> {
    //SHOPWISEWITHBILL
    //SHOPWISEWITHOUTBILL
    //alert(date1 + '-' + date2);
    console.log('GetSalebyShopsBillDateWithBillNo URL:',this.APIUrl + 'bell/GetSalebyShopsBillDate/' + strReportType + '/' + strArea + '/' + shop.replace('/','@') + '/' + date1+ '/' + date2 );
    return this.http.get<any>(this.APIUrl + 'bell/GetSalebyShopsBillDate/' + strReportType + '/' + strArea + '/' + shop.replace('/','@') + '/' + date1+ '/' + date2 );
    //USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE
  }
  GetSalebyShopsBillDate(strArea:string,shop:string,date1:any,date2:any): Observable<any[]> {
    //alert(date1 + '-' + date2);
    //alert(this.APIUrl + 'bell/GetLSItemsByDate/' + strType + '/' + date1 +'/'+ date2);
    return this.http.get<any>(this.APIUrl + 'bell/GetSalebyShopsBillDate/SHOPWISE/' + strArea + '/' + shop.replace('/','@') + '/' + date1+ '/' + date2 );
    //USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE
  }
  GetSalebyBillNumber(strArea:string,shop:string,date1:any,date2:any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'bell/GetSalebyShopsBillDate/BILLWISE/' + strArea + '/' + shop.replace('/','@') + '/' + date1+ '/' + date2 );
    //BELL_SHOP_WISE_SALES_BY_BILLNUMBER
  }

  GetInactiveShops(strArea:string,shop:string,date1:any,date2:any): Observable<any[]> {
    //alert(date1 + '-' + date2);
    //alert(this.APIUrl + 'bell/GetLSItemsByDate/' + strType + '/' + date1 +'/'+ date2);
    return this.http.get<any>(this.APIUrl + 'bell/GetInactiveShops/' + strArea + '/' + shop.replace('/','@') + '/' + date1+ '/' + date2 );
    //BELL_GET_INACTIVE_SHOPS
    //USP_WEEKLY_SALE_ITEMS_COUNT
  }

  //getBellWeeklyReportNew(strType:string,strArea:string,shop:string,itemname:string,date1:any,date2:any): Observable<any[]> {
    getBellWeeklyReportNew(objSearch:any): Observable<any[]> {
    //alert(date1 + '-' + date2);
    //alert(this.APIUrl + 'bell/GetWeeklySalesByItems/' + strArea + '/' + shop.replace('/','@') + '/' + itemname.replace('/','@') + '/' + date1+ '/' + date2 );
    //console.log('URL=',this.APIUrl + 'bell/GetWeeklySalesByItems/' + strType + '/' + strArea + '/' + shop.replace('/','@') + '/' + itemname.replace('/','@') + '/' + date1+ '/' + date2 );
    //return this.http.get<any>(this.APIUrl + 'bell/GetWeeklySalesByItems/' + strType + '/' + strArea + '/' + shop.replace('/','@') + '/' + itemname.replace('/','@') + '/' + date1+ '/' + date2 );
    return this.http.post<any>(this.APIUrl + 'bell/GetWeeklySalesByItems', objSearch)
    //USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME
  }
  getBellMonthlyReport(strArea:string,date1:any): Observable<any[]> {
    //alert(date1 + '-' + date2);
    //alert(this.APIUrl + 'bell/GetLSItemsByDate/' + strType + '/' + date1 +'/'+ date2);
    return this.http.get<any>(this.APIUrl + 'bell/GetMonthlySalesByItems/' + strArea + '/' + date1 );
  }
  getBellItemsbyAreaDate(Area:any,billdate:any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'bell/GetLSItemsByAreaDate/' + Area + '/' + billdate );
    //BELL_GET_LS_ItemsByArea_Date
  }
  getLSTotalSalesByArea(strArea:string,date1:any,date2:any): Observable<any[]> {
    //alert(date1 + '-' + date2);
    //alert(this.APIUrl + 'bell/GetLSTotalSalesByArea_New/' + strArea + '/' + date1 +'/'+ date2);
    //return this.http.get<any>(this.APIUrl + 'bell/GetLSItemsByDate/' + strType + '/' + date1 +'/'+ date2);
    return this.http.get<any>(this.APIUrl + 'bell/GetLSTotalSalesByArea_New/' + strArea + '/' + date1 +'/'+ date2);
    //BELL_GET_TOTAL_SALES_BY_AREA_NEW
  }
  GetTotalSalesByShop(strArea:string,shop:string,date1:any,date2:any,totalamount:any): Observable<any[]> {
    //alert('total amount :' + totalamount);
    //alert(this.APIUrl + 'bell/GetLSItemsByDate/' + strType + '/' + date1 +'/'+ date2);
    //return this.http.get<any>(this.APIUrl + 'bell/GetLSItemsByDate/' + strType + '/' + date1 +'/'+ date2);
    return this.http.get<any>(this.APIUrl + 'bell/GetTotalSalesByShop/' + strArea +'/'+ shop.replace('/','@') + '/' + date1 +'/'+ date2 +'/'+ totalamount);
    //BELL_SHOP_WISE_TOTAL_SALES
  }
  GetStockDetails(strOption:any,strCategory:any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'bell/GetStockDetails/' + strOption + '/' + strCategory);
    //BELL_STOCK_DETAILS
  }    
  GetStockTransactions(strCategory:string,strTransType:string,date1:any,date2:any,selectedUser:string): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'bell/GetStockTransactions/' + strCategory + '/' + strTransType.replace('/','@') + '/' + date1+ '/' + date2+'/'+selectedUser );
    //BELL_GET_STOCK_TRANSACTIONS
  }  
  UpdatePurchaseRateMinOrder(objDetails: any) {
    //alert(this.APIUrl + 'UpdateOrderStatus');
    return this.http.post(this.APIUrl + 'bell/UpdatedPurchareRateMinOrder', objDetails);
  }
  getBellAreas(strType:string,date1:any,date2:any): Observable<any[]> {
    console.log('Binding shops from Bell_GetAreaList ', `${this.APIUrl}bell/Bell_GetAreaList/` + strType + '/' + date1 +'/'+ date2);
    //return this.http.get<any>(this.APIUrl + 'GetAllOrdersByStatus/' + strStatus);
    //return this.http.get<any>(this.APIUrl + 'bell/Bell_GetAreaList/' + strType);
    return this.http.get<any>(`${this.APIUrl}bell/Bell_GetAreaList/` + strType + '/' + date1 +'/'+ date2);
    //USP_GET_AREALIST
  }
  
  // getBellItemCategories(): Observable<any[]> {
  //   console.log('Binding Item Categories : ', `${this.APIUrl}bell/Bell_GetAllCategories`);
  //   return this.http.get<any>(`${this.APIUrl}bell/Bell_GetAllCategories`);
  //   //BELL_GET_ALL_CATEGORIES
  // }

  getBellItems(strArea:string,shop:string,date1:any,date2:any): Observable<any[]> {
    //console.log('Bell_GetItems: ', `${this.APIUrl}bell/GetAllItems/` + strArea + '/' + shop.replace('/','@'));
    return this.http.get<any>(`${this.APIUrl}bell/GetAllItems/` + strArea + '/' + shop.replace('/','@') + '/' + date1 +'/'+ date2);
  }

  getBellLSOrdersAll(strStatus:any): Observable<any[]> {
    //alert(this.APIUrl + 'bell/GetLSItems');
    //return this.http.get<any>(this.APIUrl + 'GetAllOrdersByStatus/' + strStatus);
    return this.http.get<any>(this.APIUrl + 'bell/GetLSCustomersAll');
  }
  getLSCustomerDetails(ID:number): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'bell/GetLSCustomerDetails/' + ID );
  }
  getBellItemsbyShop(Area:any,ShopName:any): Observable<any[]> {
    //return this.http.get<any>('https://rajuebps.bsite.net/bellbrand/GetAllOrdersByStatus/pending');
    //return this.http.get<any>('https://rajuebps.bsite.net/BellBrand/GetAllOrderItemsByID/' + orderid);
    //alert(ShopName);
    return this.http.get<any>(this.APIUrl + 'bell/GetLSItems/' + Area + '/' + ShopName.replace('/','@') );
  }
  getBellItemsbyCustIDWeekly(CustID:any,Area:any,ShopName:any,date1:any): Observable<any[]> {
    //return this.http.get<any>('https://rajuebps.bsite.net/bellbrand/GetAllOrdersByStatus/pending');
    //return this.http.get<any>('https://rajuebps.bsite.net/BellBrand/GetAllOrderItemsByID/' + orderid);
    //alert(ShopName);
    return this.http.get<any>(this.APIUrl + 'bell/GetLSItemsByMonth/' + CustID + '/' + Area + '/' + ShopName.replace('/','@') + '/' + date1);
  }
  getBell_GetAllCustomers(Line:any,Area:any,Shop:any): Observable<any[]> {
    //return this.http.get<any>('https://rajuebps.bsite.net/bellbrand/GetAllOrdersByStatus/pending');
    //return this.http.get<any>('https://rajuebps.bsite.net/BellBrand/GetAllOrderItemsByID/' + orderid);
    return this.http.get<any>(this.APIUrl + 'bell/Bell_GetAllCustomers/'+ Line + '/' + Area +  '/' + Shop.replace('/','@') );
  }
  updateCustomerLocation(objDetails: any) {
    //alert(this.APIUrl + 'UpdateOrderStatus');
    //return this.http.post('https://rajuebps.bsite.net/BellBrand/UpdateOrderDetails/objbills', objbills);
    return this.http.post(this.APIUrl + 'SaveCustLocation', objDetails);
  }
  getBellLSOrdersbyShopArea(Area:any,Shop:any): Observable<any[]> {
    //return this.http.get<any>('https://rajuebps.bsite.net/bellbrand/GetAllOrdersByStatus/pending');
    //return this.http.get<any>('https://rajuebps.bsite.net/BellBrand/GetAllOrderItemsByID/' + orderid);
    return this.http.get<any>(this.APIUrl + 'bell/GetLSCustomersByAreaShop/' + Area +  '/' + Shop.replace('/','@') );
    //Bell_GetAllCustomers
    //  if (date1 != '')
    //    return this.http.get<any>(this.APIUrl + 'bell/GetLSCustomersAreaDates/' + Area + '/' + '/' + date1 +  '/' + date2 );
    //  else
    //    return this.http.get<any>(this.APIUrl + 'bell/GetLSCustomersByArea/' + Area );
  }
  getOrdersByStatus(strStatus:any): Observable<any[]> {
    //return this.http.get<any>(this.APIUrl + '/Student');
    //alert(this.APIUrl + 'bell/GetLSItems');
    //alert(this.APIUrl + 'GetAllOrdersByStatus/' + strStatus);
     return this.http.get<any>(this.APIUrl + 'GetAllOrdersByStatus/' + strStatus);
  }
  getAllItems(): Observable<any[]> {
    //return this.http.get<any>(this.APIUrl + '/Student');
    //alert(this.APIUrl + '/pending');
    //alert(this.APIUrl + 'GetAllOrdersByStatus/' + strStatus);
    return this.http.get<any>(this.APIUrl + 'GetAllItems');  //USP_GET_ALLITEMS_Refresh
  }
  getItemDetailsByID(id: any): Observable<any> {
    //alert(id);
    return this.http.get<any>(this.APIUrl + 'admin/GetAllItems/' + id);
    //return this.http.get<any>('https://localhost:44328/admin/GetAllItems/' + id);
  }

  insertItemDetails(item: ItemDetails): Observable<ItemDetails> {
    //return this.http.post<any>('https://localhost:44328/admin/SaveItemDetails/', item)
    return this.http.post<any>(this.APIUrl + 'admin/SaveItemDetails/', item)
      .pipe(
        map((data) => {
          console.log('insert new item details status: ' + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }
  updateItemDetails(item: ItemDetails): Observable<ItemDetails> {
    //console.log(item.IMAGEURL);
    //to send only filename and avoid complete image path.
    var fullpath = item.IMAGEURL;
    if (fullpath) {
      var filename = fullpath.split('/').pop();
      item.IMAGEURL = filename;
      //alert(filename);
    }
    //alert(item.IMAGEURL);
    //return this.http.put<any>('https://localhost:44328/admin/SaveItemDetails/', item)
    return this.http.post<any>(this.APIUrl + 'admin/SaveItemDetails', item)
      .pipe(
        map((data) => {
          console.log(data);
          return data;
        }),
        catchError(this.handleError)
      );
  }
  //updateItemDetails_working(item: ItemDetails): Observable<ItemDetails> {
  //  //alert('saving data..');
  //  //console.log(item.ID);
  //  return this.http.put<IitemDetailsResponse>('https://localhost:44328/admin/SaveItemDetails/', item)
  //    .pipe(
  //      map((data) => {
  //        console.log('update Item status: ' + data.status);
  //        return data.itemdetails;
  //      }),
  //      catchError(this.handleError)
  //    );
  //}

  deleteCustomer(id: any): Observable<any> {
    //alert(this.APIUrl + 'admin / DeleteItem ?' + id);
    //return this.http.get<any>('https://localhost:44328/admin/DeleteItem?id=' + id);
    return this.http.get<any>(this.APIUrl + 'admin/DeleteItem?id=' + id);
  }

  deleteCustomer_UsingDelete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.APIUrl + 'admin/DeleteItem?/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadImage(file: File, filename: any): Observable<HttpEvent<any>> {
    //alert('uploading image id=' + filename);
    const formData: FormData = new FormData();
    formData.append('file', file);
    //const req = new HttpRequest('POST', 'https://localhost:44328/admin/uploadimage/' + filename, formData, {
    const req = new HttpRequest('POST', this.APIUrl + 'admin/uploadimage/' + filename, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    alert('Image update success!');
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`/files`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return throwError(() => new Error(errMessage));
      // Use the following instead if using lite-server
      //return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(() => new Error(error.message || 'Node.js server error'));
  }
  testGet(): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'TestGet');
  }
  testGetByStatus(): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'TestGet/pending');
  }
  //getStudentList(): Observable<any[]>{
  //  //return this.http.get<any>(this.APIUrl + '/Student');
  //  //alert(this.APIUrl + '/pending');
  //  //return this.http.get<any>('https://rajuebps.bsite.net/bellbrand/GetAllOrdersByStatus/pending');
  //  return this.http.get<any>(this.APIUrl + 'GetAllOrdersByStatus/all');
  //}

  getItemsbyOrderID(orderid:any): Observable<any[]> {
    //return this.http.get<any>('https://rajuebps.bsite.net/bellbrand/GetAllOrdersByStatus/pending');
    //return this.http.get<any>('https://rajuebps.bsite.net/BellBrand/GetAllOrderItemsByID/' + orderid);
    return this.http.get<any>(this.APIUrl + 'GetAllOrderItemsByID/' + orderid);
  }

  addStudent(val:any){
    return this.http.post(this.APIUrl + '/Student',val);
  }

  updateOrderStatus(objOrders: any) {
    //alert(this.APIUrl + 'UpdateOrderStatus');
    //return this.http.post('https://rajuebps.bsite.net/BellBrand/UpdateOrderDetails/objbills', objbills);
    return this.http.post(this.APIUrl + 'UpdateOrderStatus', objOrders);
  }

  deleteStudent(id: any){
    return this.http.delete(this.APIUrl + '/Student/'+id);
  }


  getDepartmentList(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Department');
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl + '/Department', val);
  }

  updateDepartment(val:any){
    return this.http.put(this.APIUrl + '/Department', val);
  }

  deleteDepartment(id:any){
    return this.http.delete(this.APIUrl + '/Department/'+id);
  }

  //Is used to get current location like Latitude/longitude of the browser/user
  getCurrentLocation() : any {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log('Latitude: ' + position.coords.latitude + ' - Longitude: ' + position.coords.longitude );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

}
