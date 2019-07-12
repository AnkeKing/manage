import qs from 'qs';
import store from '../store/store';
import { Service, http } from './api';


export const login = data => {//登录
    return Service({
        url: "login",
        method: 'post',
        data: data
    }).then(res => {
        if (res) {
            if (res.data.meta.status === 200) {
                store.commit('setToken', res.data.data.token);
                // store.commit('setUserId', res.data.result.id);
                store.dispatch("showWarning", res.data.meta.msg);
                return res.data.data;
            } else {
                store.dispatch("showWarning", res.data.meta.msg);
            }
        }
    })
}
export const getUsers = data => {//左侧菜单权限
    return http('users', 'get', data, data);
}
export const getMenus = data => {//用户数据列表
    return http('menus', 'get', data, data);
}
export const setUserState = data => {//用户数据列表
    return http('users/'+data.uid+'/state/'+data.type, 'put', data, data);
}
