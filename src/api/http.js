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
export const deleteRoleRights = data => {//删除角色指定权限
    return http('roles/'+data.roleId+'/rights/'+data.rightId, 'delete', data);
}
export const getGoods = data => {// 商品列表数据
    return http('goods', 'get', data);
}
export const addGoods = data => {//添加商品
    return http('goods', 'post', data);
}
export const deleteGoods = data => {//删除商品
    return http('goods/'+data.id, 'delete', data);
}
export const editGoods = data => {//编辑提交商品
    return http('goods/'+data.id, 'put', data);
}

export const getCategoriesById = data => {//参数列表
    return http('categories/'+data.id+'/attributes', 'get', data);
}
export const getCategories = data => {//商品分类列表
    return http('categories', 'get', data);
}
export const addCategories = data => {//添加分类
    return http('categories', 'post',data);
}
export const editCategories = data => {//编辑提交分类
    return http('categories/'+data.id, 'put',data);
}
export const deleteCategories = data => {//删除分类
    return http('categories/'+data.id, 'delete',data);
}
export const queryParams = data => {//根据 ID 查询参数
    return http('categories/'+data.id+'/attributes', 'get',data);
}
export const editAttributes = data => {//编辑提交参数
    return http('categories/'+data.id+'/attributes/'+data.attrId, 'put',data);
}
export const addAttributes = data => {//添加动态参数或者静态属性
    return http('categories/'+data.id+'/attributes', 'post',data);
}
export const deleteAttributes = data => {//删除参数
    return http('categories/'+data.id+'/attributes/'+data.attrId, 'delete',data);
}


export const syncGoodsAttr = data => {//同步商品属性
    return http('goods/'+data.id+'/attributes', 'put', data);
}

