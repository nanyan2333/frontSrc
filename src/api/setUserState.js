import request from "@/utils/request.js"
import { da } from "element-plus/es/locales.mjs"
export function login(_id, _pass,_isDocter) {
    const data = {
        id: _id,
        password: _pass,
        isDocter: _isDocter  
    }
    return request.post('/login', data)
}
export function register(data) {
    return request.post('/register', data)
}
export function getRouters(_id,_role) {
    const data = {
        id: _id,
        role : _role
    }
    return request.post('/getRouters',data)
}

