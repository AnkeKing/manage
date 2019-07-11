import qs from 'qs';
import store from '../store/store';
import { Service, http } from './api';


export const login = data => {//登录
    return Service({
        url: "login",
        method: 'post',
        data: data
    }).then(res => {
        console.log('send.js:',res);
        if (res.data.meta.status === 200) {
            store.commit('setToken', res.data.data.token);
            // store.commit('setUserId', res.data.result.id);
            store.dispatch("showWarning",res.data.meta.msg);
            return res.data.data;
        } else {
            store.dispatch("showWarning",res.data.meta.msg);
        }
    })
}
// export const sendRegisterVerigyCode = data => {//注册发送验证码
//     return http('/user/sms', 'post', data, data);
// }