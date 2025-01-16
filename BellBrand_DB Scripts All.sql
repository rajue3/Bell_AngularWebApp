select * from Bell_ItemMaster where itemname in ('BHADUSHA 5 RS','WHEELS 5 RS','SEV MURMURA 5 RS')
select * from Bell_ItemMaster where ITEMCODE = 10

--update Bell_ItemMaster  set status='InActive' where itemname in ('BHADUSHA 5 RS','WHEELS 5 RS')

select * from bhavani_ER_Bills  where itemname in ('BHADUSHA 5 RS','WHEELS 5 RS')  -81,8
select * from bhavani_ER_Bills where itemcode=0  order by actiondate
select * from Bell_LS order by actiondate
select * from bhavani_ER_Bills where itemname='BHADUSHA 5 RS' and itemcode=0 
--update bhavani_ER_Bills  set itemcode=10 where itemname='SEV MURMURA 5 RS' and itemcode=0
--update bhavani_ER_Bills  set itemcode=81 where itemname='WHEELS 5 RS' and itemcode=0
--update bhavani_ER_Bills  set itemcode=81 where itemname='BHADUSHA 5 RS' and itemcode=0

select * from bhavani_ER_Bills  where billdate = '2025-Jan-15'

alter table bhavani_ER_Bills add PRATE MONEY default 0.00

update BELL_LS set area='Khammam (Local)' where username ='ORDERS' and area='abcd-area' and billdate='2024-12-30'

select * from BELL_LS where username like '%order%' and area='abcd-area' and billdate='2024-12-30'
order by actiondate desc

select * from BELL_LS where username='orders' and billdate='08-Jan-2025' and area='PALVANCHA'

--UPDATE Bell_ItemMaster SET PRATE=RATE1-RATE1*(5/100) XX

--**  TO UPDATE ALL PURCHASE RATE WITH 5% LESS ON RATE1
SELECT  CAST(RATE1-CAST(RATE1*5/100 AS DECIMAL(12,2)) AS DECIMAL(12,2)) PRATE,RATE1,RATE2,* FROM Bell_ItemMaster
-- UPDATE Bell_ItemMaster SET PRATE=CAST(RATE1-CAST(RATE1*5/100 AS DECIMAL(12,2)) AS DECIMAL(12,2))

--USE zionwellmark_BellBrand (not using it now, need to plan to use it)
--GO
--use zionwellmark_onlineorders

SELECT * FROM bhavani_ER_Bills_BACKUP WHERE AREA = 'CHENNURU'
SELECT * FROM bhavani_ER_Bills WHERE bhavani_ER_Bills.AREA = 'CHENNURU'
SELECT DISTINCT ITEMNAME,ITEMCODE FROM bhavani_ER_Bills

order by actiondate desc
select * from Bell_STOCK_ENTRY order by actiondate desc
select * from Bell_STOCK_ENTRY  where trans_type = 'DELETED'
delete from Bell_STOCK_ENTRY  where trans_type = 'DELETED'


--update Bell_STOCK_ENTRY set TRANS_TYPE='DELETED'
--UPDATE Bell_ItemMaster SET STOCK=0

SELECT * FROM BELL_LS WHERE USERNAME='ORDERS' ORDER BY ACTIONDATE DESC
SELECT * FROM BELL_LS WHERE USERNAME='RAJU' ORDER BY ACTIONDATE DESC

SELECT DISTINCT AREA FROM BELL_LS WHERE USERNAME='ORDERS'
SELECT * FROM BELL_ITEMMASTER where 
--UPDATE BELL_ITEMMASTER SET PRATE=RATE1

--Delete from Bell_STOCK_ENTRY where CONVERT(nvarchar(10),ACTIONDATE,102) = '2024.12.16' AND TRANS_TYPE='OUT' AND ITEMCODE=2 AND ITEMNAME='moong dal 5 RS' ; ----

--UPDATE BELL_ITEMMASTER SET STOCK=STOCK+ 200 where ITEMCODE= 2 AND ITEMNAME= 'moong dal 5 RS'  


SELECT DISTINCT B.ITEMNAME FROM bhavani_ER_Bills B
WHERE B.ITEMNAME NOT IN (SELECT ITEMNAME FROM Bell_ItemMaster) ORDER BY ITEMNAME

--UPDATE bhavani_ER_Bills SET ITEMCODE = (select ITEMCODE from bhavani_ER_Bills_BACKUP M WHERE M.ITEMNAME= bhavani_ER_Bills.ITEMNAME)
--WHERE bhavani_ER_Bills.AREA = 'CHENNURU'

--** tblCustomers is for Zion and using from mobile login.
---======= Bhavani new tables for ER_LS online storage Mar-2024

ItemMaster -> BELL_ItemMaster
tblCustomers -> Bell_Cust_Master
BILLS -> bhavani_ER_Bills
LS -> BELL_LS
Dummy4Report -> BELL_Dummy4Report

--* Area wise Item count report5
	select AREA,SUM(packets) Qty, BILLDATE,ITEMNAME	FROM bhavani_ER_Bills A WHERE 
	--AREA = (case lower('BHADRACHALAM') when 'all' then AREA ELSE 'BHADRACHALAM' END) AND	
	(BILLDATE BETWEEN CONVERT(nvarchar(10),'2024-07-01',102) AND CONVERT(nvarchar(10),'2024-07-05',102))
	and itemname like '%Khara%'
	GROUP BY BILLDATE,AREA,ITEMNAME


select * FROM bhavani_ER_Bills A WHERE AREA = 'CHENNURU' AND CONVERT(varchar(10),BILLDATE,102) = CONVERT(varchar(10),'2024.07.04',102)
select Sum(Amount) FROM bhavani_ER_Bills A WHERE AREA = 'CHENNURU' AND CONVERT(varchar(10),BILLDATE,102) = CONVERT(varchar(10),'2024.07.04',102)

 select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,SHOPNAME,ISNULL(SUM(AMOUNT),0) AMOUNT from bhavani_ER_Bills
  WHERE AREA='CHENNURU' --and SHOPNAME = (case lower('ALL') when 'all' then SHOPNAME ELSE 'ALL' END)
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'2024-07-04',102) AND CONVERT(nvarchar(10),'2024-07-05',102))
  GROUP BY BILLDATE,SHOPNAME,AREA,BILLNUMBER order by billdate

  	select AREA,SUM(A.AMOUNT) AMOUNT, A.BILLDATE, count(distinct billnumber) as TotalBills
	FROM bhavani_ER_Bills A WHERE AREA = 'CHENNURU'
	AND CONVERT(varchar(10),BILLDATE,102) = CONVERT(varchar(10),'2024.07.04',102)
	GROUP BY CAST(BILLDATE AS DATE),AREA

SELECT DISTINCT AREANAME FROM Bell_Cust_Master WHERE STATUS='Active' AND AREANAME IS NOT NULL ORDER BY AREANAME


/* Tables list
select * from BELL_ItemMaster
SELECT * FROM Bell_Cust_Master WHERE AREA =''
SELECT * FROM bhavani_ER_Bills where actiondate > '28-Jun-2024' order by billid
* select distinct AREA,billdate, format(actiondate,'yyy-MM-dd') actiondate from bhavani_ER_Bills order by actiondate desc 

--need to create report with this query
**select distinct AREA,shopname,billdate from bhavani_ER_Bills where shopname like '%ABCD%' 

SELECT AREA,SHOPNAME,COUNT(SHOPNAME) FROM Bell_Cust_Master GROUP BY 
SELECT * FROM Bell_Cust_Master where shopname like '%ABCD%' 

BELL_Dummy4Report
select * from Bhavani_ER_Bills order by Actiondate desc
select * from Bell_ItemMaster
-- DELETE FROM Bell_ItemMaster

SELECT * FROM Bell_Users

INSERT INTO Bell_Users (USERNAME,PASSWORD,USERTYPE,FIRSTNAME,LASTNAME,STATUS) VALUES('GUEST_USER','4321','USER','GUEST1','GUEST1 USER','display')

UPDATE Bell_Users SET USERNAME='TEJASWINI',PASSWORD='4321',STATUS='display' WHERE ID=4
UPDATE Bell_Users SET USERNAME='SUGUNA',PASSWORD='4321',STATUS='display' WHERE ID=5
UPDATE Bell_Users SET USERNAME='SRAVANTHI',PASSWORD='4321',STATUS='display' WHERE ID=6
UPDATE Bell_Users SET USERNAME='SATWIK',PASSWORD='4321',STATUS='display' WHERE ID=7
UPDATE Bell_Users SET USERNAME='RAJU',PASSWORD='54321',STATUS='display' WHERE ID=8


--SELECT * INTO bhavani_ER_Bills_BACKUP FROM bhavani_ER_Bills
--SELECT * FROM bhavani_ER_Bills_BACKUP

Insert into Bell_ItemMaster Values()

select custid,itemname,billdate,sum(packets) totalqty from bhavani_ER_Bills where custid=409 
group by billdate,itemname,custid 

select * from Bell_Cust_Master WHERE CUSTID=209
-- delete from Bell_Cust_Master
--delete from bhavani_ER_Bills
SELECT * from bhavani_ER_Bills WHERE ITEMCODE> 0

--SPs list
BELL_GET_TOTAL_SALES_BY_AREA  NEW SP CREATED ON 11-JUN-24
USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE --crated on 22-Jun
BELL_GET_LS_ItemsByArea_Date NEW SP CREATED ON 11-JUN-24
BELL_SHOP_WISE_SALES_BY_BILLNUMBER
BELL_GET_All_Items 
USP_GET_ALL_USERS
USP_WEEKLY_SALES_REPORT 
USP_VALIDATE_USER
USP_SAVE_USER_DETAILS
USP_DELETE_USER
USP_GET_AREALIST 
Bell_GET_CustomerDetails 
Bell_SAVE_CustomerLocation 
BELL_SP_GET_All_LS_Items  
BELL_GET_LS_ItemsByDate
BELL_SP_GET_All_LS_Customers  
BELL_SP_GET_All_Customer_BILL_DETAILS
BELL_AREA_WISE_ITEM_COUNT  --NEW CREATED ON 07-07-24

BELL_INC_UPD_ITEMS_STOCK -- TO UPDATE STOCK FROM VB CODE CREATED ON 30-NOV-24
BELL_INC_UPD_LS_ITEMS_NEW  -- MODIFIED EXISTING SP BELL_INC_UPD_LS_ITEMS (TO WITHOUT DISTURB EXISTING APP)
------------------*/

--drop table bhavani_ER_Bills
--CREATE TABLE [dbo].bhavani_ER_Bills (  
--BILLID int IDENTITY(1,1) NOT NULL,
--CustID int not null,
--ITEMNAME nvarchar(30) not null,
--ITEMCODE INT,
--RATE MONEY,
--PACKETS INT,
--QTY nvarchar(10) null,
--AMOUNT MONEY,
--BILLNUMBER nvarchar(10) null,
--BILLDATE DATE,
--ActionDate datetime default SYSDATETIME()
--)

SELECT * FROM Bell_STOCK_ENTRY ORDER BY ACTIONDATE DESC

SELECT * FROM BELL_MASTERDATA

insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('PackingType','KG','KG');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('Category','Item Category','BISCUITES');
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','CAKES') ;
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','CHOCOLATES');
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','COOL DRINKS'); 
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','ECLAIRS') ;
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','NAMKEEN');
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','RAW MATERIALS');
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','SOAPS' );
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','SWEETS');
insert into BELL_MASTERDATA(ItemType,[Desc],ItemValue) values ('Category','Item Category','WAFFERS');

insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ServiceType','Vehicle Service Types','OIL CHANGE');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ServiceType','Vehicle Service Types','HUB SERVICE');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ServiceType','Vehicle Service Types','GENERAL SERVICE');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ServiceType','Vehicle Service Types','WATER WASHING');

insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('TyreServiceType','Vehicle Tyre Service Types','Wheel Alignment');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('TyreServiceType','Vehicle Tyre Service Types','Wheel Balancing (In/Out)');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('TyreServiceType','Vehicle Tyre Service Types','Powdering');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('TyreServiceType','Vehicle Tyre Service Types','Thread Patching');

insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ExpenditureType','All expenditure Types','Vehicle');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ExpenditureType','All expenditure Types','Plumber');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ExpenditureType','All expenditure Types','Electrical');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ExpenditureType','All expenditure Types','House Hold Items');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ExpenditureType','All expenditure Types','Carpainter');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ExpenditureType','All expenditure Types','Labour');
insert into BELL_MASTERDATA (ItemType,[Desc],ItemValue) values ('ExpenditureType','All expenditure Types','Other');

CREATE TABLE BELL_MASTERDATA
(ITEMID int IDENTITY(1,1) NOT NULL,
ITEMTYPE NVARCHAR(50), 
ITEMVALUE NVARCHAR(50), 
[DESC] NVARCHAR(30),
ACTIONDATE datetime default SYSDATETIME()
)

SELECT * FROM BELL_LINKED_ITEMS
--DROP TABLE BELL_LINKED_ITEMS
CREATE TABLE BELL_LINKED_ITEMS
(ID int IDENTITY(1,1) NOT NULL,
RAWMATERIAL_ID INT,
RAWMATERIAL_NAME NVARCHAR(50), 
ItemCode INT,
ItemName NVARCHAR(50), 
USERNAME NVARCHAR(30),
ACTIONDATE datetime default SYSDATETIME()
)

select * from BELL_VEHICLE_MASTER
--DROP TABLE BELL_VEHICLE_MASTER 
CREATE TABLE BELL_VEHICLE_MASTER (
VID int IDENTITY(1,1) NOT NULL,
VNAME NVARCHAR(30),
MODEL NVARCHAR(10),
VNO NVARCHAR(15),
PURCHASE_DATE DATE,
REG_DATE DATE,
CHASSIS_NO NVARCHAR(30),
ENGINE_NO NVARCHAR(20),
VEHICLE_TYPE NVARCHAR(20),
OILCHANGE_DURATION INT,
METER_READING INT,
RC NVARCHAR(20),
COST INT,
[ROUTE] NVARCHAR(30),
DRIVER NVARCHAR(30),
ENTRY_DATE DATE,
USERNAME NVARCHAR(30),
ACTIONDATE datetime default SYSDATETIME(),
ACTIVE CHAR(1) DEFAULT 'Y'
)

CREATE TABLE BELL_VEHICLE_SERVICE
(ID int IDENTITY(1,1) NOT NULL,
VNO NVARCHAR(15),
SERVICE_TYPE NVARCHAR(30), SERVICE_DATE DATE,
SERVICE_LOCATION NVARCHAR(50),
SHOWROOM NVARCHAR(30),CONTACT_PERSON NVARCHAR(20),AMOUNT INT,
METER_READING INT,DETAILS NVARCHAR(30),
USERNAME NVARCHAR(30),ACTIONDATE datetime default SYSDATETIME()
)


--ALTER TABLE bhavani_ER_Bills ALTER COLUMN BILLNUMBER INT
--ALTER TABLE bhavani_ER_Bills ADD ITEMCODE INT
--ALTER TABLE bhavani_ER_Bills ADD USERNAME VARCHAR(30)

CREATE TABLE [dbo].bhavani_ER_Bills (  
BILLID int IDENTITY(1,1) NOT NULL,
ITEMNAME nvarchar(30) not null,
ITECODE INT DEFAULT 0,
RATE MONEY,
PACKETS INT,
QTY nvarchar(10) null,
AMOUNT MONEY,
BILLNUMBER nvarchar(10) null,
BILLDATE DATE,
AREA nvarchar(30) null,
SHOPNAME nvarchar(50) null,
USERNAME VARCHAR(30),
ActionDate datetime default SYSDATETIME()
)

CREATE TABLE [dbo].Bell_Dummy4Report (  
ID int IDENTITY(1,1) NOT NULL,
ITEMNAME nvarchar(30) not null,
RATE MONEY,
TOTALPAK INT,
TOTALVAL MONEY,
RETPAK INT,
RETVAL MONEY,
DAMPAK INT,
DAMVAL MONEY,
SALEPAK INT,
SALEVAL MONEY,
COMPVAL MONEY,
NETVAL MONEY
)

go
select * from Bell_Cust_Master where username like '%Raju%'
-- drop table Bell_Cust_Master
--alter table Bell_Cust_Master add USERNAME VARCHAR(20)
--alter table Bell_Cust_Master add CustID int null
--alter table Bell_Cust_Master add LINE VARCHAR(50)
CREATE TABLE [dbo].Bell_Cust_Master (  
ID int IDENTITY(1,1) NOT NULL,
CustID int not null,  --is primary key from VB6 tblCustomers
AREA nvarchar(30) not null,
ShopName nvarchar(50) not null,
CustomerName nvarchar(30) null,
Mobile nvarchar(25) null,
SALESMAN nvarchar(30) null,
ActionDate datetime default SYSDATETIME(),
LandMark nvarchar(50) null, -- not required in VB6
Lat nvarchar(25) null,
Lng nvarchar(25) null,
status nvarchar(8) default 'Active'
)

alter table Bell_STOCK_ENTRY add BILLDATE DATETIME
SELECT * FROM BELL_LS ORDER BY ACTIONDATE DESC
5 MONTHS = 88255 RECORDS

alter table Bell_STOCK_ENTRY add TRANS_TYPE VARCHAR(10)
alter table Bell_STOCK_ENTRY add PARTYNAME VARCHAR(30)

select * from Bell_STOCK_ENTRY ORDER BY ACTIONDATE DESC

--DROP TABLE Bell_STOCK_ENTRY
CREATE TABLE [dbo].Bell_STOCK_ENTRY (  
TRANSID int IDENTITY(1,1) NOT NULL,
ITEMCODE INT DEFAULT 0,
ITEMNAME nvarchar(50) not null,
STOCK INT,
TRANS_TYPE VARCHAR(10), -- 'IN' for credit 'OUT' for debit.
QTY nvarchar(12),
USERNAME VARCHAR(30),
MinOrderAlert INT,
ActionDate datetime default SYSDATETIME()
)

-- drop table Bell_ItemMaster
Update Bell_ItemMaster set MinOrderAlert=100, CATEGORY='SOAPS',ItemCode=350,ItemName='180 GMS SOAP 10/-',Rate1=7.33 ,Rate2=7.33 ,Rate3=7.33,MRP=600.00 ,PackingType='Carton',TotalItemsInPack=60 Where ItemCode=350 AND ITEMNAME='180 GMS SOAP 10/-'

-- Update Bell_Itemmaster set Manufacture='Trade' where Category in ('CHOCOLATES','COOL DRINKS','WAFFERS','SOAPS','ECLAIRS','RAW MATERIALS')

SELECT * FROM Bell_ItemMaster WHERE ITEMNAME LIKE '%SOAP%'
SELECT * FROM Bell_ItemMaster where manufacture is not null
--alter table Bell_ItemMaster add ActionDate datetime default SYSDATETIME()
SELECT * FROM BELL_ItemMaster where stock > 0
--ALTER TABLE BELL_ItemMaster add STOCK INT DEFAULT 0
--ALTER TABLE BELL_ItemMaster ADD USERNAME VARCHAR(30)
ALTER TABLE BELL_ItemMaster ADD MinOrderAlert INT
ALTER TABLE BELL_ITEMMASTER  ADD PRATE MONEY

  ALTER TABLE BELL_ITEMMASTER  ADD Manufacture nvarchar(15)

CREATE TABLE [dbo].Bell_ItemMaster (  
ITEMID int IDENTITY(1,1) NOT NULL,
ITEMCODE int,
ItemName nvarchar(50) not null,
Rate1 money,
RATE2 money,
RATE3 money,
PACKINGTYPE varchar(15),
MRP money,
CATEGORY nvarchar(30),
STOCK INT DEFAULT 0,
TOTALITEMSINPACK int,
USERNAME VARCHAR(30),
MinOrderAlert INT,
Manufacture nvarchar(15),
PRATE MONEY,
STATUS nvarchar(8) default 'Active',
ActionDate datetime default SYSDATETIME()
)

-- DROP TABLE Bell_LS 
CREATE TABLE [dbo].Bell_LS (  
ID int IDENTITY(1,1) NOT NULL,
BILLDATE datetime,
AREA NVARCHAR(50),
ITEMCODE int,
ItemName nvarchar(50) not null,
Rate money,
T_B INT,
R_B INT,
D_B INT,
QTY nvarchar(12),
ActionDate datetime default SYSDATETIME(),
USERNAME NVARCHAR(30)
)

--alter table BELL_LS ALTER column T_B FLOAT
--alter table BELL_LS ALTER column R_B FLOAT


-- drop table Bell_Users  
select * from Bell_Users  
CREATE TABLE [dbo].Bell_Users (  
id int IDENTITY(1,1) NOT NULL,
username nvarchar(20) not null,
password nvarchar(20) not null,
usertype nvarchar(10) not null, -- Admin/user/superuser
firstname nvarchar(20) null,
lastname nvarchar(20) null,
status nvarchar(8) default 'Active',
ActionDate datetime default SYSDATETIME()
)
-------------------------
SELECT * from bhavani_ER_Bills WHERE AREA='BAYYARAM'
and (BILLDATE BETWEEN CONVERT(nvarchar(10),'2024-11-01',101) AND CONVERT(nvarchar(10),'2024-11-05',101))

	 select SHOPNAME,ISNULL(SUM(AMOUNT),0) TOTAL_AMOUNT from bhavani_ER_Bills
	  WHERE AREA='chennuru' and SHOPNAME = (case lower('ALL') when 'all' then SHOPNAME ELSE 'ALL' END)
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'2024-07-01',101) AND CONVERT(nvarchar(10),'2024-07-15',101))  
  GROUP BY SHOPNAME,AREA HAVING SUM(AMOUNT) > 10000
  order by SHOPNAME

 select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,billnumber,ISNULL(SUM(AMOUNT),0) AMOUNT from bhavani_ER_Bills
  WHERE AREA='chennuru' and SHOPNAME = (case lower('ALL') when 'all' then SHOPNAME ELSE 'ALL' END)
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'2024-07-03',101) AND CONVERT(nvarchar(10),'2024-07-05',101))
  GROUP BY BILLDATE,BILLNUMBER,AREA order by convert(int,billnumber)

  SELECT * from bhavani_ER_Bills WHERE USERNAME IS NULL  

  SELECT * FROM bhavani_ER_Bills WHERE AREA='BAYYARAM' 

-- BELL_SHOP_WISE_TOTAL_SALES 'BAYYARAM','all','2024-11-01','2024-11-20',1000
-- BELL_SHOP_WISE_TOTAL_SALES 'ASIFABAD','all','2024-07-01','2024-07-20',10000
ALTER PROCEDURE BELL_SHOP_WISE_TOTAL_SALES  
@AREA AS NVARCHAR(20),  
@SHOP AS NVARCHAR(20),  
@BILLDATE1 AS DATE,  
@BILLDATE2 AS DATE,  
@AMOUNT AS INT  
AS  
BEGIN   
  --select SHOPNAME,ISNULL(SUM(AMOUNT),0) AMOUNT from bhavani_ER_Bills  
  --WHERE AREA=@AREA and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)  
  --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
  --GROUP BY SHOPNAME,AREA HAVING SUM(AMOUNT) >= @AMOUNT  order by SHOPNAME  

	--DECLARE @Bell_TEMP_REPORT AS TABLE(BILLDATE VARCHAR(20), NAME VARCHAR(50),QTY INT)
	DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)
	--DECLARE @TEMP_REPORT AS TABLE (@BILLDATE VARCHAR(15),@ITEMNAME VARCHAR(50),@QTY INT)

  CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), SHOPNAME VARCHAR(100),AMOUNT DECIMAL(12,2))

  Insert into #TEMP_REPORT
  select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,SHOPNAME
  --,ISNULL(SUM(AMOUNT),0) AMOUNT
  ,CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT
  from bhavani_ER_Bills WHERE AREA=@AREA and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
  GROUP BY BILLDATE,SHOPNAME,AREA HAVING SUM(ISNULL(AMOUNT,0)) > 0 AND  SUM(ISNULL(AMOUNT,0)) >= @AMOUNT  order by SHOPNAME  

  --Select * from #TEMP_REPORT --order by shopname desc
  DELETE FROM Bell_REPORT_HEADER
	INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT   --(STORING BILLDATE INTO SHOPNAME COL)

	select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'
				   from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')

	set @query = 'SELECT * from (select * from #TEMP_REPORT '  
				+' ) x pivot (AVG(AMOUNT) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') )  p'
  PRINT @query
  exec sp_executesql @query;
end   
GO
  --BELL_SHOP_WISE_SALES_BY_BILLNUMBER
-- BELL_SHOP_WISE_SALES_BY_BILLNUMBER 'BILLWISE','BAYYARAM ','all','2024-11-01','2024-11-25'
-- BELL_SHOP_WISE_SALES_BY_BILLNUMBER 'BILLWISE','ASIFABAD','all','2024-07-01','2024-07-16'
-- BELL_SHOP_WISE_SALES_BY_BILLNUMBER 'BILLWISE','CHENNURU ','all','2024-07-04','2024-07-05'
ALTER PROCEDURE BELL_SHOP_WISE_SALES_BY_BILLNUMBER
@HEADER AS NVARCHAR(20),
@AREA AS NVARCHAR(20),
@SHOP AS NVARCHAR(20),
@BILLDATE1 AS DATE,
@BILLDATE2 AS DATE
AS
BEGIN

--DECLARE @Bell_TEMP_REPORT AS TABLE(BILLDATE VARCHAR(20), NAME VARCHAR(50),QTY INT)
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)
--DECLARE @TEMP_REPORT AS TABLE (@BILLDATE VARCHAR(15),@ITEMNAME VARCHAR(50),@QTY INT)

--DELETE FROM Bell_TEMP_REPORT
DELETE FROM Bell_REPORT_HEADER

CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), BILLNUMBER INT,QTY DECIMAL(12,2))
--CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), BILLNUMBER INT, SHOPNAME VARCHAR(100),QTY INT)

Insert into #TEMP_REPORT
  select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,BILLNUMBER
  --,ISNULL(SUM(AMOUNT),0) AMOUNT
  ,CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT
  from bhavani_ER_Bills
  WHERE AREA=@AREA and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
  GROUP BY BILLDATE,BILLNUMBER,AREA order by BILLNUMBER
  --select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,BILLNUMBER,SHOPNAME,
  --ISNULL(SUM(AMOUNT),0) AMOUNT from bhavani_ER_Bills
  --WHERE AREA=@AREA and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)
  --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
  --GROUP BY BILLDATE,BILLNUMBER,SHOPNAME,AREA order by BILLNUMBER

--Select * from #TEMP_REPORT --order by shopname desc

INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT 

select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'
                    from Bell_REPORT_HEADER group by HEADER_NAME
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')

set @query = 'SELECT * from (select * from #TEMP_REPORT '  
	+' ) x pivot (SUM(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) p '

PRINT @query
exec sp_executesql @query;
end
Go

SELECT STRING_AGG(USERNAME , ',' ) AS XYLIST FROM bhavani_ER_Bills 
WHERE AREA='LAXETPETA' and BILLDATE = CONVERT(nvarchar(10),'2024-07-23')

select DISTINCT USERNAME FROM bhavani_ER_Bills WHERE AREA='LAXETPETA' and BILLDATE = CONVERT(nvarchar(10),'2024-07-23')

-- BELL_GET_OPERATOR_NAME 'MADIKONDA','2024-07-23'
-- BELL_GET_OPERATOR_NAME 'LAXETPETA','2024-07-23'
ALTER PROCEDURE BELL_GET_OPERATOR_NAME
@AREA AS NVARCHAR(50),
@BILLDATE1 AS DATE
AS
BEGIN
    CREATE TABLE dbo.#Temp_Username (USERNAME VARCHAR(500))
    INSERT INTO #Temp_Username
    select distinct USERNAME FROM bhavani_ER_Bills WHERE AREA=@AREA and BILLDATE = CONVERT(nvarchar(10),@BILLDATE1,101)

    SELECT ISNULL(STRING_AGG(USERNAME , ',' ),'') AS USERNAME FROM #Temp_Username
END
GO

select  CONVERT(varchar(20),DATEADD(wk, DATEDIFF(wk, 6, '1/1/' + CAST(DATEPART(YY, '2024-Dec-21') AS CHAR(4))) + (DatePart(week, '2024-Dec-21')-1), 6),6)

 select * from bhavani_ER_Bills where BILLDATE='2024-Dec-29'
 and  AREA='BAYYARAM'  

-- USP_GetWeekDaysLineCount '29-sEP-2024','ALL'  
-- USP_GetWeekDaysLineCount '29-Dec-2024','BAYYARAM'  
CREATE procedure USP_GetWeekDaysLineCount  
@WeekDate date,  
@Area varchar(100)  
AS  
BEGIN  
 ;WITH CTE_AREAS (AREA)  
 AS (  
 select distinct area from bhavani_ER_Bills where   
 CONVERT(varchar(20),DATEADD(wk, DATEDIFF(wk, 6, '1/1/' + CAST(DATEPART(YY, BILLDATE) AS CHAR(4))) + (DatePart(week, BILLDATE)-1), 6),6) =  
 CONVERT(varchar(20),DATEADD(wk, DATEDIFF(wk, 6, '1/1/' + CAST(DATEPART(YY, BILLDATE) AS CHAR(4))) + (DatePart(week, @WeekDate)-1), 6),6)    
 AND AREA=(case lower(@AREA) when 'all' then AREA ELSE @AREA END)  
 )  
 SELECT COUNT(1) FROM CTE_AREAS  
END
GO

--**NEW SP BELL_SHOP_WISE_SALES_BY_BILLNUMBER CREATED FOR BILLWISE (BELL_SHOP_WISE_SALES_BY_BILLNUMBER)
--SELECT CAST(9900/100.0 AS DECIMAL(12,2))
--SELECT CAST(20669/100.00 AS DECIMAL(10,2))
--SELECT FORMAT(2.3382232,'N2')

--SELECT CAST(9900/100.0 AS DECIMAL(12,2))  
--SELECT CAST(20669/100.00 AS DECIMAL(10,2))  
--SELECT FORMAT(2.3382232,'N2')  
--SELECT FORMAT(2,'N2')  
  
-- USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE 'ITEMWISE','BAYYARAM','all','2024-10-01','2024-11-30'  
-- USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE 'ITEMWISE','BAYYARAM','all','2024-11-01','2024-11-30'  
-- USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE 'ITEMWISE','ALL','all','2024-11-01','2024-11-30'  
-- USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE 'ITEMWISE','BELLAMPALLY','all','2024-10-10','2024-11-10'  
-- USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE 'SHOPWISE','BELLAMPALLY','all','2024-10-04','2024-11-05'  
ALTER PROCEDURE USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE   
@HEADER AS NVARCHAR(20),  
@AREA AS NVARCHAR(60),  
@SHOP AS NVARCHAR(100),  
@BILLDATE1 AS DATE,  
@BILLDATE2 AS DATE  
AS  
BEGIN  
  
--DECLARE @Bell_TEMP_REPORT AS TABLE(BILLDATE VARCHAR(20), NAME VARCHAR(50),QTY INT)  
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)  
  
--DECLARE @TEMP_REPORT AS TABLE(BILLDATE VARCHAR(20), NAME VARCHAR(100),QTY INT)  
--DELETE FROM Bell_TEMP_REPORT  
DELETE FROM Bell_REPORT_HEADER  
  
IF @HEADER = 'SHOPWISE'  
BEGIN  
 CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), NAME VARCHAR(100),QTY DECIMAL(12,2))  
   
  Insert into #TEMP_REPORT  
  select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,SHOPNAME  
  --,ISNULL(SUM(AMOUNT),0) AMOUNT   
  ,CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT  
  from bhavani_ER_Bills  
  WHERE AREA=@AREA and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)  
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
  GROUP BY BILLDATE,SHOPNAME,AREA order by SHOPNAME  
  
   --Select * from #TEMP_REPORT --order by shopname desc  
 INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT   --(STORING BILLDATE INTO SHOPNAME COL)  
  
 select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
       from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')  
  
 set @query = 'SELECT * from (select * from #TEMP_REPORT '    
    +' ) x pivot (AVG(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') )  p'  
  PRINT @query  
  exec sp_executesql @query;  
END  
IF @HEADER = 'SHOPWISEWITHBILL'  
BEGIN  
 CREATE TABLE dbo.#TEMP_REPORT1 (BILLDATE VARCHAR(20), NAME VARCHAR(100),QTY DECIMAL(12,2))  
  
  Insert into #TEMP_REPORT1  
  select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE  
  ,(convert(nvarchar(5),BILLNUMBER) + ' - ' + SHOPNAME) as SHOPNAME  
  --,ISNULL(SUM(AMOUNT),0) AMOUNT   
  ,CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT  
  from bhavani_ER_Bills WHERE AREA=@AREA and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)  
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))    
  GROUP BY BILLDATE,BILLNUMBER,SHOPNAME,AREA order by convert(int,BILLNUMBER)  
  
   --Select * from #TEMP_REPORT1 --order by shopname desc  
 INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT1   --(STORING BILLDATE INTO SHOPNAME COL)  
  
 select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
       from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')  
  
 set @query = 'SELECT * from (select * from #TEMP_REPORT1'    
    +' ) x pivot (SUM(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) p'  
  
  PRINT @query  
  exec sp_executesql @query;  
END  
IF @HEADER = 'SHOPWISEWITHOUTBILL'  
BEGIN  
 CREATE TABLE dbo.#TEMP_SHOPWISEWITHOUTBILL (BILLDATE VARCHAR(20), NAME VARCHAR(100),QTY DECIMAL(12,2))  
  
  Insert into #TEMP_SHOPWISEWITHOUTBILL  
  select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,SHOPNAME    
  --,ISNULL(SUM(AMOUNT),0) AMOUNT   
  ,CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT  
  from bhavani_ER_Bills  
  WHERE AREA=@AREA and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)  
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
  GROUP BY BILLDATE,SHOPNAME,AREA order by SHOPNAME   
  
   --Select * from #TEMP_SHOPWISEWITHOUTBILL --order by shopname desc  
 INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_SHOPWISEWITHOUTBILL   --(STORING BILLDATE INTO SHOPNAME COL)  
  
 select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
       from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')  
  
 set @query = 'SELECT * from (select * from #TEMP_SHOPWISEWITHOUTBILL'    
    +' ) x pivot (SUM(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) p'  
  
  PRINT @query  
  exec sp_executesql @query;  
END  
  
IF @HEADER = 'ITEMWISE'  
BEGIN  
  CREATE TABLE dbo.#TEMP_REPORT_ITEMWISE (BILLDATE VARCHAR(20), NAME VARCHAR(100),ITEMCODE INT,QTY decimal(12,2))  
  CREATE TABLE dbo.#TEMP_REPORT2 (BILLDATE VARCHAR(20), NAME VARCHAR(100),ITEMCODE INT,QTY INT)  
  CREATE TABLE dbo.#TEMP_REPORT3 (BILLDATE VARCHAR(20), NAME VARCHAR(100),ITEMCODE INT,QTY INT)  
  
  --IF OBJECT_ID (N'TEMP_DYNAMIC_REPORT2', N'U') IS NOT NULL  
  --BEGIN  
  --  DROP TABLE TEMP_DYNAMIC_REPORT2  
  --  DROP TABLE TEMP_DYNAMIC_REPORT3  
  --END  
  DECLARE @datecol datetime = GETDATE();  
  DECLARE @WeekNum INT, @YearNum char(4);  
  
  SELECT @WeekNum = DATEPART(WK, @datecol), @YearNum = CAST(DATEPART(YY, @datecol) AS CHAR(4));  
    
  --FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,  
  Insert into #TEMP_REPORT_ITEMWISE  
  select CONVERT(varchar(20),DATEADD(wk, DATEDIFF(wk, 6, '1/1/' + CAST(DATEPART(YY, BILLDATE) AS CHAR(4))) + (DatePart(week, BILLDATE)-1), 6),6) AS StartOfWeek,  
  ITEMNAME,ISNULL(ITEMCODE,0), CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT from bhavani_ER_Bills  
  WHERE AREA=(case lower(@AREA) when 'all' then AREA ELSE @AREA END) and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)  
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
  GROUP BY BILLDATE,ITEMNAME,AREA,ITEMCODE order by ITEMCODE  
  
  --SELECT * FROM #TEMP_REPORT_ITEMWISE   
     
  set @query = N' INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT_ITEMWISE '   
  EXEC sp_executesql @query    
   
  select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'     
   from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')    
  
 --INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT_ITEMWISE  
 --select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
 --from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')      
  
 set @query = 'SELECT * INTO TEMP_DYNAMIC_REPORT2 from (select * from #TEMP_REPORT_ITEMWISE '    
            +' ) x pivot (SUM(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) pv1 '  
  
   PRINT @query  
   exec sp_executesql @query;  
  
  --select * from Bell_REPORT_HEADER  
  --select * from TEMP_DYNAMIC_REPORT2  
  
  delete from #TEMP_REPORT_ITEMWISE  
  --CREATE TABLE dbo.#TEMP_REPORT_ITEMWISE2 (BILLDATE VARCHAR(20),NAME VARCHAR(100),ITEMCODE INT,QTY INT)  
  --Delete from #TEMP_REPORT_ITEMWISE2   
    
  --FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,  
  Insert into #TEMP_REPORT_ITEMWISE  
  select CONVERT(varchar(20),DATEADD(wk, DATEDIFF(wk, 6, '1/1/' + CAST(DATEPART(YY, BILLDATE) AS CHAR(4))) + (DatePart(week, BILLDATE)-1), 6),6) AS StartOfWeek,  
  ITEMNAME,ISNULL(ITEMCODE,0),ISNULL(SUM(PACKETS),0) PACKETS from bhavani_ER_Bills  
  WHERE AREA=(case lower(@AREA) when 'all' then AREA ELSE @AREA END) and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)  
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
  GROUP BY BILLDATE,ITEMNAME,AREA,ITEMCODE order by ITEMCODE  
   
 set @query = 'SELECT * INTO TEMP_DYNAMIC_REPORT3 from (select * from #TEMP_REPORT_ITEMWISE '    
   +' ) x pivot (SUM(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) pv2 '              
  
        --TODO: NEED TO COMBINE THESE TWO TABLES INTO ONE IN API CODE.  
PRINT @query  
exec sp_executesql @query;  
--select * from TEMP_DYNAMIC_REPORT3  
  
set @query = 'SELECT A.NAME,' + REPLACE(REPLACE(@cols,'[[','A.['),']]',']') + ',' + REPLACE(REPLACE(@cols,'[[','B.['),']]','] AS QTY') + ' FROM TEMP_DYNAMIC_REPORT2 A '  
   +' INNER JOIN TEMP_DYNAMIC_REPORT3 B ON A.NAME=B.NAME AND A.ITEMCODE=B.ITEMCODE ORDER BY A.ITEMCODE'  
PRINT @query  
exec sp_executesql @query;  
    
END  
  
end  
Go

--** this can be deleted as we have generic SP USP_SHOP_WISE_SALES_COUNT_BY_BILLDATE
-- USP_ITEMS_WISE_SALES_COUNT_BY_BILLDATE 'NIRMAL','all','2024-07-02','2024-07-09'
alter PROCEDURE USP_ITEMS_WISE_SALES_COUNT_BY_BILLDATE
@AREA AS NVARCHAR(20),
@SHOP AS NVARCHAR(20),
@BILLDATE1 AS DATE,
@BILLDATE2 AS DATE
AS
BEGIN

DECLARE @TEMP_TABLE AS TABLE(HEADER_NAME DATE)
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)
--DECLARE @TEMP_REPORT AS TABLE (@BILLDATE VARCHAR(15),@ITEMNAME VARCHAR(50),@QTY INT)

DELETE FROM Bell_TEMP_REPORT
DELETE FROM Bell_REPORT_HEADER

Insert into Bell_TEMP_REPORT
select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A 
--INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID 
WHERE A.AREA=@AREA and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)
and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
GROUP BY A.BILLDATE,A.ITEMNAME,A.AREA order by a.billdate

--Select * from Bell_TEMP_REPORT order by shopname desc
--SELECT * FROM Bell_REPORT_HEADER

INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT SHOPNAME FROM Bell_TEMP_REPORT   --(STORING BILLDATE INTO SHOPNAME COL)
--INSERT INTO @TEMP_TABLE SELECT DISTINCT FORMAT(SHOPNAME, 'dd-MMM-yy') as BILLDATE FROM Bell_TEMP_REPORT

--*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE
select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'
                    from Bell_REPORT_HEADER
                    group by HEADER_NAME --order by HEADER_NAME
            FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)') 
        ,1,1,'')

set @query = N'SELECT * from (select * from Bell_TEMP_REPORT ) x 
            pivot (AVG(QTY) for SHOPNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) p '
PRINT @query
exec sp_executesql @query;
end
Go


select * from Bell_Cust_Master where shopname=''
--update Bell_Cust_Master set shopname=customername where shopname=''
select * from Bell_Cust_Master where custid=135

--DROP TABLE Bell_TEMP_REPORT
--CREATE TABLE [dbo].Bell_TEMP_REPORT (ID int IDENTITY(1,1) NOT NULL, SHOPNAME  VARCHAR(50), MNAME  VARCHAR(50),QTY INT)
CREATE TABLE [dbo].Bell_TEMP_REPORT (SHOPNAME  VARCHAR(50), ITEMNAME  VARCHAR(50),QTY INT)
CREATE TABLE [dbo].Bell_ITEMNAMES (ITEMNAME  VARCHAR(50))
/*
https://www.geeksforgeeks.org/sql-query-to-convert-rows-to-columns-in-sql-server/

https://stackoverflow.com/questions/15745042/efficiently-convert-rows-to-columns-in-sql-server
https://www.c-sharpcorner.com/UploadFile/ee01e6/different-way-to-convert-datatable-to-list/
private List<MyObj> test(DataTable dt)
{
       
    var convertedList = (from rw in dt.AsEnumerable()
        select new MyObj() 
        {
            ID = Convert.ToInt32(rw["ID"]),
            Name = Convert.ToString(rw["Name"])
        }).ToList();

    return convertedList;
}
*/
select  STUFF((SELECT ',' + '['+ QUOTENAME(ITEMNAME) + ']'
                    from Bell_TEMP_REPORT group by ITEMNAME,SHOPNAME order by ITEMNAME
            FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') 
        ,1,1,'')

  Select DISTINCT AREA,ITEMNAME,ITEMCODE,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills
	WHERE (BILLDATE BETWEEN CONVERT(nvarchar(10),'08/20/2024',101) AND CONVERT(nvarchar(10),'08/30/2024',101))
  AND ISNULL(ITEMCODE,0) > 0 	GROUP BY AREA,ITEMNAME,ITEMCODE ORDER BY ITEMCODE

--DROP FUNCTION dbo.GET_HEADER_ITEMNAMES
--SELECT dbo.GET_HEADER_ITEMNAMES(2) as header
ALTER FUNCTION dbo.GET_HEADER_ITEMNAMES(@input int)
RETURNS VARCHAR(MAX)
AS
BEGIN
DECLARE db_cursor CURSOR FOR 
--select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
		--					from #TEMP_HEADER  
		--					group by HEADER_NAME 
		--			FOR XML PATH(''), TYPE  
		--			).value('.', 'NVARCHAR(MAX)')   
		--		,1,1,'')    
SELECT ITEMNAME FROM Bell_ItemMaster WHERE STATUS='Active' order by itemcode
DECLARE @itemname VARCHAR(50)
DECLARE @cols AS NVARCHAR(MAX)
DECLARE @CNT AS INT
OPEN db_cursor  
FETCH NEXT FROM db_cursor INTO @itemname
set @cols = ''
SET @CNT = 0
WHILE @@FETCH_STATUS = 0  
BEGIN  
	IF @CNT = 0 	
	BEGIN
		set @cols = '[[' + @itemname + ']]'
	END
	ELSE
	BEGIN
		set @cols = @cols + ',' + '[[' + @itemname + ']]'
	END
	SET @CNT  = @CNT +1
	
    FETCH NEXT FROM db_cursor INTO @itemname 
END 
CLOSE db_cursor  
DEALLOCATE db_cursor
RETURN @cols
END
GO

select DISTINCT AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills
	 WHERE ITEMNAME = (case lower('ALL') when 'all' then ITEMNAME ELSE 'ALL' END)
	 and (BILLDATE BETWEEN CONVERT(nvarchar(10),'2024-08-20',101) AND CONVERT(nvarchar(10),'2024-09-30',101))  AND AREA in ('BELLAMPALLY','BAYYARAM','ETURNAGARAM')
   --and itemname='DATES COCONUT 5/-'
   --'MILK KOVA 5 RS'
  AND ISNULL(ITEMCODE,0) > 0 GROUP BY AREA,ITEMNAME  order by itemname 

  /*** split date to weekly report
DECLARE @datecol datetime = GETDATE();
DECLARE @WeekNum INT
      , @YearNum char(4);

SELECT @WeekNum = 46 --DATEPART(WK, @datecol)
     , @YearNum = CAST(DATEPART(YY, @datecol) AS CHAR(4));

-- once you have the @WeekNum and @YearNum set, the following calculates the date range.
SELECT CONVERT(varchar(50),DATEADD(wk, DATEDIFF(wk, 6, '1/1/' + @YearNum) + (@WeekNum-1), 6),101) AS StartOfWeek;
SELECT DATEADD(wk, DATEDIFF(wk, 5, '1/1/' + @YearNum) + (@WeekNum-1), 5) AS EndOfWeek;
*/
--***-- it has dynamic cols and mulitiple Areas selected condition.

--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'byarea','[BELLAMPALLY],[BAYYARAM],[ETURNAGARAM]','ALL','ALL','2024-Nov-20','2024-Nov-30'  
--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'returns','[BELLAMPALLY]','ALL','ALL','11/01/2024','11/30/2024'  
--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'byshop','[BELLAMPALLY],[BAYYARAM]','ALL','ALL','2024-Aug-20','2024-Aug-30'  
--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'bydate','All','ALL','moong dal 5 RS','2024-Sep-16','2024-Sep-22'  
--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'showlineswithnosales','All','ALL','moong dal 5 RS','2024-Sep-16','2024-Sep-22'  
--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'bydate','ALL','ALL','ALL','2024-Aug-20','2024-Aug-30'
ALTER PROCEDURE USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME
@TYPE AS NVARCHAR(20),      
@AREA AS NVARCHAR(max),      
@SHOP AS NVARCHAR(50),      
@ITEMNAME AS nVARCHAR(max),    
@BILLDATE1 AS DATE,      
@BILLDATE2 AS DATE      
AS      
BEGIN      
      
--DECLARE @TEMP_TABLE AS TABLE(SHOPNAME  VARCHAR(50), ITEMNAME  VARCHAR(50),QTY INT)      
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)      
Declare @script as NVARCHAR(MAX)    
Declare @query2 as NVARCHAR(MAX)    
      
--CREATE TABLE Bell_REPORT_HEADER (HEADER_NAME  VARCHAR(100))
--CREATE TABLE Bell_REPORT_HEADER_BILLDATE (HEADER_NAME  DATE)      
--DROP TABLE Bell_REPORT_HEADER    
DELETE FROM Bell_TEMP_REPORT      
DELETE FROM Bell_REPORT_HEADER      
set @query2 = ''    
IF lower(@TYPE) = 'byarea' -- AND lower(@SHOP) = 'all' AND lower(@ITEMNAME) = 'all'    
BEGIN    
    
 CREATE TABLE dbo.#TEMP_REPORT2 (AREA VARCHAR(50),ITEMCODE INT,ITEMNAME VARCHAR(50),QTY INT)    
     
 -- Insert into #TEMP_REPORT2     
 --select DISTINCT AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills       
 --WHERE AREA in (case lower(@AREA) when 'all' then AREA ELSE replace(@AREA,'[','''') END) and     
 --ITEMNAME in (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE replace(@ITEMNAME,'[','''') END)    
 --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))    
 -- AND ISNULL(ITEMCODE,0) > 0    
 --GROUP BY AREA,ITEMNAME      
  if lower(@AREA) <> 'all'    
  begin    
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '    
  end    
    
 set @script = N' Insert into #TEMP_REPORT2    
  select DISTINCT AREA,ITEMCODE,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills    
  WHERE ITEMNAME = (case lower('''+ @ITEMNAME +''') when ''all'' then ITEMNAME ELSE ''' + @ITEMNAME +''' END)    
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2    
  + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY AREA,ITEMCODE,ITEMNAME '    
    
  --print @script    
  EXEC sp_executesql @script    
  --SELECT * FROM #TEMP_REPORT2 order by ITEMCODE    
    
  CREATE TABLE dbo.#TEMP_HEADER (HEADER_NAME VARCHAR(50))    
    
   if (select count(1) from #TEMP_REPORT2) > 0     
   BEGIN    
    --PRINT 'RECORDS EXISTS'    
    INSERT INTO #TEMP_HEADER SELECT DISTINCT AREA FROM #TEMP_REPORT2       
    --select * from #TEMP_HEADER    

    ----*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE    
    select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']' from #TEMP_HEADER group by HEADER_NAME 
	FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,'') 
      
    --select @cols=dbo.GET_HEADER_ITEMNAMES(2)    
    --PRINT @cols    
    --set @query = N'SELECT * from (select distinct * from #TEMP_REPORT2 ) x       
      -- pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) P ORDER BY AREA'
	--ITEMCODE,ITEMNAME,AREA,QTY
   set @query = N'SELECT * from (select * from #TEMP_REPORT2 ) x       
       pivot (sum(QTY) for AREA in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) P ORDER BY ITEMCODE'
   PRINT @query      
   exec sp_executesql @query;      
   END    
END    
else IF lower(@TYPE) = 'bydate'    
BEGIN    
    
 CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), AREA VARCHAR(50),NAME VARCHAR(50),QTY INT)    
 if lower(@AREA) <> 'all'    
  begin    
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '    
  end    
    
 set @script = N' Insert into #TEMP_REPORT    
  select FORMAT(BILLDATE, ''dd-MMM-yy'') as BILLDATE,AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills    
  WHERE ITEMNAME = '''+ @ITEMNAME +'''     
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2    
  + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY BILLDATE,Area,ITEMNAME order by AREA'    
    
 print @script    
 EXEC sp_executesql @script    
    
 INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT   --(STORING BILLDATE INTO SHOPNAME COL)    
    
 --*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE    
 select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']' from Bell_REPORT_HEADER    
      group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)') ,1,1,'')    
    
 set @query = 'SELECT * from (select * from #TEMP_REPORT '      
    +' ) x pivot (SUM(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) p '    
 --PRINT @query    
 exec sp_executesql @query;    
END    
else IF lower(@TYPE) = 'showlineswithnosales'    
BEGIN    
     
 if lower(@AREA) <> 'all'    
  begin    
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '    
  end    
       
 set @script = N' select distinct Line from Bell_Cust_Master where Line not in (    
  select AREA from bhavani_ER_Bills WHERE ITEMNAME = '''+ @ITEMNAME +'''     
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2    
  + ') and line <> '''' and area <> '''' and line <> ''ABCD-AREA'' order by Line'    
    
 print @script    
 EXEC sp_executesql @script    
    
END    
    
else IF lower(@TYPE) = 'byshop'    
BEGIN    
 --Insert into Bell_TEMP_REPORT      
 --select ShopName,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A       
 ----INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID       
 --WHERE A.AREA=@AREA and A.SHOPNAME = (case lower(@SHOP) when 'all' then A.SHOPNAME ELSE @SHOP END)      
 --and ITEMNAME = (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE @ITEMNAME END)      
 --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))      
 --GROUP BY A.ITEMNAME,A.ShopName      
    
 if lower(@AREA) <> 'all'    
  begin    
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '    
  end    
    
 set @script = N' Insert into Bell_TEMP_REPORT    
  select ShopName,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A     
  WHERE ITEMNAME = (case lower('''+ @ITEMNAME +''') when ''all'' then ITEMNAME ELSE ''' + @ITEMNAME +''' END)    
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2    
  + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY ShopName,ITEMNAME '    
    
 --print @script    
 EXEC sp_executesql @script    
    
 if (select count(1) from Bell_TEMP_REPORT) > 0     
 BEGIN      
  INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT ITEMNAME FROM Bell_TEMP_REPORT      
      
  --*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE      
  select @cols=dbo.GET_HEADER_ITEMNAMES(2)    
  --select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'      
  --   from Bell_REPORT_HEADER  group by HEADER_NAME order by HEADER_NAME      
  --   FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,'')      
      
  set @query = N'SELECT * from (select * from Bell_TEMP_REPORT ) x       
     pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) p '      
  --PRINT @query      
  exec sp_executesql @query;      
 END      
 ELSE    
 BEGIN    
  PRINT 'NO RECORDS'    
  --select * from Bell_TEMP_REPORT    
  select @SHOP AS SHOPNAME,'NO RECORDS FOUND' AS ITEMNAME    
 END    
END    
else IF lower(@TYPE) = 'returns' -- for items return %    
  BEGIN      
   
    --CREATE TABLE dbo.#TEMP_REPORT_RETURNS (AREA VARCHAR(50), BILLDATE VARCHAR(20),ITEMNAME VARCHAR(100),TOT_QTY INT,RET_QTY INT)  
    --CREATE TABLE dbo.#TEMP_REPORT_RETURNS2 (AREA VARCHAR(50), BILLDATE VARCHAR(20),ITEMNAME VARCHAR(100),TOT_QTY INT,RET_QTY INT,RET_PERCENT INT)  
 IF OBJECT_ID (N'TEMP_REPORT_RETURNS1', N'U') IS NOT NULL  
 BEGIN  
  DROP TABLE TEMP_REPORT_RETURNS1  
 END  
 IF OBJECT_ID (N'TEMP_REPORT_RETURNS2', N'U') IS NOT NULL  
 BEGIN  
  DROP TABLE TEMP_REPORT_RETURNS2  
 END  
    print 'Report Type= ' + @TYPE    
	if lower(@AREA) <> 'all'
	begin
			set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '
	end
	/* initial stage1 report
	set @script = N' select AREA,FORMAT(BILLDATE, ''dd-MMM-yy'') as BILLDATE,ITEMNAME,T_B AS TOTAL_QTY, R_B AS RETURN_QTY,
    CAST(ROUND((r_b/t_b)*100,2) as varchar(10))+''%'' as RETURN_PERCENTAGE from BELL_LS where R_B > 0 and (R_B/T_B)*100 >=50 	 
	 and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2
	 + ' order by AREA,ITEMCODE,BILLDATE '
	print @script
	EXEC sp_executesql @script
	*/	
    
	set @script = N' SELECT AREA,FORMAT(BILLDATE, ''dd-MMM-yy'') as BILLDATE,ITEMNAME,
	  CAST(ROUND((SUM(R_B)/SUM(T_B))*100,2) AS VARCHAR(10))+''%'' as RET_PERCENT into TEMP_REPORT_RETURNS1 
	  from BELL_LS where 
	  (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2    
	  + ' GROUP BY AREA,ITEMNAME,BILLDATE HAVING SUM(R_B)>0 --AND (SUM(R_B)/SUM(T_B))*100 >=50 ' 
	  
	 print @script    
	 EXEC sp_executesql @script 	  
	 
	 set @script = N' INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM TEMP_REPORT_RETURNS1 ' 
	 EXEC sp_executesql @script  
 
	 select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'   
	  from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')  
   
	set @query = 'SELECT * from (select * from TEMP_REPORT_RETURNS1 '    
			+' ) x pivot (MAX(RET_PERCENT) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) pv1 order by AREA,ITEMNAME '  

	  PRINT @query  
	  exec sp_executesql @query;   
	  --SELECT * FROM TEMP_REPORT_RETURNS1  
	  --SELECT * FROM TEMP_REPORT_RETURNS2  

    /* modified for weekwise report, but not using as it require with actual bill date.

	--select AREA,FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,ITEMNAME,T_B AS TOTAL_QTY, R_B AS RETURN_QTY, ROUND((r_b/t_b)*100,2) as [Percentage]    
    --from BELL_LS where R_B > 0 and (R_B/T_B)*100 >=90    
    --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))      
    --order by AREA,ITEMCODE,BILLDATE    
   
  --CAST(ROUND((r_b/t_b)*100,2) as varchar(10))+''%'' as RETURN_PERCENTAGE  
  -- SUM(R_B) > 0 and (SUM(R_B)/SUM(T_B))*100 >=50 and       
	set @script = N' select AREA,FORMAT(BILLDATE, ''dd-MMM-yy'') as BILLDATE,ITEMNAME,SUM(T_B) AS TOT_QTY, SUM(R_B) AS RET_QTY into TEMP_REPORT_RETURNS1  
	from BELL_LS where R_B>0 AND  
	(BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2    
	+ ' GROUP BY AREA,ITEMNAME,BILLDATE ' 
   
	print @script    
	EXEC sp_executesql @script 
	  set @script = N' SELECT AREA,CONVERT(varchar(50),DATEADD(wk, DATEDIFF(wk, 6, ''1/1/'' + CAST(DATEPART(YY, BILLDATE) AS CHAR(4))) + (DatePart(week, BILLDATE)-1), 6),6) AS StartOfWeek,
	  ITEMNAME,CAST(ROUND((RET_QTY/TOT_QTY)*100,2) AS VARCHAR(10))+''%'' as RET_PERCENT into   
	  TEMP_REPORT_RETURNS2 FROM TEMP_REPORT_RETURNS1 WHERE RET_QTY > 0 AND (RET_QTY/TOT_QTY)*100 >= 50 '   
	
     DECLARE @datecol datetime = GETDATE();
	 DECLARE @WeekNum INT, @YearNum char(4);

	 SELECT @WeekNum = DATEPART(WK, @datecol), @YearNum = CAST(DATEPART(YY, @datecol) AS CHAR(4)); --46
  

	 print @script    
	 EXEC sp_executesql @script    
	 set @script = N' INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT StartOfWeek FROM TEMP_REPORT_RETURNS2 ' 
	 EXEC sp_executesql @script  
 
	 select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'   
	  from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')  
   
	-- set @query = 'SELECT * from (select * from TEMP_REPORT_RETURNS2 '    
	  --      +' ) x pivot (MAX(RET_PERCENT) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) pv1 order by AREA,ITEMNAME '  
   
	set @query = 'SELECT * from (select * from TEMP_REPORT_RETURNS2 '    
			+' ) x pivot (MAX(RET_PERCENT) for StartOfWeek in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) pv1 order by AREA,ITEMNAME '  

	  PRINT @query  
	  exec sp_executesql @query;   
	  --SELECT * FROM TEMP_REPORT_RETURNS1  
	  --SELECT * FROM TEMP_REPORT_RETURNS2  
	 */
  END    
end  
go

ALTER PROCEDURE USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME_OLD2
@TYPE AS NVARCHAR(20),    
@AREA AS NVARCHAR(max),    
@SHOP AS NVARCHAR(50),    
@ITEMNAME AS nVARCHAR(max),  
@BILLDATE1 AS DATE,    
@BILLDATE2 AS DATE    
AS    
BEGIN    
    
--DECLARE @TEMP_TABLE AS TABLE(SHOPNAME  VARCHAR(50), ITEMNAME  VARCHAR(50),QTY INT)    
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)    
Declare @script as NVARCHAR(MAX)  
Declare @query2 as NVARCHAR(MAX)  
    
--CREATE TABLE Bell_REPORT_HEADER (HEADER_NAME  VARCHAR(100))    
--DROP TABLE Bell_REPORT_HEADER  
DELETE FROM Bell_TEMP_REPORT    
DELETE FROM Bell_REPORT_HEADER    
set @query2 = ''  
IF lower(@TYPE) = 'byarea' -- AND lower(@SHOP) = 'all' AND lower(@ITEMNAME) = 'all'  
BEGIN  
  
 CREATE TABLE dbo.#TEMP_REPORT2 (AREA VARCHAR(50),ITEMNAME VARCHAR(50),QTY INT)  
   
 -- Insert into #TEMP_REPORT2   
 --select DISTINCT AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills     
 --WHERE AREA in (case lower(@AREA) when 'all' then AREA ELSE replace(@AREA,'[','''') END) and   
 --ITEMNAME in (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE replace(@ITEMNAME,'[','''') END)  
 --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
 -- AND ISNULL(ITEMCODE,0) > 0  
 --GROUP BY AREA,ITEMNAME    
  if lower(@AREA) <> 'all'  
  begin  
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '  
  end  
  
 set @script = N' Insert into #TEMP_REPORT2  
  select DISTINCT AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills  
  WHERE ITEMNAME = (case lower('''+ @ITEMNAME +''') when ''all'' then ITEMNAME ELSE ''' + @ITEMNAME +''' END)  
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2  
  + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY AREA,ITEMNAME '  
  
  print @script  
  EXEC sp_executesql @script  
   --SELECT * FROM #TEMP_REPORT2 order by area  
  
  CREATE TABLE dbo.#TEMP_HEADER (HEADER_NAME VARCHAR(50))  
  
 if (select count(1) from #TEMP_REPORT2) > 0   
 BEGIN  
  --PRINT 'RECORDS EXISTS'  
  --INSERT INTO #TEMP_HEADER SELECT DISTINCT ITEMNAME FROM #TEMP_REPORT2     
  --select * from #TEMP_HEADER  
  ----*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE    
  
  --select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'    
  --     from #TEMP_HEADER    
  --     group by HEADER_NAME   
  --   FOR XML PATH(''), TYPE    
  --   ).value('.', 'NVARCHAR(MAX)')     
  --  ,1,1,'')    
    
  select @cols=dbo.GET_HEADER_ITEMNAMES(2)  
        PRINT @cols  
  set @query = N'SELECT * from (select distinct * from #TEMP_REPORT2 ) x     
     pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) P ORDER BY AREA'  
  --PRINT @query    
  exec sp_executesql @query;    
  END  
END  
else IF lower(@TYPE) = 'bydate'  
BEGIN  
  
 CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), AREA VARCHAR(50),NAME VARCHAR(50),QTY INT)  
 if lower(@AREA) <> 'all'  
  begin  
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '  
  end  
  
 set @script = N' Insert into #TEMP_REPORT  
  select FORMAT(BILLDATE, ''dd-MMM-yy'') as BILLDATE,AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills  
  WHERE ITEMNAME = '''+ @ITEMNAME +'''   
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2  
  + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY BILLDATE,Area,ITEMNAME order by AREA'  
  
 print @script  
 EXEC sp_executesql @script  
  
 INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT   --(STORING BILLDATE INTO SHOPNAME COL)  
  
 --*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE  
 select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']' from Bell_REPORT_HEADER  
      group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)') ,1,1,'')  
  
 set @query = 'SELECT * from (select * from #TEMP_REPORT '    
    +' ) x pivot (AVG(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) p '  
 --PRINT @query  
 exec sp_executesql @query;  
END  
else IF lower(@TYPE) = 'showlineswithnosales'  
BEGIN  
   
 if lower(@AREA) <> 'all'  
  begin  
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '  
  end  
     
 set @script = N' select distinct Line from Bell_Cust_Master where Line not in (  
  select AREA from bhavani_ER_Bills WHERE ITEMNAME = '''+ @ITEMNAME +'''   
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2  
  + ') and line <> '''' and area <> '''' and line <> ''ABCD-AREA'' order by Line'  
  
 print @script  
 EXEC sp_executesql @script  
  
END  
  
else IF lower(@TYPE) = 'byshop'  
BEGIN  
 --Insert into Bell_TEMP_REPORT    
 --select ShopName,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A     
 ----INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID     
 --WHERE A.AREA=@AREA and A.SHOPNAME = (case lower(@SHOP) when 'all' then A.SHOPNAME ELSE @SHOP END)    
 --and ITEMNAME = (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE @ITEMNAME END)    
 --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))    
 --GROUP BY A.ITEMNAME,A.ShopName    
  
 if lower(@AREA) <> 'all'  
  begin  
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '  
  end  
  
 set @script = N' Insert into Bell_TEMP_REPORT  
  select ShopName,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A   
  WHERE ITEMNAME = (case lower('''+ @ITEMNAME +''') when ''all'' then ITEMNAME ELSE ''' + @ITEMNAME +''' END)  
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2  
  + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY ShopName,ITEMNAME '  
  
 --print @script  
 EXEC sp_executesql @script  
  
 if (select count(1) from Bell_TEMP_REPORT) > 0   
 BEGIN    
  INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT ITEMNAME FROM Bell_TEMP_REPORT    
    
  --*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE    
  select @cols=dbo.GET_HEADER_ITEMNAMES(2)  
  --select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'    
  --   from Bell_REPORT_HEADER  group by HEADER_NAME order by HEADER_NAME    
  --   FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,'')    
    
  set @query = N'SELECT * from (select * from Bell_TEMP_REPORT ) x     
     pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) p '    
  --PRINT @query    
  exec sp_executesql @query;    
 END    
 ELSE  
 BEGIN  
  PRINT 'NO RECORDS'  
  --select * from Bell_TEMP_REPORT  
  select @SHOP AS SHOPNAME,'NO RECORDS FOUND' AS ITEMNAME  
 END  
END  
else IF lower(@TYPE) = 'returns' -- for items return %  
  BEGIN    
	
    --CREATE TABLE dbo.#TEMP_REPORT_RETURNS (AREA VARCHAR(50), BILLDATE VARCHAR(20),ITEMNAME VARCHAR(100),TOT_QTY INT,RET_QTY INT)
    --CREATE TABLE dbo.#TEMP_REPORT_RETURNS2 (AREA VARCHAR(50), BILLDATE VARCHAR(20),ITEMNAME VARCHAR(100),TOT_QTY INT,RET_QTY INT,RET_PERCENT INT)
	IF OBJECT_ID (N'TEMP_REPORT_RETURNS1', N'U') IS NOT NULL
	BEGIN
		DROP TABLE TEMP_REPORT_RETURNS1
	END
	IF OBJECT_ID (N'TEMP_REPORT_RETURNS2', N'U') IS NOT NULL
	BEGIN
		DROP TABLE TEMP_REPORT_RETURNS2
	END
    print 'Report Type= ' + @TYPE  
    --select AREA,FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,ITEMNAME,T_B AS TOTAL_QTY, R_B AS RETURN_QTY, ROUND((r_b/t_b)*100,2) as [Percentage]  
    --from BELL_LS where R_B > 0 and (R_B/T_B)*100 >=90  
    --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))    
    --order by AREA,ITEMCODE,BILLDATE  
  
   if lower(@AREA) <> 'all'  
  begin  
   set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '  
  end
  
  --CAST(ROUND((r_b/t_b)*100,2) as varchar(10))+''%'' as RETURN_PERCENTAGE
  -- SUM(R_B) > 0 and (SUM(R_B)/SUM(T_B))*100 >=50 and     
 set @script = N' select AREA,FORMAT(BILLDATE, ''dd-MMM-yy'') as BILLDATE,ITEMNAME,SUM(T_B) AS TOT_QTY, SUM(R_B) AS RET_QTY into TEMP_REPORT_RETURNS1
	 from BELL_LS where R_B>0 AND
	(BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2  
  + ' GROUP BY AREA,ITEMNAME,BILLDATE '
  --+ ' order by AREA,ITEMNAME,BILLDATE '  
 
 print @script  
 EXEC sp_executesql @script  
 set @script = N' SELECT AREA,BILLDATE,ITEMNAME,CAST(ROUND((RET_QTY/TOT_QTY)*100,2) AS VARCHAR(10))+''%'' as RET_PERCENT into 
		TEMP_REPORT_RETURNS2 FROM TEMP_REPORT_RETURNS1 WHERE RET_QTY > 0 AND (RET_QTY/TOT_QTY)*100 >= 50 '	

 print @script  
 EXEC sp_executesql @script  
 
 INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM TEMP_REPORT_RETURNS2   --(STORING BILLDATE INTO SHOPNAME COL)

	select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']' 
	 from Bell_REPORT_HEADER group by HEADER_NAME FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'')
	
	set @query = 'SELECT * from (select * from TEMP_REPORT_RETURNS2 '  
        +' ) x pivot (MAX(RET_PERCENT) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) pv1 order by AREA,ITEMNAME '
	
  PRINT @query
  exec sp_executesql @query; 
  SELECT * FROM TEMP_REPORT_RETURNS1
  SELECT * FROM TEMP_REPORT_RETURNS2

  END  
end
go

alter PROCEDURE USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME_old  
@TYPE AS NVARCHAR(20),  
@AREA AS NVARCHAR(max),  
@SHOP AS NVARCHAR(50),  
@ITEMNAME AS nVARCHAR(max),
@BILLDATE1 AS DATE,  
@BILLDATE2 AS DATE  
AS  
BEGIN  
  
--DECLARE @TEMP_TABLE AS TABLE(SHOPNAME  VARCHAR(50), ITEMNAME  VARCHAR(50),QTY INT)  
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)  
Declare @script as NVARCHAR(MAX)
Declare @query2 as NVARCHAR(MAX)
  
--CREATE TABLE Bell_REPORT_HEADER (HEADER_NAME  VARCHAR(100))  
--DROP TABLE Bell_REPORT_HEADER
DELETE FROM Bell_TEMP_REPORT  
DELETE FROM Bell_REPORT_HEADER  
set @query2 = ''
IF lower(@TYPE) = 'byarea' -- AND lower(@SHOP) = 'all' AND lower(@ITEMNAME) = 'all'
BEGIN

 CREATE TABLE dbo.#TEMP_REPORT2 (AREA VARCHAR(50),ITEMNAME VARCHAR(50),QTY INT)
 
 -- Insert into #TEMP_REPORT2 
	--select DISTINCT AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills   
	--WHERE AREA in (case lower(@AREA) when 'all' then AREA ELSE replace(@AREA,'[','''') END) and 
	--ITEMNAME in (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE replace(@ITEMNAME,'[','''') END)
	--and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
 -- AND ISNULL(ITEMCODE,0) > 0
	--GROUP BY AREA,ITEMNAME	 
	 if lower(@AREA) <> 'all'
	 begin
			set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '
	 end

	set @script = N' Insert into #TEMP_REPORT2
	 select DISTINCT AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills
	 WHERE ITEMNAME = (case lower('''+ @ITEMNAME +''') when ''all'' then ITEMNAME ELSE ''' + @ITEMNAME +''' END)
	 and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2
	 + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY AREA,ITEMNAME '

  print @script
  EXEC sp_executesql @script
   --SELECT * FROM #TEMP_REPORT2 order by area

  CREATE TABLE dbo.#TEMP_HEADER (HEADER_NAME VARCHAR(50))

	if (select count(1) from #TEMP_REPORT2) > 0 
	BEGIN
		--PRINT 'RECORDS EXISTS'
		--INSERT INTO #TEMP_HEADER SELECT DISTINCT ITEMNAME FROM #TEMP_REPORT2 		
		--select * from #TEMP_HEADER
		----*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE  

		--select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
		--					from #TEMP_HEADER  
		--					group by HEADER_NAME 
		--			FOR XML PATH(''), TYPE  
		--			).value('.', 'NVARCHAR(MAX)')   
		--		,1,1,'')  
		
		select @cols=dbo.GET_HEADER_ITEMNAMES(2)
        PRINT @cols
		set @query = N'SELECT * from (select distinct * from #TEMP_REPORT2 ) x   
					pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) P ORDER BY AREA'
		--PRINT @query  
		exec sp_executesql @query;  
  END
END
else IF lower(@TYPE) = 'bydate'
BEGIN

	CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), AREA VARCHAR(50),NAME VARCHAR(50),QTY INT)
	if lower(@AREA) <> 'all'
	 begin
			set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '
	 end

	set @script = N' Insert into #TEMP_REPORT
	 select FORMAT(BILLDATE, ''dd-MMM-yy'') as BILLDATE,AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills
	 WHERE ITEMNAME = '''+ @ITEMNAME +''' 
	 and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2
	 + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY BILLDATE,Area,ITEMNAME order by AREA'

	print @script
	EXEC sp_executesql @script

	INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT   --(STORING BILLDATE INTO SHOPNAME COL)

	--*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE
	select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'
						from Bell_REPORT_HEADER
						group by HEADER_NAME --order by HEADER_NAME
				FOR XML PATH(''), TYPE
				).value('.', 'NVARCHAR(MAX)') 
			,1,1,'')

	set @query = 'SELECT * from (select * from #TEMP_REPORT '  
				+' ) x pivot (AVG(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) p '
	--PRINT @query
	exec sp_executesql @query;
END
else IF lower(@TYPE) = 'showlineswithnosales'
BEGIN
	
	if lower(@AREA) <> 'all'
	 begin
			set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '
	 end
   
	set @script = N' select distinct Line from Bell_Cust_Master where Line not in (
	 select AREA from bhavani_ER_Bills WHERE ITEMNAME = '''+ @ITEMNAME +''' 
	 and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2
	 + ') and line <> '''' and area <> '''' and line <> ''ABCD-AREA'' order by Line'

	print @script
	EXEC sp_executesql @script

END

else IF lower(@TYPE) = 'byshop'
BEGIN
	--Insert into Bell_TEMP_REPORT  
	--select ShopName,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A   
	----INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID   
	--WHERE A.AREA=@AREA and A.SHOPNAME = (case lower(@SHOP) when 'all' then A.SHOPNAME ELSE @SHOP END)  
	--and ITEMNAME = (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE @ITEMNAME END)  
	--and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
	--GROUP BY A.ITEMNAME,A.ShopName  

	if lower(@AREA) <> 'all'
	 begin
			set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '
	 end

	set @script = N' Insert into Bell_TEMP_REPORT
	 select ShopName,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A 
	 WHERE ITEMNAME = (case lower('''+ @ITEMNAME +''') when ''all'' then ITEMNAME ELSE ''' + @ITEMNAME +''' END)
	 and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2
	 + ' AND ISNULL(ITEMCODE,0) > 0 GROUP BY ShopName,ITEMNAME '

	--print @script
	EXEC sp_executesql @script

	if (select count(1) from Bell_TEMP_REPORT) > 0 
	BEGIN		
		INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT ITEMNAME FROM Bell_TEMP_REPORT  
  
		--*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE  
		select @cols=dbo.GET_HEADER_ITEMNAMES(2)
		--select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
		--			from Bell_REPORT_HEADER  group by HEADER_NAME order by HEADER_NAME  
		--			FOR XML PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)') ,1,1,'')  
  
		set @query = N'SELECT * from (select * from Bell_TEMP_REPORT ) x   
					pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) p '  
		--PRINT @query  
		exec sp_executesql @query;  
	END  
	ELSE
	BEGIN
		PRINT 'NO RECORDS'
		--select * from Bell_TEMP_REPORT
		select @SHOP AS SHOPNAME,'NO RECORDS FOUND' AS ITEMNAME
	END
END
else IF lower(@TYPE) = 'returns' -- for items return %
  BEGIN
    print 'Report Type= ' + @TYPE
    --select AREA,FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,ITEMNAME,T_B AS TOTAL_QTY, R_B AS RETURN_QTY, ROUND((r_b/t_b)*100,2) as [Percentage]
    --from BELL_LS where R_B > 0 and (R_B/T_B)*100 >=90
    --and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
    --order by AREA,ITEMCODE,BILLDATE

   if lower(@AREA) <> 'all'
	 begin
			set @query2 = ' AND AREA in (' + REPLACE(REPLACE(@AREA,'[',''''),']','''') + N') '
	 end
	set @script = N' select AREA,FORMAT(BILLDATE, ''dd-MMM-yy'') as BILLDATE,ITEMNAME,T_B AS TOTAL_QTY, R_B AS RETURN_QTY,
    CAST(ROUND((r_b/t_b)*100,2) as varchar(10))+''%'' as RETURN_PERCENTAGE from BELL_LS where R_B > 0 and (R_B/T_B)*100 >=90 	 
	 and (BILLDATE BETWEEN CONVERT(nvarchar(10),'''+ Cast(@BILLDATE1 as varchar(15)) +''',101) AND CONVERT(nvarchar(10),'''+ cast(@BILLDATE2 as varchar(15)) + ''',101)) ' + @query2
	 + ' order by AREA,ITEMCODE,BILLDATE '
	print @script
	EXEC sp_executesql @script
  END
end
GO

--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME_OLD 'ALL','ALL','ALL','2024-Aug-20','2024-Aug-30'
--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'BELLAMPALLY','All','All','05-Aug-2024','30-Aug-2024'
--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'ALL','ALL','KHARA 350GM','2024-07-01','2024-07-05'
--  USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'GAJWEL','All','All','05-Jun-2024','04-Jul-2024'
ALTER PROCEDURE USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME_OLD
@AREA AS NVARCHAR(30),  
@SHOP AS NVARCHAR(50),  
@ITEMNAME AS NVARCHAR(30),  
@BILLDATE1 AS DATE,  
@BILLDATE2 AS DATE  
AS  
BEGIN  
  
--DECLARE @TEMP_TABLE AS TABLE(SHOPNAME  VARCHAR(50), ITEMNAME  VARCHAR(50),QTY INT)  
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)  
Declare @query as Nvarchar(500)
  
--CREATE TABLE Bell_REPORT_HEADER (HEADER_NAME  VARCHAR(100))  
--DROP TABLE Bell_REPORT_HEADER
DELETE FROM Bell_TEMP_REPORT  
DELETE FROM Bell_REPORT_HEADER  

IF lower(@AREA) = 'all' AND lower(@SHOP) = 'all' AND lower(@ITEMNAME) = 'all'
BEGIN

 CREATE TABLE dbo.#TEMP_REPORT2 (AREA VARCHAR(50),ITEMNAME VARCHAR(50),QTY INT)
 
 -- Insert into #TEMP_REPORT2 
	--select DISTINCT AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills   
	--WHERE ITEMNAME = (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE @ITEMNAME END)
	--and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
 -- AND ISNULL(ITEMCODE,0) > 0 	GROUP BY AREA,ITEMNAME

 set @query = N' Insert into #TEMP_REPORT2
 select DISTINCT AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills
 WHERE ITEMNAME = (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE @ITEMNAME END)
 and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
 AND ISNULL(ITEMCODE,0) > 0 	GROUP BY AREA,ITEMNAME '

  set @query = N' SELECT * from bhavani_ER_Bills    
			WHERE AREA in (' + REPLACE(REPLACE(@temp1,'[',''''),']','''') + N') '

  EXEC sp_executesql @query

  --SELECT * FROM #TEMP_REPORT2
  CREATE TABLE dbo.#TEMP_HEADER (HEADER_NAME VARCHAR(50))

	if (select count(1) from #TEMP_REPORT2) > 0 
	BEGIN
		--PRINT 'RECORDS EXISTS'
		--INSERT INTO #TEMP_HEADER SELECT DISTINCT ITEMNAME FROM #TEMP_REPORT2 		
		--select * from #TEMP_HEADER
		----*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE  

		--select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
		--					from #TEMP_HEADER  
		--					group by HEADER_NAME 
		--			FOR XML PATH(''), TYPE  
		--			).value('.', 'NVARCHAR(MAX)')   
		--		,1,1,'')  
		
		select @cols=dbo.GET_HEADER_ITEMNAMES(2)
        PRINT @cols

		set @query = N'SELECT * from (select * from #TEMP_REPORT2 ) x   
					pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) P ORDER BY AREA'
		PRINT @query  
		exec sp_executesql @query;  
  END
END
else IF lower(@AREA) = 'all'
BEGIN
  
	CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), AREA VARCHAR(50),NAME VARCHAR(50),QTY INT)
	--SET @ITEMNAMES = REPLACE(@ITEMNAME,'#','''')
	--PRINT @ITEMNAMES

  Insert into #TEMP_REPORT
  select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills
  WHERE AREA=(case lower(@AREA) when 'all' then AREA ELSE @AREA END) and 
  SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)
  AND ITEMNAME IN (@ITEMNAME)
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
  GROUP BY BILLDATE,AREA,ITEMNAME order by AREA

	--Select * from #TEMP_REPORT --order by shopname desc
	--SELECT * FROM Bell_REPORT_HEADER

	INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT   --(STORING BILLDATE INTO SHOPNAME COL)

	--*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE
	select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'
						from Bell_REPORT_HEADER
						group by HEADER_NAME --order by HEADER_NAME
				FOR XML PATH(''), TYPE
				).value('.', 'NVARCHAR(MAX)') 
			,1,1,'')

	set @query = 'SELECT * from (select * from #TEMP_REPORT '  
				+' ) x pivot (AVG(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) p '
	--PRINT @query
	exec sp_executesql @query;
END
ELSE
BEGIN
	Insert into Bell_TEMP_REPORT  
	select ShopName,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A   
	--INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID   
	WHERE A.AREA=@AREA and A.SHOPNAME = (case lower(@SHOP) when 'all' then A.SHOPNAME ELSE @SHOP END)  
	and ITEMNAME = (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE @ITEMNAME END)  
	and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))  
	GROUP BY A.ITEMNAME,A.ShopName  
 
	if (select count(1) from Bell_TEMP_REPORT) > 0 
	BEGIN
		PRINT 'RECORDS EXISTS'
		INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT ITEMNAME FROM Bell_TEMP_REPORT  
  
		--*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE  
		select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'  
							from Bell_REPORT_HEADER  
							group by HEADER_NAME order by HEADER_NAME  
					FOR XML PATH(''), TYPE  
					).value('.', 'NVARCHAR(MAX)')   
				,1,1,'')  
  
		set @query = N'SELECT * from (select * from Bell_TEMP_REPORT ) x   
					pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) p '  
		--PRINT @query  
		exec sp_executesql @query;  
	END
	ELSE
	BEGIN
		PRINT 'NO RECORDS'
		--select * from Bell_TEMP_REPORT
		select @SHOP AS SHOPNAME,'NO RECORDS FOUND' AS ITEMNAME
	END	
END 
end
GO

-- USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'Eturnagaram','BALAJI GS','','2024-05-01','2024-05-30'
-- USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'Eturnagaram','ALL''',,'2024-05-01','2024-05-30'
-- USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'Khammam','ALL','','2024-05-01','2024-05-30'
-- USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME 'GHANPUR ','all','','2024-05-01','2024-05-30'

--ALTER PROCEDURE USP_ITEMS_WISE_SALES_COUNT_BY_ITEMNAME
--@AREA AS NVARCHAR(30),
--@SHOP AS NVARCHAR(50),
--@ITEMNAME AS NVARCHAR(30),
--@BILLDATE1 AS DATE,
--@BILLDATE2 AS DATE
--AS
--BEGIN

----DECLARE @TEMP_TABLE AS TABLE(SHOPNAME  VARCHAR(50), ITEMNAME  VARCHAR(50),QTY INT)
--DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)

----CREATE TABLE Bell_REPORT_HEADER (HEADER_NAME  VARCHAR(50))
--DELETE FROM Bell_TEMP_REPORT
--DELETE FROM Bell_REPORT_HEADER

--Insert into Bell_TEMP_REPORT
--select ShopName,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A 
----INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID 
--WHERE A.AREA=@AREA and A.SHOPNAME = (case lower(@SHOP) when 'all' then A.SHOPNAME ELSE @SHOP END)
--and ITEMNAME = (case lower(@ITEMNAME) when 'all' then ITEMNAME ELSE @ITEMNAME END)
--and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
--GROUP BY A.ITEMNAME,A.ShopName

----select * from Bell_TEMP_REPORT

--INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT ITEMNAME FROM Bell_TEMP_REPORT

----*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE
--select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'
--                    from Bell_REPORT_HEADER
--                    group by HEADER_NAME order by HEADER_NAME
--            FOR XML PATH(''), TYPE
--            ).value('.', 'NVARCHAR(MAX)') 
--        ,1,1,'')

--set @query = N'SELECT * from (select * from Bell_TEMP_REPORT ) x 
--            pivot (AVG(QTY) for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) p '
--PRINT @query
--exec sp_executesql @query;
--end
--Go

-- USP_ITEMS_WISE_SALES_COUNT_BY_SHOP 'Khammam','all','2024-05-01','2024-05-30'

-- USP_ITEMS_WISE_SALES_COUNT_BY_SHOP 'Eturnagaram','BALAJI GS','2024-05-01','2024-05-30'
-- USP_ITEMS_WISE_SALES_COUNT_BY_SHOP 'Eturnagaram','ALL','2024-05-01','2024-05-30'
ALTER PROCEDURE USP_ITEMS_WISE_SALES_COUNT_BY_SHOP
@AREA AS NVARCHAR(20),
@SHOP AS NVARCHAR(20),
@BILLDATE1 AS DATE,
@BILLDATE2 AS DATE
AS
BEGIN

--DECLARE @TEMP_TABLE AS TABLE(SHOPNAME  VARCHAR(50), ITEMNAME  VARCHAR(50),QTY INT)
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)

--CREATE TABLE [dbo].Bell_ITEMNAMES (ITEMNAME  VARCHAR(50))
--CREATE TABLE [dbo].Bell_TEMP_SHOPS (SHOPNAME VARCHAR(50))
DELETE FROM Bell_TEMP_REPORT
DELETE FROM Bell_REPORT_HEADER

Insert into Bell_TEMP_REPORT
select A.ShopName,A.ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills A 
--INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID 
WHERE A.AREA=@AREA and A.SHOPNAME = (case lower(@SHOP) when 'all' then A.SHOPNAME ELSE @SHOP END)
and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
GROUP BY A.ITEMNAME,A.ShopName

--select * from Bell_TEMP_REPORT

INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT SHOPNAME FROM Bell_TEMP_REPORT

--*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE
select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'
                    from Bell_REPORT_HEADER
                    group by HEADER_NAME order by HEADER_NAME
            FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)') 
        ,1,1,'')

set @query = N'SELECT * from (select * from Bell_TEMP_REPORT ) x 
            pivot (AVG(QTY) for ShopName in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N') ) p '
PRINT @query
exec sp_executesql @query;
end
Go

-- USP_ITEMS_WISE_SALES_COUNT_BY_AREA '','Eturnagaram'
	ALTER PROCEDURE USP_ITEMS_WISE_SALES_COUNT_BY_AREA 
@BILLDATE AS DATE,
@AREA AS NVARCHAR(20)
AS
BEGIN

--DECLARE @TEMP_TABLE AS TABLE(SHOPNAME  VARCHAR(50), ITEMNAME  VARCHAR(50),QTY INT)
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)

--DELETE FROM Bell_TEMP_REPORT
--DELETE FROM Bell_ITEMNAMES
--insert into Bell_TEMP_REPORT
select A.ShopName,ITEMNAME,SUM(PACKETS) QTY from bhavani_ER_Bills A 
--INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID 
WHERE A.AREA='Eturnagaram' GROUP BY A.ITEMNAME,A.ShopName 

--select * from Bell_TEMP_REPORT WHERE SHOPNAME='BAZAR'
-- select * from Bell_ITEMNAMES

--select * from Bell_TEMP_REPORT WHERE ITEMNAME LIKE '%10/- RUSK%'
--DELETE FROM Bell_TEMP_REPORT WHERE ITEMNAME LIKE '%10/- RUSK%'
INSERT INTO Bell_ITEMNAMES SELECT DISTINCT ITEMNAME FROM Bell_TEMP_REPORT

--*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE
select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(ITEMNAME) + ']'
                    from Bell_ITEMNAMES
                    group by ITEMNAME order by ITEMNAME
            FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)') 
        ,1,1,'')

set @query = N'SELECT * from 
             (
                select *
                from Bell_TEMP_REPORT
            ) x
            pivot 
            (
                AVG(QTY)
                for ITEMNAME in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + N')
            ) p '

exec sp_executesql @query;
end
Go
--select * from Bell_TEMP_REPORT ORDER BY ITEMNAME

--SELECT * FROM Bell_TEMP_REPORT 
-- PIVOT
--(AVG(qty) FOR ITEMNAME IN ([CHIKKY5RS],[MYSOREPAK ROJA 5/-],[1/- BELL JAMUN],[10/- RUSK],[150.GM SOAP]
--)) AS PivotTable;

--USP_WEEKLY_SALE_ITEMS_COUNT 'Eturnagaram','All','2024-May-01','2024-May-30'
--USP_WEEKLY_SALE_ITEMS_COUNT 'KHAMMAM','NAVEEN BAKERY','2024-May-30'
--USP_WEEKLY_SALE_ITEMS_COUNT 'KHAMMAM','ALL','2024-May-30'
--USP_WEEKLY_SALE_ITEMS_COUNT '2024-May-18','ETURNAGARAM'
--USP_WEEKLY_SALE_ITEMS_COUNT '2024-May-01','ETURNAGARAM','ALL'
ALTER PROCEDURE USP_WEEKLY_SALE_ITEMS_COUNT 
@AREA AS NVARCHAR(20),
@SHOP AS NVARCHAR(20),
@BILLDATE1 AS DATE,
@BILLDATE2 AS DATE
AS
BEGIN

SELECT AREA,BILLDATE,ITEMNAME,SUM(PACKETS) QTY FROM bhavani_ER_Bills A 
--INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID 
WHERE A.AREA=@AREA
and (BILLDATE BETWEEN CONVERT(nvarchar(10),'2024-05-01',101) AND CONVERT(nvarchar(10),'2024-05-30',101))
GROUP BY A.AREA,A.BILLDATE,A.ITEMNAME 


--Declare @week1 as varchar(12)
--Declare @week2 as varchar(12)
--Declare @week3 as varchar(12)
--Declare @week4 as varchar(12)
--Declare @week5 as varchar(12)
--Declare @week6 as varchar(12)
--Declare @week7 as varchar(12)
--Declare @week8 as varchar(12)

--Declare @col1 as varchar(12)
--Declare @col2 as varchar(12)
--Declare @col3 as varchar(12)
--Declare @col4 as varchar(12)
--Declare @col5 as varchar(12)
--Declare @col6 as varchar(12)
--Declare @col7 as varchar(12)
--Declare @col8 as varchar(12)

----Declare @MonthEnd as varchar(12)
----declare @datefrom as date,@dateto as date
----SELECT @datefrom= DATEADD(DAY,-60,GETDATE())
----SELECT @dateto = DATEADD(DAY,7,@datefrom)
----SELECT @datefrom, @dateto
----select FORMAT(getdate(), 'dd/MMM/yyyy', 'en-US')

--set @week1=DATEADD(DAY,-56,@BILLDATE)
--set @week2=DATEADD(DAY,7,@week1)
--set @week3=DATEADD(DAY,14,@week1)
--set @week4=DATEADD(DAY,21,@week1)
--set @week5=DATEADD(DAY,28,@week1)
--set @week6=DATEADD(DAY,35,@week1)
--set @week7=DATEADD(DAY,42,@week1)
--set @week8=DATEADD(DAY,49,@week1)


----TO GET FIRST DAY FROM GIVEN DATE
----* SELECT DATEFROMPARTS(YEAR(getdate()),MONTH(getdate()),1)
----SELECT DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS StartOfMonth
----SELECT CONCAT(datepart(year,'2024-Feb-01'),'-', CONVERT(CHAR(3), '2024-Feb-01', 100), '-01')
----TO GET LAST DAY FROM  GIVEN DATE
----SELECT EOMONTH('2020-04-15'); 

--print '@week1=' + @week1
--print '@week8=' + @week8
----PRINT EOMONTH(@BILLDATE)
--Begin
--	with cte (AREA,SHOPNAME,ITEMNAME,week1,week2,week3,week4,week5,week6,week7,week8) 
--	as(
--	select AREA,SHOPNAME,ITEMNAME,
--	case when billdate >= @week1 and billdate < @week2 then PACKETS else 0 end as week1,
--	case when billdate >= @week2 and billdate < @week3 then PACKETS else 0 end as week2,
--	case when billdate >= @week3 and billdate < @week4 then PACKETS else 0 end as week3,
--	case when billdate >= @week4 and billdate < @week5 then PACKETS else 0 end as week4,
--	case when billdate >= @week5 and billdate < @week6 then PACKETS else 0 end as week5,
--	case when billdate >= @week6 and billdate < @week7 then PACKETS else 0 end as week6,
--	case when billdate >= @week7 and billdate < @week8 then PACKETS else 0 end as week7,
--	case when billdate >= @week8 and billdate < @BILLDATE then PACKETS else 0 end as week8
--	--from bhavani_ER_Bills
--	FROM bhavani_ER_Bills A INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID 
--	WHERE B.AREA=@AREA and (BILLDATE between @week1 AND @BILLDATE )
--	--Group by A.CustID,Area,ShopName,Qty,BillDate
--	--WHERE BillDate BETWEEN CONVERT(nvarchar(10),GETDATE(),101) AND CONVERT(nvarchar(10),GETDATE(),101)
--	 and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)
--	)
--	select DISTINCT AREA,SHOPNAME,ITEMNAME
--	,sum(week1) as week1,sum(week2) as week2,sum(week3) as week3,sum(week4) as week4,sum(week5) as week5,
--	sum(week6) as week6,sum(week7) as week7,sum(week8) as week8 from cte
--	group by AREA,SHOPNAME,ITEMNAME order by ITEMNAME
--End

END
GO

--USP_WEEKLY_SALES_REPORT '2024-02-28','NARSAMPET'
--USP_WEEKLY_SALES_REPORT '2024-Apr-12','NARSAMPET'
ALTER PROCEDURE USP_WEEKLY_SALES_REPORT 
@BILLDATE AS DATE,
@AREA AS NVARCHAR(20)
AS
BEGIN
Declare @week1 as varchar(12)
Declare @week2 as varchar(12)
Declare @week3 as varchar(12)
Declare @week4 as varchar(12)
Declare @week5 as varchar(12)
Declare @MonthEnd as varchar(12)

set @week1=CONCAT(datepart(year,@BILLDATE),'-', CONVERT(CHAR(3), @BILLDATE, 100), '-01')
set @week2=CONCAT(datepart(year,@BILLDATE),'-', CONVERT(CHAR(3), @BILLDATE, 100), '-08')
set @week3=CONCAT(datepart(year,@BILLDATE),'-', CONVERT(CHAR(3), @BILLDATE, 100), '-15')
set @week4=CONCAT(datepart(year,@BILLDATE),'-', CONVERT(CHAR(3), @BILLDATE, 100), '-22')
set @week5=CONCAT(datepart(year,@BILLDATE),'-', CONVERT(CHAR(3), @BILLDATE, 100), '-29')
set @MonthEnd=CONCAT(datepart(year,@BILLDATE),'-', CONVERT(CHAR(3), @BILLDATE, 100), '-29')

--TO GET FIRST DAY FROM GIVEN DATE
--* SELECT DATEFROMPARTS(YEAR(getdate()),MONTH(getdate()),1)
--SELECT DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS StartOfMonth
--SELECT CONCAT(datepart(year,'2024-Feb-01'),'-', CONVERT(CHAR(3), '2024-Feb-01', 100), '-01')
--TO GET LAST DAY FROM  GIVEN DATE
--SELECT EOMONTH('2020-04-15'); 

print @week1
Begin
	with cte (custid,AREA,SHOPNAME,CUSTOMERNAME,AMOUNT,week1,week2,week3,week4) 
	as(
	select A.Custid,AREA,ShopName,CustomerName,AMOUNT,
	case when billdate >= @week1 and billdate < @week2 then amount else 0 end
	as week1,
	case when billdate >= @week2 and billdate < @week3 then amount else 0 end
	as week2,
	case when billdate >= @week3 and billdate < @week4 then amount else 0 end
	as week3,
	case when billdate >= @week4 and billdate < @week5 then amount else 0 end
	as week4
	--from bhavani_ER_Bills
	FROM bhavani_ER_Bills A INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID 
	WHERE B.AREA=@AREA and (BILLDATE between @week1 AND EOMONTH(@BILLDATE) )
	--WHERE BillDate BETWEEN CONVERT(nvarchar(10),GETDATE(),101) AND CONVERT(nvarchar(10),GETDATE(),101)
	)
	select DISTINCT CUSTID ,AREA,SHOPNAME,CUSTOMERNAME
	,sum(week1) as week1,sum(week2) as week2,sum(week3) as week3,sum(week4) as week4,isnull(sum(Amount),0) as TotalAmount from cte
	group by CUSTID ,AREA,SHOPNAME,CUSTOMERNAME
	UNION
	(SELECT CUSTID ,AREA,SHOPNAME,CUSTOMERNAME,0 AS week1, 0 as week2,0 as week3,0 as week4, 0 as TotalAmount
	FROM Bell_Cust_Master WHERE AREA=@AREA AND CUSTID NOT IN (SELECT CUSTID FROM bhavani_ER_Bills WHERE AREA=@AREA))
End
END
GO

Insert into Bell_Users (Username,PASSWORD,firstname,lastname,UserType,status) values('king','king','rajue','eppakayala','admin','active')  
--** for Zion webapp login. with usertype='zion'
Insert into Bell_Users (Username,PASSWORD,firstname,lastname,UserType,status) values('king','king','Zion','Wellmark','zion','active')  
--USP_VALIDATE_USER 'king','king','zion'
--USP_VALIDATE_USER 'king','king','admin'
select * from Bell_Users 
ALTER procedure USP_VALIDATE_USER
@USERNAME as varchar(20),
@PASSWORD as varchar(20),
@USERTYPE as varchar(20)
AS
Begin	
	SELECT ID,USERNAME,STATUS,USERTYPE,FIRSTNAME,LASTNAME FROM BELL_USERS WHERE USERNAME=@USERNAME AND PASSWORD=@PASSWORD AND USERTYPE=@USERTYPE
	--IF (EXISTS (SELECT 'X' FROM BELL_USERS WHERE USERNAME=@USERNAME AND PWD=@PWD AND USERTYPE=@USERTYPE))
	--Begin
	--	Select 'VALID'
	--end
	--else
	--BEGIN
	--	Select 'INVALID'
	--END
End
GO

select * from BELL_USERS
ALTER procedure USP_SAVE_USER_DETAILS
@ID AS INT,
@USERNAME as varchar(20),
@PASSWORD as varchar(20),
@FIRSTNAME as varchar(20),
@LASTNAME as varchar(20)
AS
Begin	
	IF (@ID > 0 )
	BEGIN
		UPDATE BELL_USERS SET FIRSTNAME=@FIRSTNAME,lastname=@LASTNAME,USERNAME=@USERNAME,password=@PASSWORD WHERE ID=@ID
	END 
	ELSE
	BEGIN
		INSERT INTO BELL_USERS(firstname,lastname,USERNAME,PASSWORD,USERTYPE) VALUES(@FIRSTNAME,@LASTNAME,@USERNAME,@PASSWORD,'user')
	END
End
GO

-- USP_GET_ALL_USERS 1
-- USP_GET_ALL_USERS NULL
ALTER procedure USP_GET_ALL_USERS
@USERID AS INT NULL
AS
Begin
	IF (@USERID=0 OR ISNULL(@USERID,'') = '')
	BEGIN
		SELECT * FROM BELL_USERS WHERE USERTYPE='user' AND STATUS='Active'
	END
	ELSE
	BEGIN
		SELECT * FROM BELL_USERS WHERE USERTYPE='user' and STATUS='Active' AND ID=@USERID 
	END
End
GO

alter procedure USP_DELETE_USER
@ID AS INT
AS
Begin
	--DELETE FROM Bell_Users WHERE ID=@USERID
	UPDATE BELL_USERS SET STATUS='InActive' WHERE ID=@ID
End
GO


SELECT * from Bell_Cust_Master  WHERE LINE LIKE '%ABCD-AREA%'
UPDATE Bell_Cust_Master SET STATUS='DELETED' WHERE LINE LIKE '%ABCD-AREA%'
SELECT * from Bell_Cust_Master  WHERE STATUS='DELETED'

--Delete from bhavani_ER_Bills WHERE BILLDATE='14-Jun-2024' AND BillNumber=1 AND AREA = 'ABCD-AREA' AND SHOPNAME='ABCD-SHOP' 

SELECT * FROM Bell_Cust_Master WHERE AREA = 'ABCD-SHOP'
select * from bhavani_ER_Bills order by billid DESC
select * from bhavani_ER_Bills WHERE AREA ='ABCD-AREA' ORDER BY ActionDate
--DELETE from bhavani_ER_Bills WHERE AREA ='ABCD-AREA'

select * from bhavani_ER_Bills WHERE AREA ='TEST AREA' ORDER BY BILLNUMBER DESC
select * from bhavani_ER_Bills WHERE AREA ='CHENNURU' ORDER BY BILLNUMBER DESC
-- BELL_INC_UPD_Bills 'TEST AREA','TEST SHOP','14-JUN-2024',22,'TEST ITEM NAME',100,'43(P)',43,1,3344,'RAJUE E',0
-- BELL_INC_UPD_Bills 'TEST AREA','TEST SHOP22','14-JUN-2024',33,'TEST ITEM NAME',100,'33(P)',33,1,3344,'RAJU',0
alter procedure BELL_INC_UPD_Bills
@AREA as varchar(30),
@SHOP AS VARCHAR(50),
@BILLDATE as DATE,
@ITEMCODE AS integer,
@ITEMNAME AS VARCHAR(30),
@PRICE AS VARCHAR(5),
@QTY AS VARCHAR(10),
@PACKETS AS integer,
@BILLNUMBER AS INTeger,
@AMOUNT AS integer,
@USERNAME AS VARCHAR(30),
@result int OUTPUT

AS             
BEGIN
	--IF NOT EXISTS(SELECT SHOPNAME FROM Bell_Cust_Master WHERE AREA=@AREA AND SHOPNAME=@SHOP)
	--BEGIN
	--	INSERT INTO Bell_Cust_Master (CUSTID,AREA,SHOPNAME,[STATUS]) VALUES(0,@AREA,@SHOP,'Active')
	--END
	--set @BILLDATE = FORMAT(@BILLDATE, 'dd-MMM-yyyy', 'en-US')
  set @BILLDATE = CONVERT(varchar(10),@BILLDATE,101)

  iF (SELECT COUNT(1) FROM bhavani_ER_Bills WHERE ITEMCODE=@ITEMCODE AND ITEMNAME=@ITEMNAME AND AREA=@AREA AND SHOPNAME=@SHOP
     AND BILLNUMBER=@BILLNUMBER AND CONVERT(varchar(10),BILLDATE,101) = @BILLDATE) = 0 
	BEGIN
	  insert into bhavani_ER_Bills (ITEMCODE,ITEMNAME,RATE,PACKETS,QTY,AMOUNT,BILLNUMBER,BILLDATE,AREA,SHOPNAME,USERNAME) 
	  values(@ITEMCODE,@ITEMNAME,@PRICE,@PACKETS,@QTY,@AMOUNT,@BILLNUMBER,@BILLDATE,@AREA,@SHOP,@USERNAME)
  END
  ELSE
  BEGIN
      UPDATE bhavani_ER_Bills SET RATE=@PRICE,PACKETS=@PACKETS,QTY=@QTY,AMOUNT=@AMOUNT,USERNAME=@USERNAME WHERE
        ITEMCODE=@ITEMCODE AND ITEMNAME=@ITEMNAME AND AREA=@AREA AND SHOPNAME=@SHOP
        AND BILLNUMBER=@BILLNUMBER AND CONVERT(varchar(10),BILLDATE,101) = @BILLDATE
  END
    SET @result = 1
	  SELECT @result AS RESULT
END
GO

SELECT * FROM Bell_Cust_Master WHERE USERNAME='RAJU'
SELECT * FROM Bell_Cust_Master WHERE LINE='ABCD-AREA'
SELECT * FROM Bell_Cust_Master WHERE CUSTID=0

-- BELL_INC_UPD_Customers 204,'TEST_LINE','TEST','SHOP','SALESMAN','CUST NAME','9581666602','RAJU',0
-- BELL_INC_UPD_Customers 0,'TEST LINE','TEST','SHOP','SALESMAN','CUST NAME','9581666602','RAJU',0
ALTER procedure BELL_INC_UPD_Customers
@CUSTID AS integer,
@LINE as varchar(50),
@AREA as varchar(50),
@SHOP AS VARCHAR(50),
@SALESMAN AS VARCHAR(30),
@CUSTOMERNAME AS VARCHAR(100),
@MOBILE AS VARCHAR(20),
@USERNAME AS VARCHAR(20),
@result int OUTPUT

AS             
BEGIN
  INSERT INTO Bell_Cust_Master (CUSTID,LINE,AREA,SHOPNAME,SALESMAN,CUSTOMERNAME,MOBILE,USERNAME,[STATUS]) VALUES(@CUSTID,@LINE,@AREA,@SHOP,@SALESMAN,@CUSTOMERNAME,@MOBILE,@USERNAME,'Active')
  /*
	IF NOT EXISTS(SELECT CUSTID FROM Bell_Cust_Master WHERE LINE=@LINE AND AREA=@AREA AND  CustID=@CUSTID AND STATUS='ACTIVE')
	BEGIN
		INSERT INTO Bell_Cust_Master (CUSTID,LINE,AREA,SHOPNAME,SALESMAN,CUSTOMERNAME,MOBILE,USERNAME,[STATUS]) VALUES(@CUSTID,@LINE,@AREA,@SHOP,@SALESMAN,@CUSTOMERNAME,@MOBILE,@USERNAME,'Active')
	END
  ELSE
  BEGIN
      UPDATE Bell_Cust_Master SET LINE=@LINE,AREA=@AREA,ShopName=@SHOP,SALESMAN=@SALESMAN,CustomerName=@CUSTOMERNAME,MOBILE=@MOBILE,
      USERNAME=@USERNAME,ACTIONDATE=GETDATE(),STATUS='Active'  WHERE CUSTID=@CUSTID
  END
  */
   SET @result = 1
	 SELECT @result AS RESULT
END
GO

--Update LS set WebSynced='N' where ID =1656222053 OR (BillDate='06-Aug-2024' AND Area='ABCD-AREA' AND ItemName='1 Rs Dry Jamun')

--Insert into BELL_LS (ITEMNAME,ITEMCODE,RATE,QTY,BILLDATE,AREA,T_B,R_B,D_B) Values('KRAZY KRAZY (CRAKER) 5RS',46,35.71,'560P (1)','13-May-2024','KHAGAZNAGAR',560,168,0 )
--delete from BELL_LS 
select * from bell_ls  ORDER BY BILLDATE

-- BELL_INC_UPD_LS_ITEMS '2024-09-04','TEST AREA','TEST item',22,100,'100(P)',22,1,1,'RAJUE E',0
-- BELL_INC_UPD_LS_ITEMS '2024-08-04','TEST AREA','TEST item',22,100,'100(P)',22,1,1,'RAJUE E',0
-- BELL_INC_UPD_LS_ITEMS '14-JUN-2024','TEST AREA','TEST item',22,100,'100(P)',22,1,1,'RAJUE E',0
ALTER procedure BELL_INC_UPD_LS_ITEMS
@BILLDATE as DATE,
@AREA as varchar(30),
@ITEMCODE AS integer,
@ITEMNAME AS VARCHAR(30),
@PRICE AS VARCHAR(5),
@QTY AS VARCHAR(10),
@T_B AS integer,
@R_B AS INTeger,
@D_B AS integer,
@USERNAME AS VARCHAR(30),
@result int OUTPUT

AS             
BEGIN
	set @BILLDATE = CONVERT(varchar(10),@BILLDATE,101)

  iF (SELECT COUNT(1) FROM BELL_LS WHERE ITEMCODE=@ITEMCODE AND ITEMNAME=@ITEMNAME AND AREA=@AREA AND CONVERT(varchar(10),BILLDATE,101) = @BILLDATE) = 0 
	BEGIN
  PRINT 'NO COUNT'
	  insert into BELL_LS (ITEMCODE,ITEMNAME,RATE,QTY,BILLDATE,AREA,USERNAME,T_B,R_B,D_B) 
	  values(@ITEMCODE,@ITEMNAME,@PRICE,@QTY,@BILLDATE,@AREA,@USERNAME,@T_B,@R_B,@D_B)
  END
  ELSE
  BEGIN
    PRINT 'RECORD EXIST'
    --SELECT * FROM BELL_LS WHERE ITEMCODE=@ITEMCODE AND ITEMNAME=@ITEMNAME AND AREA=@AREA AND CONVERT(varchar(10),BILLDATE,101) = @BILLDATE
      UPDATE BELL_LS SET RATE=@PRICE,QTY=@QTY,USERNAME=@USERNAME,T_B=@T_B,R_B=@R_B,D_B=@D_B WHERE
        ITEMCODE=@ITEMCODE AND ITEMNAME=@ITEMNAME AND AREA=@AREA AND CONVERT(varchar(10),BILLDATE,101) = @BILLDATE        
  END
    SET @result = 1
	  SELECT @result AS RESULT
END
GO

--Update Bell_Cust_Master set CUSTOMERNAME='Bhavani_Test',SHOPNAME='Bell Brand',MOBILE='7981146053' Where ID=6  

-- USP_GET_AREALIST_New not using

-- USP_GET_AREALIST 'users'
-- USP_GET_AREALIST 'category'
-- USP_GET_AREALIST 'lines'
-- USP_GET_AREALIST 'area'
-- USP_GET_AREALIST 'BHADRACHALAM'
-- USP_GET_AREALIST 'ETURNAGARAM'
alter procedure USP_GET_AREALIST 
@Type as varchar(20) = null,
@FROMDATE AS DATE = null,    
@TODATE AS DATE = null    
AS
Begin
  IF (lower(@Type) = 'users')
	Begin
    print 'its Item Categories'
		Select Distinct USERNAME as LINE,'' as Area,'' as ShopName,'' as CustomerName from Bell_USERS where Status='display'
	end
  else IF (lower(@Type) = 'category')
	Begin
    print 'its Item Categories'
		Select Distinct CATEGORY as LINE,'' as Area,'' as ShopName,'' as CustomerName  from Bell_ItemMaster --where Status='Active'
	end
	else IF (lower(@Type) = 'lines')
	Begin
    print 'its line'
		Select Distinct Line,'' as Area,'' as ShopName,'' as CustomerName  from Bell_Cust_Master where Status='Active' and isnull(Line,'') <> '' order by Line
	end
	else
	IF (isnull(@Type,'') = '' OR @Type = 'area')
	Begin
    print 'its area'
		Select Distinct Area,'' as Line,'' as ShopName,'' as CustomerName  from Bell_Cust_Master where Status='Active' and isnull(Area,'') <> '' order by Area
	end
	else
	begin
      print 'its shops'
		Select Distinct ShopName,CustomerName,'' as Area,'' as Line from Bell_Cust_Master where Status='Active' and Line=@Type  order by ShopName
    --select distinct ShopName, '' as Area,'' as CustomerName,'' as Line FROM bhavani_ER_Bills A    
    --WHERE Area=@Type AND (CONVERT(varchar(10),BILLDATE,102) Between CONVERT(varchar(10),@FROMDATE,102) and CONVERT(varchar(10),@TODATE,102))    
    --order by ShopName   
	end
End
GO

-- Bell_GET_CustomerDetails 1
alter procedure Bell_GET_CustomerDetails 
@ID AS int
AS
Begin	
	IF (isnull(@ID,'') <> '' )
	Begin
		Select ID, Area,ShopName,CustomerName,ISNULL(Mobile,'') Mobile,ISNULL(SalesMan,'') SalesMan,ISNULL(LAT,'') LAT,ISNULL(LNG,'') LNG,LandMark from Bell_Cust_Master where ID=@ID
	end	
End
GO

ALTER procedure Bell_SAVE_CustomerLocation 
@ID as INT,
@LAT AS VARCHAR(25) = null,
@LNG AS VARCHAR(25) = null,
@LANDMARK AS VARCHAR(50)
AS
Begin	
	IF (isnull(@ID,'') <> '')
	Begin
		UPDATE Bell_Cust_Master SET LAT=@LAT,LNG=@LNG,LANDMARK=@LANDMARK where ID=@ID
	end
End
GO

select * from Bell_Cust_Master WHERE CUSTID in (6,92)
select * from Bell_Cust_Master WHERE AREA='GAJWELL'
select * from bhavani_ER_Bills where CUSTID in (6,92)
-- BELL_GET_ItemsByMonth 53,'JAMMIKUNTA','ANIL KIRANAM','01-Apr-2024'
alter Procedure BELL_GET_ItemsByMonth
@CUSTID as varchar(5),
@AREA as varchar(30),
@SHOP AS VARCHAR(50),
@ORDERDATE as date
AS             
BEGIN  
	 DECLARE @FROMDATE AS DATE, @TODATE AS DATE	
	 SET @FROMDATE = DATEFROMPARTS(YEAR(@ORDERDATE),MONTH(@ORDERDATE),1)
	 --SET @FROMDATE = DATEADD(month, DATEDIFF(month, 0, @ORDERDATE), 0)
	 -- SELECT DATEFROMPARTS(YEAR(getdate()),MONTH(getdate()),1)
	 SET @TODATE = EOMONTH(@ORDERDATE) 

	select BILLID, ITEMNAME,ITEMCODE,RATE,PACKETS,QTY,AMOUNT,BILLNUMBER, 
	FORMAT(BILLDATE, 'dd/MM/yyyy', 'en-US') as BILLDATE FROM bhavani_ER_Bills A
	INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID
	where C.AREA=@AREA and C.shopname=@SHOP AND C.CustID=@CUSTID 
	AND (CONVERT(varchar(10),BILLDATE,102) Between CONVERT(varchar(10),@FROMDATE,102) and CONVERT(varchar(10),@TODATE,102))
	order by BillID 

END  
GO

-- BELL_GET_All_Items 'BELLAMPALLY','ALL','2024-08-20','2024-08-31'
-- BELL_GET_All_Items 'KHAMMAM','ALL'
ALTER Procedure BELL_GET_All_Items 
@AREA as varchar(30) = NULL,
@SHOPNAME AS VARCHAR(50) = null,
@FROMDATE AS DATE = null,
@TODATE AS DATE = null
AS             
BEGIN  	
	select distinct ITEMNAME,ITEMCODE FROM bhavani_ER_Bills A
	--INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID
	where A.AREA=(case lower(@AREA) when 'all' then A.AREA ELSE @AREA END) AND 
	A.SHOPNAME=(case lower(@SHOPNAME) when 'all' then A.SHOPNAME ELSE @SHOPNAME END) AND
  ISNULL(ITEMCODE,0) > 0   --ITEMCODE IS NOT NULL
  AND (CONVERT(varchar(10),BILLDATE,102) Between CONVERT(varchar(10),@FROMDATE,102) and CONVERT(varchar(10),@TODATE,102))
	order by ITEMCODE
END  
GO

-- BELL_SP_GET_All_LS_Items 'KHAMMAM','Bell Brand'
ALTER Procedure BELL_SP_GET_All_LS_Items  
@AREA as varchar(30) = NULL,
@SHOPNAME AS VARCHAR(50) = null
AS             
BEGIN  
	--SELECT FORMAT(GetDate(), 'dd/MM/yyyy', 'en-US' ) AS 'Date' ,FORMAT(123456789,'###-##-####') AS 'Custom Number';
	--,FORMAT(ActionDate, 'dd/MM/yyyy', 'en-US') as ActionDate 
	
	select BILLID,ITEMNAME,RATE,PACKETS,QTY,AMOUNT,BILLNUMBER, 
	FORMAT(BILLDATE, 'dd/MM/yyyy', 'en-US') as BILLDATE FROM bhavani_ER_Bills A
	--INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID
	where A.AREA=@AREA and A.shopname=@SHOPNAME order by BillID 	

	--select a.custid, BILLID, ITEMNAME,ITEMCODE,RATE,PACKETS,QTY,AMOUNT,BILLNUMBER, 
	--FORMAT(BILLDATE, 'dd/MM/yyyy', 'en-US') as BILLDATE FROM bhavani_ER_Bills A
	--INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID
	--where c.area='KHAMMAM' and c.ShopName='Bell Brand'
END  
GO

select C.CUSTID,BILLID, ITEMNAME,RATE,PACKETS,QTY,AMOUNT,BILLNUMBER, C.SHOPNAME,C.SALESMAN,C.AREA,
		A.ACTIONDATE,BILLDATE,
		FORMAT(BILLDATE, 'dd/MM/yyyy', 'en-US') as BILLDATE FROM bhavani_ER_Bills A 
		INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID 
		where C.AREA='KARIMNAGAR' and BILLDATE ='2024-Jun-13' order by AREA

select * from Bell_Cust_Master WHERE CustID IN (1944,2003)
ORDER BY CUSTID DESC
select * from Bell_Cust_Master WHERE AREA LIKE 'ABCD%'

SELECT * FROM bhavani_ER_Bills WHERE BILLDATE >='2024-Jun-13' ORDER BY BILLID DESC
AND CUSTID IN (3774)	

	SELECT * FROM bhavani_ER_Bills WHERE CUSTID=204
	
	select AREA,SUM(A.AMOUNT) AMOUNT, A.BILLDATE, 
	count(distinct billnumber) as TotalBills
	FROM bhavani_ER_Bills A INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID 
	WHERE C.AREA = (case lower('BHADRACHALAM') when 'all' then C.AREA ELSE 'BHADRACHALAM' END)
	AND CONVERT(varchar(10),BILLDATE,102) = CONVERT(varchar(10),'2024.05.25',102)
	GROUP BY CAST(BILLDATE AS DATE),AREA


--BELL_GET_TOTAL_SALES_BY_AREA 'Medak','2024-06-13','01-14-2025'
--BELL_GET_TOTAL_SALES_BY_AREA 'all','25-MAY-2024','01-14-2025'
-- BELL_GET_TOTAL_SALES_BY_AREA 'YELLAREDDYPETA','02-Jul-2024','01-14-2025'
 ALTER Procedure BELL_GET_TOTAL_SALES_BY_AREA
@AREA as varchar(30) = null,
@FROMDATE AS DATE = null,
@TODATE AS DATE = null  --NOT VALIDATING TODATE FOR NOW.
AS             
BEGIN  
	--SELECT FORMAT(GetDate(), 'dd/MM/yyyy', 'en-US' ) AS 'Date' ,FORMAT(123456789,'###-##-####') AS 'Custom Number';
	--,FORMAT(ActionDate, 'dd/MM/yyyy', 'en-US') as ActionDate 
	Declare @strQuery as varchar(1500)            
	Declare @strWhereQuery as varchar(500)
	--PRINT @FromDate
	IF (ISNULL(@FromDate,'') <> '' )
	BEGIN
		select A.AREA,SUM(A.AMOUNT) AMOUNT,count(distinct billnumber) as TotalBills,
		FORMAT(A.BILLDATE, 'dd-MMM-yyyy', 'en-US') as BILLDATE 
		FROM bhavani_ER_Bills A 
		--INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID 
		WHERE A.AREA = (case lower(@AREA) when 'all' then A.AREA ELSE @AREA END)
		--AND CONVERT(varchar(10),BILLDATE,102) = CONVERT(varchar(10),@FROMDATE,102)
		--AND BILLDATE = @FROMDATE
		AND CONVERT(varchar(10),ActionDate,102) = CONVERT(varchar(10),@FROMDATE,102)
		GROUP BY A.AREA,CAST(BILLDATE AS DATE)
	END
END  
GO

-- BELL_GET_TOTAL_SALES_BY_AREA_NEW 'ALL','2024-11-23',''
-- BELL_GET_TOTAL_SALES_BY_AREA_NEW 'BAYYARAM','2024-11-23',''
ALTER Procedure BELL_GET_TOTAL_SALES_BY_AREA_NEW
@AREA as varchar(30) = null,
@FROMDATE AS DATE = null,
@SEARCHBY AS VARCHAR(15)
AS             
BEGIN  
	--SELECT FORMAT(GetDate(), 'dd/MM/yyyy', 'en-US' ) AS 'Date' ,FORMAT(123456789,'###-##-####') AS 'Custom Number';
	--,FORMAT(ActionDate, 'dd/MM/yyyy', 'en-US') as ActionDate 
	Declare @strQuery as varchar(1500)            
	Declare @strWhereQuery as varchar(500)
	--PRINT @FromDate
	IF (ISNULL(@FromDate,'') <> '' )
	BEGIN
		IF @SEARCHBY='BILLDATE'
		BEGIN
			select A.AREA
      --,SUM(A.AMOUNT) AMOUNT
      ,CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT
      ,count(distinct billnumber) as TotalBills,USERNAME,
			FORMAT(A.BILLDATE, 'dd-MMM-yyyy', 'en-US') as BILLDATE FROM bhavani_ER_Bills A 
			WHERE A.AREA = (case lower(@AREA) when 'all' then A.AREA ELSE @AREA END)
			AND CONVERT(varchar(10),BILLDATE,102) = CONVERT(varchar(10),@FROMDATE,102)
			GROUP BY A.AREA,CAST(BILLDATE AS DATE),USERNAME
			ORDER BY A.AREA
		END
		ELSE
		BEGIN
			select A.AREA
      --,SUM(A.AMOUNT) AMOUNT
      ,CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT
      ,count(distinct billnumber) as TotalBills,USERNAME,
			FORMAT(A.BILLDATE, 'dd-MMM-yyyy', 'en-US') as BILLDATE FROM bhavani_ER_Bills A 
			WHERE A.AREA = (case lower(@AREA) when 'all' then A.AREA ELSE @AREA END)
			AND CONVERT(varchar(10),ActionDate,102) = CONVERT(varchar(10),@FROMDATE,102)
			GROUP BY A.AREA,CAST(BILLDATE AS DATE),USERNAME
			ORDER BY A.AREA
		END
	END
END  
GO

SELECT * FROM bhavani_ER_Bills WHERE AREA='BELLAMPALLY' AND BILLDATE='29-Jul-2024' and itemname='BOONDHI 350GM'

select * FROM bhavani_ER_Bills where area='ETURNAGARAM ' and billdate='02-Nov-2024' order by itemname
select * FROM bell_ls where area='BELLAMPALLY' and billdate='29-Jul-2024' and itemname IN ('BOONDHI 350GM')

-- BELL_GET_LS_ItemsByArea_Date 'ETURNAGARAM','02-Nov-2024'
-- BELL_GET_LS_ItemsByArea_Date 'MULUGU','14-JUN-2024'
-- BELL_GET_LS_ItemsByArea_Date 'KARIMNAGAR','13-JUN-2024'
ALTER Procedure BELL_GET_LS_ItemsByArea_Date
@AREA as varchar(30) = null,
@BILLDATE AS DATE = null
AS             
BEGIN		
	IF (ISNULL(@BILLDATE,'') <> '' )
	BEGIN
		--select A.CUSTID, ITEMNAME,RATE,PACKETS,QTY,AMOUNT,BILLNUMBER, C.SHOPNAME, ISNULL(C.SALESMAN,'') SALESMAN,C.AREA,
		--BILLDATE FROM bhavani_ER_Bills A INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID 
		--where C.AREA=@AREA
		--AND CONVERT(varchar(10),BILLDATE,102) = CONVERT(varchar(10),@BILLDATE,102)
    --INNER JOIN Bell_Cust_Master C ON C.CUSTID = A.CUSTID

    select A.ITEMNAME,SUM(PACKETS) AS QTY,B.R_B AS RET_QTY,A.AREA
    --,SUM(A.AMOUNT) AS AMOUNT,
    ,CAST(ISNULL(SUM(AMOUNT)/100.0,0) AS DECIMAL(12,2)) AMOUNT    
   --,(select R_B AS RET_QTY2 FROM BELL_LS LS WHERE LS.AREA=@AREA AND CONVERT(varchar(10),LS.BILLDATE,102) = CONVERT(varchar(10),@BILLDATE,102)
    --AND LS.ITEMCODE=A.ITEMCODE AND LS.ITEMNAME=A.ITEMNAME)
		FROM bhavani_ER_Bills A INNER JOIN BELL_LS B ON A.AREA=B.AREA AND A.ITEMCODE=B.ITEMCODE AND A.BILLDATE=B.BILLDATE AND A.ITEMNAME=B.ItemName
		where A.AREA=@AREA AND CONVERT(varchar(10),A.BILLDATE,102) = CONVERT(varchar(10),@BILLDATE,102)
		GROUP BY A.ITEMCODE,A.ITEMNAME,A.AREA,B.R_B ORDER BY A.ITEMCODE
	END
END  
GO


SELECT * FROM bhavani_ER_Bills WHERE AREA='MULUGU' AND BILLDATE='14-JUN-2024'
with SHOPS (AREA,SHOPNAME,AMOUNT) 
		as(
			select A.AREA,A.SHOPNAME,SUM(AMOUNT) FROM bhavani_ER_Bills A where A.AREA='MULUGU' AND
			BILLDATE='14-JUN-2024' GROUP BY AREA,SHOPNAME
		) 
		SELECT C.AREA,C.SHOPNAME,ISNULL(C.SALESMAN,'') SALESMAN,LandMark,Mobile FROM Bell_Cust_Master C 
		WHERE C.SHOPNAME NOT IN (SELECT SHOPNAME FROM SHOPS) AND C.AREA = 'MULUGU'

-- BELL_GET_INACTIVE_SHOPS 'all','01-Oct-2024','25-Nov-2024'
-- BELL_GET_INACTIVE_SHOPS 'MULUGU','01-Oct-2024','25-Nov-2024'
-- BELL_GET_INACTIVE_SHOPS 'MULUGU','10-JUN-2024','15-JUN-2024'
ALTER Procedure BELL_GET_INACTIVE_SHOPS
@AREA as varchar(30),
@BILLDATE1 AS DATE,
@BILLDATE2 AS DATE
AS             
BEGIN		
	IF (ISNULL(@BILLDATE1,'') <> '' )
	BEGIN		
		with SHOPS (AREA,SHOPNAME,AMOUNT) 
		as(
			select A.AREA,A.SHOPNAME,SUM(AMOUNT) FROM bhavani_ER_Bills A where A.AREA=@AREA AND
			(A.BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))		
			GROUP BY AREA,SHOPNAME
		) 
		SELECT C.AREA,C.SHOPNAME,ISNULL(C.SALESMAN,'') SALESMAN,LandMark,Mobile FROM Bell_Cust_Master C 
		WHERE C.SHOPNAME NOT IN (SELECT SHOPNAME FROM SHOPS) AND C.AREA = @AREA

	END
END  
GO

--BELL_GET_LS_ItemsByDate 'BELLAMPALLY','25-MAY-2024','01-14-2025'
--BELL_GET_LS_ItemsByDate 'KHAMMAM','01-JAN-2023','01-14-2025'
 ALTER Procedure BELL_GET_LS_ItemsByDate
@AREA as varchar(30) = null,
@FROMDATE AS DATE = null,
@TODATE AS DATE = null
AS             
BEGIN  
	--SELECT FORMAT(GetDate(), 'dd/MM/yyyy', 'en-US' ) AS 'Date' ,FORMAT(123456789,'###-##-####') AS 'Custom Number';
	--,FORMAT(ActionDate, 'dd/MM/yyyy', 'en-US') as ActionDate 
	Declare @strQuery as varchar(1500)            
	Declare @strWhereQuery as varchar(500)
	
	IF (@FromDate <>'' and @FromDate is not null)
	BEGIN
		--set @strWhereQuery= ' AND (CONVERT(varchar(10),BILLDATE,102) Between '''+ CONVERT(varchar(10),@FromDate,102) + ''' and  '''+ CONVERT(varchar(10),@ToDate,102) + ''')'	
		set @strWhereQuery= ' AND CONVERT(varchar(10),BILLDATE,102) = ''' + CONVERT(varchar(10),@FROMDATE,102) + ''' '
	END

	SET @strQuery = 'select BILLID,ITEMNAME,RATE,PACKETS,QTY,AMOUNT,BILLNUMBER,SHOPNAME,AREA,
		FORMAT(BILLDATE, ''dd/MM/yyyy'', ''en-US'') as BILLDATE FROM bhavani_ER_Bills where AREA= ''' + @AREA + '''' 

	PRINT @strQuery + @strWhereQuery + ' order by ITEMNAME'
	EXEC(@strQuery + @strWhereQuery + ' order by ITEMNAME')	

END  
GO

----------------------
select row_number() over(order by ID) as SNO,
Area,ShopName,CustomerName,Mobile,SalesMan,LAT,LNG,LANDMARK from Bell_Cust_Master M where STATUS = 'Active'

select ID,Area,ShopName,CustomerName,Mobile,SalesMan,LAT,LNG,LANDMARK from Bell_Cust_Master M where STATUS = 'Active'

-- BELL_SP_GET_All_LS_Customers 'ALL','ALL','all'
-- BELL_SP_GET_All_LS_Customers 'ETURNAGARAM','all','all'
ALTER Procedure BELL_SP_GET_All_LS_Customers  
@LINE as varchar(30) = NULL,
@AREA as varchar(30) = NULL,
@SHOP as varchar(30) = NULL
AS             
BEGIN  

 Declare @strQuery as varchar(1500)            
 Declare @strWhereQuery as varchar(500)            
 Declare @strGroupByQuery as varchar(500)            
 set @strWhereQuery='where STATUS = ''Active''' --WHERE 1=1 '    
 set @strGroupByQuery = ''
 if (@SHOP = '') set @SHOP = 'all'

 IF (@LINE <>'' AND @LINE IS NOT NULL and lower(@LINE) <> 'all')
BEGIN	
	Set @strWhereQuery = @strWhereQuery + ' AND LINE = ' + ''''+ @LINE + ''''
END

--IF (@AREA <>'' AND @AREA IS NOT NULL and lower(@AREA) <> 'all')
--BEGIN
--	--Set @strWhereQuery = @strWhereQuery + ' AND ID = ' + CAST(@UserID as varchar)            
--	Set @strWhereQuery = @strWhereQuery + ' AND AREA = ' + ''''+ @AREA + ''''
--END
-- --IF (@FromDate <>'' and @FromDate is not null)
----set @strWhereQuery=@strWhereQuery +  N' AND (CONVERT(varchar(10),BILLDATE,102) Between '''+ CONVERT(varchar(10),@FromDate,102) + ''' and  '''+ CONVERT(varchar(10),@ToDate,102) + ''')'	
-- IF (@SHOP <>'' AND @SHOP IS NOT NULL and lower(@SHOP) <> 'all')
--	BEGIN                                  
--	   Set @strWhereQuery = @strWhereQuery + ' AND ShopName = ' + ''''+ @SHOP + ''''
--	END
--with group
--SET @strQuery = 'select sum(Amount) as TotalAmount,count(1) as TotalItems,Area,ShopName,CustomerName,SalesMan FROM bhavani_ER_Bills '
--without group 
--SET @strQuery = 'select ID,Area,ShopName,CustomerName,Mobile,SalesMan FROM bhavani_ER_Bills '
SET @strQuery = 'select row_number() over(order by ID) as SNO,LINE,Area,ShopName,CustomerName,Mobile,SalesMan from Bell_Cust_Master M '
--,LAT,LNG,LANDMARK
--M.CustomerName in (select distinct customername from bhavani_ER_Bills where Area=M.Area and ShopName = M.ShopName)

Print (@strQuery + @strWhereQuery)
-- + ' group by Area,ShopName,CustomerName,SalesMan order by Area desc'
EXEC(@strQuery + @strWhereQuery + ' ORDER BY LINE')

END  
GO

-- BELL_SP_GET_All_Customer_BILL_DETAILS 'NARSAMPET'
-- BELL_SP_GET_All_Customer_BILL_DETAILS 'ALL','all'
-- BELL_SP_GET_All_Customer_BILL_DETAILS NULL, '2024-03-19','2024-03-19'
-- BELL_SP_GET_All_Customer_BILL_DETAILS 'NARSAMPET', '2024-03-19','2024-03-19'
ALTER Procedure BELL_SP_GET_All_Customer_BILL_DETAILS --not using now
@AREA as varchar(30) = NULL,
@SHOP as varchar(30) = NULL
AS             
BEGIN  

 Declare @strQuery as varchar(1500)            
 Declare @strWhereQuery as varchar(500)            
 Declare @strGroupByQuery as varchar(500)            
 set @strWhereQuery='where 1=1 '    
 set @strGroupByQuery = ''

IF (@AREA <>'' AND @AREA IS NOT NULL and @AREA <> 'all')
BEGIN
	--Set @strWhereQuery = @strWhereQuery + ' AND ID = ' + CAST(@UserID as varchar)            
	Set @strWhereQuery = @strWhereQuery + ' AND AREA = ' + ''''+ @AREA + ''''
END
 --IF (@FromDate <>'' and @FromDate is not null)
 IF (@SHOP <>'' AND @SHOP IS NOT NULL and @SHOP <> 'all')
	BEGIN                                  
	   --set @strWhereQuery=@strWhereQuery +  N' AND (CONVERT(varchar(10),BILLDATE,102) Between '''+ CONVERT(varchar(10),@FromDate,102) + ''' and  '''+ CONVERT(varchar(10),@ToDate,102) + ''')'	
	   Set @strWhereQuery = @strWhereQuery + ' AND ShopName = ' + ''''+ @SHOP + ''''
	END
--with group
SET @strQuery = 'select sum(Amount) as TotalAmount,count(1) as TotalItems,Area,ShopName FROM bhavani_ER_Bills '
--Print (@strQuery + @strWhereQuery) 
EXEC(@strQuery + @strWhereQuery + ' group by Area,ShopName order by Area desc')

END  
GO

--@FROMDATE as date = null,
--@TODATE as date = null

--SELECT FORMAT(GetDate(), 'dd/MM/yyyy', 'en-US' ) AS 'Date' ,FORMAT(123456789,'###-##-####') AS 'Custom Number';
--select BILLID, ITEMNAME,ShopName,ITEMCODE,RATE,PACKETS,QTY,AMOUNT,BILLNUMBER,
--FORMAT(BILLDATE, 'dd/MM/yyyy', 'en-US') as BILLDATE,AREA,FORMAT(ActionDate, 'dd/MM/yyyy', 'en-US') as ActionDate 
--FROM bhavani_ER_Bills where area=@area and shopname=@shopname and billdate between @fromdate and @todate
--order by billID desc
--select sum(Amount) as TotalAmount,count(1) as TotalItems,Area,ShopName,billdate FROM bhavani_ER_Bills group by Area,ShopName,billdate
/*select sum(Amount) as TotalAmount,count(1) as TotalItems,Area,ShopName FROM bhavani_ER_Bills 
where area=@AREA and (BILLDATE between CONVERT(varchar(10),@FromDate,102) and CONVERT(varchar(10),@TODATE,102) ) group by Area,ShopName
order by Area desc  */

-- USP_MONTHLY_SALE_ITEMS_COUNT '2024-FEB-01','2024-06-01','ETURNAGARAM','ALL'
-- USP_MONTHLY_SALE_ITEMS_COUNT '2024-FEB-01','2024-06-01','YELLAREDDYPETA','ALL'
ALTER PROCEDURE USP_MONTHLY_SALE_ITEMS_COUNT 
@BILLDATE1 AS DATE,
@BILLDATE2 AS DATE,
@AREA AS NVARCHAR(20),
@SHOP AS NVARCHAR(20)
AS
BEGIN

--TO GET FIRST DAY FROM GIVEN DATE
--* SELECT DATEFROMPARTS(YEAR(getdate()),MONTH(getdate()),1)
--SELECT DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS StartOfMonth
--SELECT CONCAT(datepart(year,'2024-Feb-01'),'-', CONVERT(CHAR(3), '2024-Feb-01', 100), '-01')
--TO GET LAST DAY FROM  GIVEN DATE
--SELECT EOMONTH('2020-04-15'); 

Begin
	with cte (AREA,SHOPNAME,ITEMNAME,JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,[DEC]) 
	as(
	select AREA,ShopName,ITEMNAME,
	case when MONTH(billdate) = '1' then PACKETS else 0 end
	as JAN,
	case when MONTH(billdate) = '2' then PACKETS else 0 end
	as FEB,
	case when MONTH(billdate) = '3' then PACKETS else 0 end
	as MAR,
	case when MONTH(billdate) = '4' then PACKETS else 0 end
	as APR,
	case when MONTH(billdate) = '5' then PACKETS else 0 end
	as MAY,
	case when MONTH(billdate) = '6' then PACKETS else 0 end
	as JUN,
	case when MONTH(billdate) = '7' then PACKETS else 0 end
	as JUL,
	case when MONTH(billdate) = '8' then PACKETS else 0 end
	as AUG,
	case when MONTH(billdate) = '9' then PACKETS else 0 end
	as SEP,
	case when MONTH(billdate) = '10' then PACKETS else 0 end
	as OCT,
	case when MONTH(billdate) = '11' then PACKETS else 0 end
	as NOV,
	case when MONTH(billdate) = '12' then PACKETS else 0 end
	as [DEC]	
	--from bhavani_ER_Bills
	FROM bhavani_ER_Bills A 
	--INNER JOIN Bell_Cust_Master B ON A.CustID=B.CustID 
	WHERE A.AREA=@AREA and --YEAR(BILLDATE) = YEAR(@BILLDATE1)
	 BillDate BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101)
	 and SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)
	)
	select DISTINCT AREA,SHOPNAME,ITEMNAME
	,sum(JAN) as JAN,sum(FEB) as FEB,sum(MAR) as MAR,sum(APR) as APR,sum(MAY) as MAY,sum(JUN) as JUN,sum(JUL) as JUL,sum(AUG) as AUG,
	sum(SEP) as SEP,sum(OCT) as OCT,sum(NOV) as NOV,sum([DEC]) as [DEC] from cte 
	Group by AREA,SHOPNAME,ITEMNAME order by SHOPNAME, ITEMNAME
	--UNION
	--(SELECT CUSTID ,AREA,SHOPNAME,CUSTOMERNAME,0 as JAN,0 as FEB,0 as MAR,0 as APR,0 as MAY,0 as JUN,0 as JUL,0 as AUG,
	--0 as SEP,0 as OCT,0 as NOV,0 AS [DEC] 
	--FROM Bell_Cust_Master WHERE AREA=@AREA AND CUSTID NOT IN (SELECT CUSTID FROM bhavani_ER_Bills WHERE AREA=@AREA))
	
End
END
GO

--- NOT USING
CREATE PROCEDURE BELL_AREA_WISE_ITEM_COUNT
@AREA AS NVARCHAR(50),
@SHOP AS NVARCHAR(50),
@ITEMNAME AS NVARCHAR(50),
@BILLDATE1 AS DATE,
@BILLDATE2 AS DATE
AS
BEGIN

--DECLARE @Bell_TEMP_REPORT AS TABLE(BILLDATE VARCHAR(20), NAME VARCHAR(50),QTY INT)
DECLARE @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)
--,@ITEMNAMES AS VARCHAR(200)

--DECLARE @TEMP_REPORT AS TABLE (@BILLDATE VARCHAR(15),@ITEMNAME VARCHAR(50),@QTY INT)
--DELETE FROM Bell_TEMP_REPORT

DELETE FROM Bell_REPORT_HEADER
CREATE TABLE dbo.#TEMP_REPORT (BILLDATE VARCHAR(20), AREA VARCHAR(50),NAME VARCHAR(50),QTY INT)

--SET @ITEMNAMES = REPLACE(@ITEMNAME,'#','''')
--PRINT @ITEMNAMES

  Insert into #TEMP_REPORT
  select FORMAT(BILLDATE, 'dd-MMM-yy') as BILLDATE,AREA,ITEMNAME,ISNULL(SUM(PACKETS),0) QTY from bhavani_ER_Bills
  WHERE AREA=(case lower(@AREA) when 'all' then AREA ELSE @AREA END) and 
  SHOPNAME = (case lower(@SHOP) when 'all' then SHOPNAME ELSE @SHOP END)
  AND ITEMNAME IN (@ITEMNAME)
  and (BILLDATE BETWEEN CONVERT(nvarchar(10),@BILLDATE1,101) AND CONVERT(nvarchar(10),@BILLDATE2,101))
  GROUP BY BILLDATE,AREA,ITEMNAME order by AREA

--Select * from #TEMP_REPORT --order by shopname desc
--SELECT * FROM Bell_REPORT_HEADER

INSERT INTO Bell_REPORT_HEADER SELECT DISTINCT BILLDATE FROM #TEMP_REPORT   --(STORING BILLDATE INTO SHOPNAME COL)

--*FOR PIVOTE, FIRST GET DISTINCT COLUMN NAMES AND THEN USE PIVOTE
select @cols = STUFF((SELECT ',' + '['+ QUOTENAME(HEADER_NAME) + ']'
                    from Bell_REPORT_HEADER
                    group by HEADER_NAME --order by HEADER_NAME
            FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)') 
        ,1,1,'')

set @query = 'SELECT * from (select * from #TEMP_REPORT '  
            +' ) x pivot (AVG(QTY) for BILLDATE in (' + REPLACE(REPLACE(@cols,'[[','['),']]',']') + ') ) p '

PRINT @query
exec sp_executesql @query;
end
Go

CHIKKY 4841
KHARA 18993
MOONGDAL 445
CHIKKY JAR 4410-4390
SELECT * FROM Bell_STOCK_ENTRY WHERE ACTIONDATE > '2024-12-22' ORDER BY ACTIONDATE DESC
--DELETE FROM Bell_STOCK_ENTRY WHERE ACTIONDATE > '2024-12-22'
SELECT * FROM BELL_LINKED_ITEMS 
SELECT TOP 1 RAWMATERIAL_ID,RAWMATERIAL_NAME FROM BELL_LINKED_ITEMS WHERE ITEMCODE=1 AND ITEMNAME='khara 5 RS'

-- BELL_INC_UPD_ITEMS_STOCK 1,'khara 5 RS',10,'10P(1)','RAJU','OUT',0    
-- BELL_INC_UPD_ITEMS_STOCK 2002,'Maida',10,'2C(10)','RAJU','IN',0    
ALTER procedure BELL_INC_UPD_ITEMS_STOCK  
@ITEMCODE AS integer,    
@ITEMNAME as varchar(50),    
@STOCK as INTEGER,    
@QTY AS VARCHAR(15),    
@USERNAME AS VARCHAR(30),
@TRANS_TYPE AS VARCHAR(10),
@PARTYNAME AS VARCHAR(30),
@result int OUTPUT    
    
AS                 
BEGIN    
  INSERT INTO Bell_STOCK_ENTRY (ITEMCODE,ITEMNAME,STOCK,QTY,USERNAME,TRANS_TYPE,PARTYNAME) VALUES(@ITEMCODE,@ITEMNAME,@STOCK,@QTY,@USERNAME,@TRANS_TYPE,@PARTYNAME)
  IF @TRANS_TYPE = 'OUT' -- DEBIT
  BEGIN
	  UPDATE Bell_ItemMaster SET STOCK=STOCK-@STOCK,USERNAME=@USERNAME,ActionDate=GETDATE() WHERE ITEMNAME=@ITEMNAME AND ITEMCODE=@ITEMCODE  
  END
  ELSE --IF @TRANS_TYPE='IN'  -- CREDIT
  BEGIN
	  UPDATE Bell_ItemMaster SET STOCK=STOCK+@STOCK,USERNAME=@USERNAME,ActionDate=GETDATE() WHERE ITEMNAME=@ITEMNAME AND ITEMCODE=@ITEMCODE

    --** TO UPDATE STOCK AUTOMATICALLY FOR ANY RAW MATERIAL (LIKE CORTON) LINKED WITH ACTUAL ITEM.
    DECLARE @LINKED_ITEMCODE INT, @LINKED_ITEMNAME AS VARCHAR(50)
    SET @LINKED_ITEMCODE = 0
    --SET @LINKED_ITEMNAME = ''
    SELECT TOP 1 @LINKED_ITEMCODE=RAWMATERIAL_ID,@LINKED_ITEMNAME=RAWMATERIAL_NAME FROM BELL_LINKED_ITEMS WHERE ITEMCODE=@ITEMCODE AND ITEMNAME=@ITEMNAME
    IF @LINKED_ITEMCODE > 0
    BEGIN
      INSERT INTO Bell_STOCK_ENTRY (ITEMCODE,ITEMNAME,STOCK,QTY,USERNAME,TRANS_TYPE,PARTYNAME) VALUES(@LINKED_ITEMCODE,@LINKED_ITEMNAME,@STOCK,@QTY,@USERNAME,'OUT','COMPANY LINKED RM')
      UPDATE Bell_ItemMaster SET STOCK=STOCK-@STOCK,USERNAME=@USERNAME,ActionDate=GETDATE() WHERE ITEMNAME=@LINKED_ITEMNAME AND ITEMCODE=@LINKED_ITEMCODE
    END
  END
  
 --IF NOT EXISTS(SELECT 'X' FROM Bell_ItemMaster WHERE ITEMNAME=@ITEMNAME AND ITEMCODE=@ITEMCODE)    
  --BEGIN    
  -- INSERT INTO Bell_ItemMaster (ITEMCODE,ITEMNAME,STOCK,USERNAME) VALUES(@ITEMCODE,@ITEMNAME,@STOCK,@USERNAME)  
  --END    
  --ELSE    
  --BEGIN    
  --  UPDATE Bell_ItemMaster SET STOCK=STOCK+@STOCK,USERNAME=@USERNAME,ActionDate=GETDATE()    
  --  WHERE ITEMNAME=@ITEMNAME AND ITEMCODE=@ITEMCODE  
  --END    
      
   SET @result = 1    
  SELECT @result AS RESULT    
END 
GO

select distinct category from Bell_ItemMaster 

SELECT A.*,B.CATEGORY,FORMAT(A.ActionDate, 'dd-MMM-yyyy', 'en-US') as Action_DATE
,CONVERT(nvarchar(10),a.ACTIONDATE,101)
FROM Bell_STOCK_ENTRY A INNER JOIN Bell_ItemMaster B ON A.ITEMCODE=B.ITEMCODE AND A.ITEMNAME=B.ITEMNAME
WHERE A.ActionDate > = CONVERT(nvarchar(10),'2024-12-01',101) AND A.ActionDate <= CONVERT(nvarchar(10),dateadd(d,1,'2024-12-14'),101)
WHERE (A.ActionDate BETWEEN CONVERT(nvarchar(10),'2024-12-01',101) AND CONVERT(nvarchar(10),dateadd(d,1,'2024-12-14'),101))

--(FORMAT(A.ActionDate, 'MM/dd/yyyy', 'en-US') BETWEEN CONVERT(nvarchar(10),'2024-12-01',101) AND CONVERT(nvarchar(10),'2024-12-30',101))

SELECT CONVERT(varchar(50),DATEADD(wk, DATEDIFF(wk, 6, '1/1/' + @YearNum) + (@WeekNum-1), 6),101) AS StartOfWeek;
SELECT DATEADD(d, 1,getdate())

SELECT * FROM Bell_STOCK_ENTRY WHERE TRANS_TYPE IN ('D','C')
  
-- BELL_STOCK_DETAILS 'All','[RAW MATERIALS]' 
-- BELL_STOCK_DETAILS 'ALL','all'  
-- BELL_STOCK_DETAILS 'ALL','[SWEETS],[BISCUITES]'  
-- BELL_STOCK_DETAILS 'MINORDER','RAW MATERIALS'  
-- BELL_STOCK_DETAILS 'MINORDER','NAMKEEN'  
alter PROCEDURE BELL_STOCK_DETAILS
@TYPE as Varchar(10) ,
@CATEGORY as nvarchar(max)
AS    
BEGIN
DECLARE @script AS NVARCHAR(max), @query2 AS NVARCHAR(max)
set @query2 = ''
 --CAST(LEFT(PACKINGTYPE, 1) AS CHAR(1)) + '(' + CAST(TOTALITEMSINPACK AS NVARCHAR(4))+ ')' AS QTY,   
if lower(@CATEGORY) <> 'all'    
begin    
  set @query2 = ' AND CATEGORY in (' + REPLACE(REPLACE(@CATEGORY,'[',''''),']','''') + N') '    
end

if lower(@TYPE) = 'all'  
BEGIN   
 set @script = N' SELECT ITEMCODE,ITEMNAME,ISNULL(RATE1,0) AS RATE, ISNULL(MRP,0) MRP, ISNULL(CATEGORY,'''') CATEGORY,  
 ISNULL(MinOrderAlert,0) MinOrderAlert,  
 CAST(ISNULL(MinOrderAlert,0) AS NVARCHAR(5)) + '' '' + PACKINGTYPE as [Description],  
 ISNULL(CAST((ROUND(STOCK/TOTALITEMSINPACK,0)) AS NVARCHAR(5) ) + '' '' + CAST(LEFT(PACKINGTYPE, 1) AS CHAR(1)) + ''('' + CAST(TOTALITEMSINPACK AS NVARCHAR(4))+ '')'','''') AS QTY,   
 ISNULL(STOCK,0) AS STOCK FROM BELL_ITEMMASTER where Status=''Active'' ' + @query2

--AND CATEGORY = (case lower(@CATEGORY) when 'all' then CATEGORY ELSE @CATEGORY END)
END  
ELSE  
BEGIN  
 set @script = N' SELECT ITEMCODE,ITEMNAME,ISNULL(RATE1,0) AS RATE, ISNULL(MRP,0) MRP, ISNULL(CATEGORY,'''') CATEGORY,  
 ISNULL(MinOrderAlert,0) MinOrderAlert,  
 CAST(ISNULL(MinOrderAlert,0) AS NVARCHAR(5)) + '' '' + PACKINGTYPE as [Description],  
 ISNULL(CAST((ROUND(STOCK/TOTALITEMSINPACK,0)) AS NVARCHAR(5) ) + '' '' + CAST(LEFT(PACKINGTYPE, 1) AS CHAR(1)) + ''('' + CAST(TOTALITEMSINPACK AS NVARCHAR(4))+ '')'','''') AS QTY,   
 ISNULL(STOCK,0) AS STOCK FROM BELL_ITEMMASTER where Status=''Active''   
 AND (STOCK/TOTALITEMSINPACK) <= MINORDERALERT ' + @query2 
END

print @query2 
print @script    
EXEC sp_executesql @script

END
go

SELECT A.ItemName,B.CATEGORY,A.TRANS_TYPE AS [IN/OUT],A.Qty,A.STOCK PAK,    
    FORMAT(A.ActionDate, 'dd-MMM-yyyy', 'en-US') as ACTION_DATE,A.PARTYNAME,A.USERNAME  
     FROM Bell_STOCK_ENTRY A INNER JOIN Bell_ItemMaster B ON A.ITEMCODE=B.ITEMCODE AND A.ITEMNAME=B.ITEMNAME
    WHERE (A.ACTIONDATE BETWEEN CONVERT(nvarchar(10),@FROMDATE,101) AND CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101))    
      AND CATEGORY in ('SWEETS','BISCUITES') 
    UNION ALL
    SELECT LS.ITEMNAME,M.CATEGORY,'OUT' AS [IN/OUT],LS.QTY,(T_B-R_B-D_B) AS PAK,
    FORMAT(LS.BILLDATE, 'dd-MMM-yyyy', 'en-US') as ACTION_DATE,'AREA -' + AREA AS PARTYNAME,LS.USERNAME
    FROM BELL_LS LS
    INNER JOIN BELL_ITEMMASTER B ON M.ITEMCODE=LS.ITEMCODE AND B.ITEMNAME=LS.ITEMNAME 
    WHERE (LS.BILLDATE BETWEEN CONVERT(nvarchar(10),@FROMDATE,101) AND CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101))
     AND CATEGORY in ('SWEETS','BISCUITES')

     SELECT A.ItemCode,A.ItemName,B.CATEGORY,A.TRANS_TYPE AS [IN/OUT],A.Qty,A.STOCK PAK,    
    FORMAT(A.ActionDate, 'dd-MMM-yyyy', 'en-US') as ACTION_DATE,A.PARTYNAME,A.USERNAME  
     FROM Bell_STOCK_ENTRY A INNER JOIN Bell_ItemMaster B ON A.ITEMCODE=B.ITEMCODE AND A.ITEMNAME=B.ITEMNAME
    WHERE (A.ACTIONDATE BETWEEN '12/01/2024' AND '12/31/2024') 
    AND TRANS_TYPE = 'IN'  AND B.CATEGORY in ('Raw Materials')
    
-- BELL_GET_STOCK_TRANSACTIONS '[SWEETS],[BISCUITES]','ALL','2024-12-01','2024-12-30','SUGUNA'
-- BELL_GET_STOCK_TRANSACTIONS '[SWEETS],[BISCUITES]','ALL','2024-12-01','2024-12-30','ALL'
-- BELL_GET_STOCK_TRANSACTIONS '[Raw Materials]','IN','2024-12-01','2024-12-30','ALL'
-- BELL_GET_STOCK_TRANSACTIONS 'SWEETS','OUT','2024-12-01','2024-12-30','ALL'
-- BELL_GET_STOCK_TRANSACTIONS 'ALL','ALL','2024-12-01','2024-12-30','ALL'
alter procedure BELL_GET_STOCK_TRANSACTIONS
@CATEGORY as nvarchar(max),
@TRANS_TYPE AS VARCHAR(10),
@FROMDATE AS DATE,
@TODATE AS DATE,
@USERNAME AS VARCHAR(20)

AS
DECLARE @QUERY AS NVARCHAR(200)
BEGIN

DECLARE @script AS NVARCHAR(max), @query2 AS NVARCHAR(max)
set @query2 = ''
if lower(@CATEGORY) <> 'all'    
begin    
  set @query2 = ' AND B.CATEGORY in (' + REPLACE(REPLACE(@CATEGORY,'[',''''),']','''') + N') '    
end
-- AND B.CATEGORY = (case lower(@CATEGORY) when 'all' then B.CATEGORY ELSE @CATEGORY END)
--(CASE LOWER(A.TRANS_TYPE) WHEN 'C' THEN 'IN' ELSE 'OUT' END) AS [IN/OUT]  
  IF UPPER(@TRANS_TYPE)='ALL'
  BEGIN
    set @script = N' SELECT A.ItemName,B.CATEGORY,A.TRANS_TYPE AS [IN/OUT],A.Qty,A.STOCK PAK,    
    FORMAT(A.ActionDate, ''dd-MMM-yyyy'', ''en-US'') as ACTION_DATE,A.PARTYNAME,A.USERNAME  
     FROM Bell_STOCK_ENTRY A INNER JOIN Bell_ItemMaster B ON A.ITEMCODE=B.ITEMCODE AND A.ITEMNAME=B.ITEMNAME
    WHERE A.USERNAME = (case lower('''+ @USERNAME +''') when ''all'' then A.USERNAME ELSE '''+ @USERNAME +''' END) AND
    (A.ACTIONDATE BETWEEN '''+CONVERT(nvarchar(10),@FROMDATE,101)+''' AND '''+CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101) +''')    
     ' + @query2 + '
    UNION ALL
    SELECT LS.ITEMNAME,B.CATEGORY,''OUT'' AS [IN/OUT],LS.QTY,(T_B-R_B-D_B) AS PAK,
    FORMAT(LS.BILLDATE, ''dd-MMM-yyyy'', ''en-US'') as ACTION_DATE,''AREA -'' + AREA AS PARTYNAME,LS.USERNAME
    FROM BELL_LS LS
    INNER JOIN BELL_ITEMMASTER B ON B.ITEMCODE=LS.ITEMCODE AND B.ITEMNAME=LS.ITEMNAME 
    WHERE LS.USERNAME = (case lower('''+@USERNAME+''') when ''all'' then LS.USERNAME ELSE '''+@USERNAME +''' END) AND
    (LS.BILLDATE BETWEEN '''+CONVERT(nvarchar(10),@FROMDATE,101)+''' AND '''+CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101)+''')
    ' + @query2      
  END
  ELSE IF UPPER(@TRANS_TYPE)='IN' OR UPPER(@TRANS_TYPE)='C'
  BEGIN
    set @script = N' SELECT A.ItemCode,A.ItemName,B.CATEGORY,A.TRANS_TYPE AS [IN/OUT],A.Qty,A.STOCK PAK,    
    FORMAT(A.ActionDate, ''dd-MMM-yyyy'', ''en-US'') as ACTION_DATE,A.PARTYNAME,A.USERNAME  
     FROM Bell_STOCK_ENTRY A INNER JOIN Bell_ItemMaster B ON A.ITEMCODE=B.ITEMCODE AND A.ITEMNAME=B.ITEMNAME
    WHERE A.USERNAME = (case lower('''+@USERNAME+''') when ''all'' then A.USERNAME ELSE '''+@USERNAME +''' END) AND
    (A.ACTIONDATE BETWEEN '''+CONVERT(nvarchar(10),@FROMDATE,101)+''' AND '''+CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101)+''') 
    AND TRANS_TYPE = ''IN'' ' + @query2    
  END
  ELSE IF UPPER(@TRANS_TYPE)='OUT' OR UPPER(@TRANS_TYPE)='D'
  BEGIN
    set @script = N' SELECT A.ItemName,B.CATEGORY,A.TRANS_TYPE AS [IN/OUT],A.Qty,A.STOCK PAK,    
    FORMAT(A.ActionDate, ''dd-MMM-yyyy'', ''en-US'') as ACTION_DATE,A.PARTYNAME,A.USERNAME  
     FROM Bell_STOCK_ENTRY A INNER JOIN Bell_ItemMaster B ON A.ITEMCODE=B.ITEMCODE AND A.ITEMNAME=B.ITEMNAME
    WHERE A.USERNAME = (case lower('''+@USERNAME+''') when ''all'' then A.USERNAME ELSE '''+@USERNAME +''' END) AND
    (A.ACTIONDATE BETWEEN '''+CONVERT(nvarchar(10),@FROMDATE,101)+''' AND '''+CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101)+''')     
    AND TRANS_TYPE = ''OUT'' ' + @query2  + '  
    UNION ALL
    SELECT LS.ITEMNAME,B.CATEGORY,''OUT'' AS [IN/OUT],LS.QTY,(T_B-R_B-D_B) AS PAK,
    FORMAT(LS.BILLDATE, ''dd-MMM-yyyy'', ''en-US'') as ACTION_DATE,''AREA -'' + AREA AS PARTYNAME,LS.USERNAME
    FROM BELL_LS LS
    INNER JOIN BELL_ITEMMASTER B ON B.ITEMCODE=LS.ITEMCODE AND B.ITEMNAME=LS.ITEMNAME 
    WHERE LS.USERNAME = (case lower('''+@USERNAME+''') when ''all'' then LS.USERNAME ELSE '''+@USERNAME +''' END) AND
    (LS.BILLDATE BETWEEN '''+CONVERT(nvarchar(10),@FROMDATE,101)+''' AND '''+CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101)+''') ' + @query2       
  END

  print @query2 
  print @script    
  EXEC sp_executesql @script
END 
GO

----NOT using, managing with Line/Area/Shop SP.
--create procedure BELL_GET_ALL_CATEGORIES
--AS
--Begin
--  Select Distinct CATEGORY from Bell_ItemMaster --where Status='Active'
--End
--GO


-- BELL_GET_LS_ORDER_ITEMS 'TEST AREA','06-16-2024'
ALTER procedure BELL_GET_LS_ORDER_ITEMS 
@AREA as varchar(30),
@BILLDATE as varchar(15)
AS               
BEGIN
  --TODO: MODIFY USING JOINS
  --select ITEMCODE,ITEMNAME,RATE1,PACKINGTYPE,TotalItemsInPack,
  --(SELECT QTY FROM BELL_LS LS WHERE LS.AREA =@AREA AND LS.BILLDATE= CONVERT(nvarchar(10),@BILLDATE,101) AND
  --LS.ITEMCODE=BELL_ITEMMASTER.ITEMCODE ) AS QTY,
  --(SELECT ID FROM BELL_LS LS WHERE LS.AREA = @AREA AND
  --LS.BILLDATE=CONVERT(nvarchar(10),@BILLDATE,101) AND LS.ITEMCODE=BELL_ITEMMASTER.ITEMCODE ) AS LSID ,
  --(SELECT T_B FROM BELL_LS LS WHERE AREA =@AREA  AND LS.BILLDATE=CONVERT(nvarchar(10),@BILLDATE,101) AND LS.ITEMCODE=BELL_ITEMMASTER.ITEMCODE) AS PACKS
  --from BELL_ITEMMASTER ORDER BY ITEMCODE

  select ITEM.ITEMCODE,ITEM.ITEMNAME,ITEM.RATE1,ITEM.PACKINGTYPE,ITEM.TotalItemsInPack,
  ISNULL(LS.QTY,0) QTY,ISNULL(LS.ID,0) AS LSID,ISNULL(LS.T_B,0) AS PACKS from BELL_ITEMMASTER ITEM LEFT JOIN BELL_LS LS ON LS.ITEMCODE=ITEM.ITEMCODE
  AND LS.AREA =@AREA AND LS.BILLDATE= CONVERT(nvarchar(10),@BILLDATE,101)  
   ORDER BY ITEM.ITEMCODE 

  --select ITEM.ITEMCODE,ITEM.ITEMNAME,ITEM.RATE1,ITEM.PACKINGTYPE,ITEM.TotalItemsInPack,
  --LS.QTY,LS.ID,LS.T_B AS PACKS from BELL_ITEMMASTER ITEM LEFT JOIN BELL_LS LS ON LS.ITEMCODE=ITEM.ITEMCODE
  --AND LS.AREA ='TEST AREA' AND LS.BILLDATE= CONVERT(nvarchar(10),'05-15-2024',101)  
  --ORDER BY ITEM.ITEMCODE

END
GO

--not using for now.
-- BELL_GET_STOCK_IN_OUT_BYITEM 'kHARA 5 RS','D','2024-12-01','2024-12-30'
ALTER procedure BELL_GET_STOCK_IN_OUT_BYITEM
@CATEGORY as varchar(30),
@ITEMNAME as varchar(30),
@TRANS_TYPE AS VARCHAR(10),
@FROMDATE AS DATE,
@TODATE AS DATE

AS
DECLARE @QUERY AS NVARCHAR(200)
BEGIN

  SELECT A.ITEMNAME, FORMAT(A.ActionDate, 'dd-MMM-yyyy', 'en-US') as BILLDATE,
  A.PARTYNAME AS LOCATION,A.USERNAME,A.STOCK AS PACKS,'IN' AS TRANSTYPE FROM BELL_STOCK_ENTRY A 
  WHERE TRANS_TYPE='IN' AND ITEMNAME=@ITEMNAME
  AND (A.ACTIONDATE BETWEEN CONVERT(nvarchar(10),@FROMDATE,101) AND CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101))
  Union All
  SELECT A.ITEMNAME,A.ACTIONDATE AS BILLDATE,A.PARTYNAME AS LOCATION,A.USERNAME,A.STOCK AS PACKS,'OUT' AS TRANSTYPE FROM BELL_STOCK_ENTRY A 
  WHERE TRANS_TYPE='OUT' AND ITEMNAME=@ITEMNAME
  AND (A.ACTIONDATE BETWEEN CONVERT(nvarchar(10),@FROMDATE,101) AND CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101))
  Union All 
  SELECT LS.ITEMNAME,BILLDATE,'AREA -' + AREA AS LOCATION,LS.USERNAME,(T_B-R_B-D_B) AS PACKS,'OUT' AS TRANSTYPE FROM BELL_LS LS
  INNER JOIN BELL_ITEMMASTER M ON M.ITEMCODE=LS.ITEMCODE AND M.ITEMNAME=LS.ITEMNAME 
  WHERE LS.ITEMNAME=@ITEMNAME AND M.CATEGORY=@CATEGORY AND
  (LS.BILLDATE BETWEEN CONVERT(nvarchar(10),@FROMDATE,101) AND CONVERT(nvarchar(10),dateadd(d,1,@TODATE),101))

END
GO


CREATE procedure BELL_INC_UPD_MASTER_ITEMS  
@ITEMCODE AS INTEGER,      
@ITEMNAME as varchar(50),      
@CATEGORY AS VARCHAR(30),  
@PACKINGTYPE AS VARCHAR(20),  
@TOTALITEMSINPACK AS INTEGER,  
@RATE1 AS VARCHAR(5),  
@RATE2 AS VARCHAR(5),  
@RATE3 AS VARCHAR(5),  
@MRP AS VARCHAR(5),  
@MINORDERALERT AS INTEGER,  
@STOCK as INTEGER,      
@USERNAME AS VARCHAR(30),      
@result int OUTPUT          
AS                   
BEGIN      
    
  IF NOT EXISTS(SELECT 'X' FROM Bell_ItemMaster WHERE ITEMNAME=@ITEMNAME AND ITEMCODE=@ITEMCODE)      
  BEGIN      
 --SELECT * FROM Bell_ItemMaster   
 INSERT INTO Bell_ItemMaster (ITEMCODE,ITEMNAME,PACKINGTYPE,MRP,TOTALITEMSINPACK,CATEGORY,RATE1,RATE2,RATE3,STOCK,MINORDERALERT,[STATUS],USERNAME)   
 VALUES(@ITEMCODE,@ITEMNAME,@PACKINGTYPE,@MRP,@TOTALITEMSINPACK,@CATEGORY,@RATE1,@RATE2,@RATE3,@STOCK,@MINORDERALERT,'Active',@USERNAME)      
  END      
  ELSE      
  BEGIN      
    UPDATE Bell_ItemMaster SET PACKINGTYPE=@PACKINGTYPE,MRP=@MRP,TOTALITEMSINPACK=@TOTALITEMSINPACK,CATEGORY=@CATEGORY,  
 RATE1=@RATE1,RATE2=@RATE2,RATE3=@RATE3,STOCK=@STOCK,  
 MINORDERALERT=@MINORDERALERT,[STATUS]='Active',USERNAME=@USERNAME,ActionDate=GETDATE()      
    WHERE ITEMNAME=@ITEMNAME AND ITEMCODE=@ITEMCODE    
  END      
        
   SET @result = 1      
  SELECT @result AS RESULT      
END
GO

SELECT * FROM bhavani_ER_Bills
SELECT * FROM Bell_ItemMaster WHERE ITEMCODE IN (1,2,3,5,6)
BELL_UPD_ITEMS_PRATE_MINORDER 2,40,8,'WEB-RAJU'

CREATE PROCEDURE  BELL_UPD_ITEMS_PRATE_MINORDER  
@ITEMCODE AS INTEGER,
@PRATE AS MONEY,  
@MINORDERALERT AS INTEGER,  
@USERNAME AS VARCHAR(30)      
AS                   
BEGIN          
  
    UPDATE Bell_ItemMaster SET PRATE=@PRATE, MINORDERALERT=@MINORDERALERT,USERNAME=@USERNAME,ActionDate=GETDATE()      
    WHERE ITEMCODE=@ITEMCODE    -- AND ITEMNAME=@ITEMNAME
        
END   
