import request from "@/utils/request.js"

export function addReserve(data) {
    return request.post('/reserve', data)
}

export function searchReserve(_id, _isDocter) {
    const data = {
        id: _id,
        isDocter: _isDocter
    }
    return request.post('/searchReserve', data)
}
export function motifiedReserve(_old,_newStartTime,_newEndTime) {
    const data = {
        old: _old,
        newStartTime: _newStartTime,
        newEndTime: _newEndTime
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