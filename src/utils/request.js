import axios from 'axios'
import { getToken } from './auth'
import { useRouter } from 'vue-router'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const router = useRouter()
const service = axios.create(
    {
        baseURL: 'http://8.138.127.170/api', // 请自行替换为您的后端 API 服务器地址
        timeout: 10000
    }
)
service.interceptors.request.use(config => {
    var token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    return config
})

service.interceptors.response.use(response => response,
    error => {
        if (error.response && error.response.status === '401'){
            router.push('/login')
        }
        return Promise.reject(error)
    }
)
export default service