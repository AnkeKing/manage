//使用axios 请求数据
import axios from 'axios'
import qs from 'qs';
import store from '../store/store';
import router from '../router/index';
import { Message } from 'iview';

let Service = axios.create({//需要token拦截的请求
    baseURL: 'http://localhost:8888/api/private/v1/',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});
Service.interceptors.request.use(config => {
    store.commit("setLoading", true);
    if (store.state.token) {
        config.headers['Authorization'] = store.state.token;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

Service.interceptors.response.use(response => {
    store.commit("setLoading", false);
    return response;
}, error => {
    store.commit("setLoading", false);
    return Promise.reject(error)
})

function http(url, method, data) {
    return Service({
        url: url,
        method: method,
        data: data,
        params:data
    }).then(res => {
        console.log("---------",res)
        if (res) {
            if (res.data.meta.status === 200||res.data.meta.status === 201||res.data.meta.status === 204) {
                Message.success(res.data.meta.msg)
                return res.data.data;
            } else {
                if(res.data.meta.msg==="无效token"){
                    router.replace({
                        name:"login"
                    })
                }
                Message.error(res.data.meta.msg);
            }
        }
    }).catch(error => {
        Promise.reject(error);
    })
}

export { Service, http,http2}

