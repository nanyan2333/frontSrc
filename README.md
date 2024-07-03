# API  
## /login
@params {id : string, password  : string, isDocter: bool}  
@return {status : bool, token : string , msg : string , role : string}
## /register
@params {username : string,password : string , position : string, isDocter:bool,...剩下的按数据库命名}  
@return {status : bool, msg : string}

## /getRouters  //先别写,这个可能废弃
@params {id : string, role : string}  
@return {route : array[string],active_name : array[string]}  
## /updateInfo
@params {id : string, role: string ,updateInfo : object} 
@return {status : bool, msg : string}

## /addReserve
@params {pid : string,did : string,time : string}  
@return {status : bool, msg : string}
## /removeReserve
@params {pid : string,did : string,startTime : string, endTime : string}   
@return {status : bool, msg:string}
## /searchReserve
@params {id : string,isDoctor:bool}  
@return {reserve : array[object]}

## /searchRecord
@params {id : string}  
@return {record : array[object]}  

## /addRecord
@params {pid: string, did: string, record:object}  
@return {status : bool , msg:string}

## /getHistory
@params {pid : string}  
@return {history:array[object]}

## /updateRecord
@params {pid : string, updateInfo : object}  
@return {status : bool, msg:string}
