# API  
## /login
@params {id : string, password  : string, isDocter: bool}  
@return {status : bool, token : string , msg : string , role : string}
## /register
@params {username : string,password : string , position : string, isDocter:bool,...剩下的按数据库命名}  
@return {status : bool, msg : string}

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
@return {isAvailable : array[boolean]}

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
