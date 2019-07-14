import qs from 'qs';
import store from '../store/store';
import { Service, http} from './api';


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
export const getUsers = data => {//用户数据列表
    return http('users', 'get', data);
}
export const getMenus = data => {//左侧菜单权限
    return http('menus', 'get', data);
}
export const getUserById = data => {// 根据 ID 查询用户信息
    return http('users/'+data.id, 'get', data);
}
export const setUserState = data => {//设置用户状态
    return http('users/'+data.uid+'/state/'+data.type, 'put', data);
}
export const editUser = data => {//编辑用户提交
    return http('users/'+data.id, 'put', data);
}
export const deleteUser = data => {//删除用户
    return http('users/'+data.id, 'delete', data);
}
export const getRoles = data => {//角色列表
    return http('roles', 'get', data);
}
export const setUserRole = data => {//设置用户角色
    return http('users/'+data.id+'/role', 'put', data);
}
export const getRoleById = data => {//根据 ID 查询角色
    return http('roles/'+data.id, 'get', data);
}
export const addUser = data => {//添加用户
    return http('users', 'post', data);
}
export const addRole = data => {//添加角色
    return http('roles', 'post', data);
}
export const editRole = data => {//编辑提交角色
    return http('roles/'+data.id, 'put', data);
}
export const deleteRole = data => {//删除角色
    return http('roles/'+data.id, 'delete', data);
}
export const setRoleRights = data => {//角色授权
    return http('roles/'+data.roleId+'/rights', 'post',data.rids);
}
export const getRights = data => {//所有权限列表
    return http('rights/'+data.type, 'get', data);
}
