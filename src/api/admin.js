import request from "@/utils/request.js"

export const getPageDoctorInfo = (_page,_eachPageNum) => {
    const data = {
        page: _page,
        eachPageNum: _eachPageNum
    }
    return request.post('/getPageDoctorInfo', data)
}