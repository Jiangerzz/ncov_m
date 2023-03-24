import axios from 'axios'
import router from "@/router"
import Cookies from 'js-cookie'

//创建一个axios对象
const request = axios.create({
    baseURL: 'http://localhost:9090/api',
    timeout: 5000
})

//request拦截器
request.interceptors.request.use(config => {
    //在请求头加参数
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    const adminJson = Cookies.get('admin');
    if(adminJson){

        config.headers['token'] = JSON.parse(adminJson).token
    }
    return config
},error => {
    return Promise.reject(error)
});

//response拦截器
request.interceptors.response.use(
    response => {
        //对返回的数据进行处理
        let res = response.data;
        //兼容服务端返回的字符串数据
        if(typeof res === 'string'){
            res = res ? JSON.parse(res) : res
        }
        if(res.code === '401'){
            router.push('/login')
        }
        return res;
    },
    error => {
        console.log('err' + error) //for debug
        return Promise.reject(error)
    }
)

export default request