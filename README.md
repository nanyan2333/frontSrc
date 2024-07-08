# API  
## /login
@params {id : string, password  : string, isDoctor: bool}  
@return {status : bool, token : string , msg : string , role : string}
## /register
@params {id : string,password : string , position : string, isDoctor:bool,...剩下的按数据库命名}  
@return {status : bool, msg : string}

## /getInfo
@params {id : string,role : string}
@return {按数据库命名}
## /updateInfo
@params {id : string, role: string ,updateInfo : object} 
@return {status : bool, msg : string}

## /addReserve
@params {pid : string,did : string,date : string, timeSeg:string}  
@return {status : bool, msg : string}
## /removeReserve
@params {pid : string,did : string, date:string, timeSeg:string}   
@return {status : bool, msg:string}
## /searchReserve
@params {id : string , isDoctor:bool}  
@return {reserve : array[object]}

## /searchAvailableTime
@params {id:string,  date:string}  
@return {notAvailable : array[boolean]}

## /searchRecord
@params {id : string}  
@return {record : array[object]}  

## /addRecord
@params {date : string , did: string, record:object}  
@return {status : bool , msg:string}

## /getHistory
@params {pid : string}  
@return {history : array[object]}

## /updateRecord
@params {pid : string, updateInfo : object, date:string }  
@return {status : bool, msg:string}

## /getChatHistory
@params {patientId, doctorId}   
@return {messages : array[...{fromId,fromRole,timeMap:string,content:string}]}
