import request from "@/utils/request.js"
export function login(_id, _pass, _isDoctor) {
    const data = {
        id: _id,
        password: _pass,
        isDoctor: _isDoctor
    }
    return request.post('/login', data)
}
export function register(data) {
    return request.post('/register', data)
}
export function getRouters(_id, _role) {
    const data = {
        id: _id,
        role: _role
    }
    return request.post('/getRouters', data)
}

