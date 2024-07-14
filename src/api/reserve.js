import request from "@/utils/request.js"

export function addReserve(data) {
    return request.post('/addReserve', data)
}

export function searchReserve(_id, _isDoctor) {
    const data = {
        id: _id,
        isDoctor: _isDoctor
    }
    return request.post('/searchReserve', data)
}
export function motifiedReserve(_old, _timeSeg) {
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

export function removeReserve(data) {
    return request.post('/removeReserve', data)
}

export const searchAvailableTime = (_id, _date) => {
    const data = {
        id: _id,
        date: _date
    }
    return request.post('/searchAvailableTime', data)
}

export const getSelectedDoctorId = (_data) => {
    return request.post('/getSelectedDoctorId', _data)
}