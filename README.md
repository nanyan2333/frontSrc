# API  
## /login
@params {username : string, password  : string}  
@return {status : bool, role :string ,info :string}
## /register
@params {username : string,password : string , position : string, isDocter:bool,...剩下的按数据库命名}  
@return {status : bool, info : string}

## /getPermission
@params {id : string, role : string}  
@return {route : array[string],active_name : array[string]}  
## /updateInfo
@params {id : string, role: string ,updateInfo : object} 
@return {status : bool}

## /addReserve
@params {pid : string,did : string,time : string}  
@return {status : bool}
## /removeReserve
@params {pid : string,did : string,startTime : string, endTime : string}   
@return {status : bool}
## /searchReserve
@params {id : string,isDoctor:bool}  
@return {reserve : array[object]}

## /record
@params {id : string}  
@return {record:object}

## /history
@params {id : string}  
@return {history:object}

## /updateRecord
@params {id : string, updateInfo : object}  
@return {status : bool}
