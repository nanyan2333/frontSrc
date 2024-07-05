import request from "@/utils/request.js"

export function addReserve(data) {
    return request.post('/addReserve', data)
}

export function searchReserve(_id, _isDocter) {
    const data = {
        id: _id,
        isDocter: _isDocter
    }
    console.log(data)
    return request.post('/searchReserve', data)
}
export function motifiedReserve(_old,_timeSeg) {
//old:{
// 	patientId: "",
// 	doctorId: "",
// 	resDate: "",
// 	timeSeg: "",
// }
    const data = {
        old: _old,
        timeSeg: _timeSeg
    }
    return request.post('/motifiedReserve', data)
}

export function removeReserve(data){
    return request.post('/removeReserve', data)
}

export const searchAvailableTime = (_id,_date) => {
    const data = {
        id: _id,
        date: _date
    }
    return request.post('/searchAvailableTime', data)
}