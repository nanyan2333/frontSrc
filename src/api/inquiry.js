import request from "@/utils/request.js"

export const getChatHistory = (_patientId,_doctorId) => {
    const data = {
        patientId: _patientId,
        doctorId: _doctorId
    }
    return request.post('/getChatHistory', data)
}