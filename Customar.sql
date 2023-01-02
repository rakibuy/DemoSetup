
-----------  User Table Create ---------------
CREATE TABLE Users(
	Id BIGINT Primary Key Identity,
    UserName varchar(50) Not Null,
    Email varchar(50) Not Null,
    Number varchar(15) Not Null,

	
    PasswordHash varbinary Not Null,
    PasswordSalt varbinary Not Null,
	RefreshToken varchar,
	TokenCreated datetime2(7),
	TokenExpires datetime2(7),

	[Role] Int,
	AddedBy varchar(30) Not Null,
	AddedDate datetime Not Null,
	AddedFromIP varchar(30) Not Null,


	UpdatedBy varchar(30),
	UpdatedDate datetime,
	UpdatedFromIP varchar(30),
)


GO
-------  Leads Table  ----
Create Table ALeads(
	Id BIGINT Primary Key Identity,
	CName varchar(30) Not Null,
	CNumber varchar(15) Not Null,
	CAddress varchar(500),
	CEmail varchar(30) Not Null,
	COccupation varchar(30),
	CDesignation varchar(30),

	AddedBy varchar(30) Not Null,
	AddedDate datetime Not Null,
	AddedFromIP varchar(30) Not Null,


	UpdatedBy varchar(30),
	UpdatedDate datetime,
	UpdatedFromIP varchar(30),
)
go
Drop Table Leads