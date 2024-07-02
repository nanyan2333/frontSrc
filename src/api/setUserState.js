import request from "@/utils/request.js"
import { da } from "element-plus/es/locales.mjs"
export function login(_id, _pass) {
    const data = {
        id: _id,
        password: _pass
    }
    return request.post('/login', data)
}
export function register(data) {
    return request.post('/register', data)
}
export function getPermission(_id,_role) {
    const data = {
        id: uuname,
        role : _role
    }
    return request.post('/permission',data)
}

