//使用axios 请求数据
import axios from 'axios'
import qs from 'qs';
import store from '../store/store';
import router from '../router/index';

let Service = axios.create({//需要token拦截的请求
    baseURL: 'http://localhost:8888/api/private/v1/',
    timeout: 5000,
    retry : 4,
    retryDelay :1000,
    // headers: {'Content-Type': 'application/json'}
});
Service.interceptors.request.use(config => {
    store.commit("setLoading", true);
    if (store.state.token) {
        axios.defaults.headers.common['Authorization'] = store.state.token;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

Service.interceptors.response.use(response => {
    store.commit("setLoading", false);
    
    return response;
}, error => {
    // if (error.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
    //     // store.dispatch("showWarnAsync", {//提示信息
    //     //     warnBool: true,
    //     //     warnText: "网络请求超时",
    //     // });
    // }
    
    // var config = error.config;
    // // If config does not exist or the retry option is not set, reject
    // //如果配置不存在或重试选项未设置，拒绝
    // if(!config || !config.retry) return Promise.reject(err);
    
    // // Set the variable for keeping track of the retry count
    // //设置变量以跟踪重试计数
    // config.__retryCount = config.__retryCount || 0;
    
    // // Check if we've maxed out the total number of retries
    // //检查是否我们已经刷爆重试的总数
    // if(config.__retryCount >= config.retry) {
    //     // Reject with the error
    //     //处理错误
    //     return Promise.reject(error);
    // }
    
    // // Increase the retry count
    // //增加重试次数
    // config.__retryCount += 1;
    
    // // Create new promise to handle exponential backoff
    // //创建新的promise来处理指数退避
    // var backoff = new Promise(function(resolve) {
    //     setTimeout(function() {
    //         resolve();
    //     }, config.retryDelay || 1);
    // });
    
    // Return the promise in which recalls axios to retry the request
     //返回召回axios的promise，重试请求

     store.commit("setLoading", false);
    // return backoff.then(function() {
    //     return axios(config);
    // });
})

function http(url, method, data, params) {
    return Service({
        url: url,
        method: method,
        data: data,
        params,
    }).then(res => {
        if (res.data.meta.status === 200) {
            store.commit('setToken', res.data.data.token);
            // store.commit('setUserId', res.data.result.id);
            store.dispatch("showWarning",res.data.meta.msg);
            return res.data.data;
        } else {
            store.dispatch("showWarning",res.data.meta.msg);
        }
    }).catch(error=>{
        Promise.reject(error);
    })
}
export { Service,http}

