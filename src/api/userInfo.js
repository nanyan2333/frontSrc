import request from "@/utils/request.js"
export const updateInfo = (_id, _role, _updateInfo) => {
    const data = {
        id: _id,
        role: _role,
        user_password: _updateInfo.user_password,
        contact: _updateInfo.contact,
        sepcialty: _updateInfo.sepcialty,
        position: _updateInfo.position,
    }
    return request.post('/updateInfo', data)
}

export const getInfo = (_id, _isDoctor) => {
    const data = {
        id: _id,
        isDoctor: _isDoctor
    }
    return request.post('/getInfo', data)
}