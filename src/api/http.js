/* 导入 */
import axios from 'axios'
import router from '../router/router'


/* 副本接口基地址 */
const managerAxios = axios.create({
    baseURL: `http://localhost:8888/api/private/v1/`
})
/* 设置拦截器 */
// 添加请求拦截器 (每次请求前都会响应一次)
managerAxios.interceptors.request.use(function (config) {
    /* 添加请求头 */
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
managerAxios.interceptors.response.use(function (response) {
    /* 伪造token的处理 */
    /* console.log(response);
    console.log('huilaile'); */

    if (response.data.meta.status == 400 && response.data.meta.msg == '无效token') {
        window.sessionStorage.clear()
        router.push('/login')
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

/* 暴露查询的调用方法-----登录 */
export const login = ({
    username,
    password
}) => {
    return managerAxios.post('/login', {
        username,
        password
    })
}

/* 暴露查询的调用方法-----获取用户列表 */
export const users = ({
    query,
    pagenum,
    pagesize
}) => {
    return managerAxios.get('/users', {
        params: {
            query,
            pagenum,
            pagesize
        },
        /* 设置请求头 */
        /*  headers: {
             Authorization: window.sessionStorage.getItem('token')
         } */
    })
}

/* 暴露查询的调用方法-----获取左侧菜单权限 */
export const menus = () => {
    return managerAxios.get('/menus', {
        /*  headers: {
             Authorization: window.sessionStorage.getItem('token')
         } */
    })
}


/* 暴露查询的调用方法-----获取权限列表 */
export const rightsList = () => {
    return managerAxios.get('rights/list')
}


/* 暴露查询的调用方法-----添加用户 */
export const addUser = ({
    username,
    password,
    email,
    mobile
}) => {
    return managerAxios.post('users', {
        username,
        password,
        email,
        mobile
    })
}

/* 暴露查询的调用方法-----删除用户 */
export const deleteUser = ({
    id
}) => {
    return managerAxios.delete(`users/${id}`)
}

/* 暴露查询的调用方法-----更新用户状态 */
export const updateUserState = ({
    uId,
    type
}) => {
    return managerAxios.put(`users/${uId}/state/${type}`)
}

/* 暴露查询的调用方法-----编辑用户信息*/
export const editUser = ({
    id,
    email,
    mobile
}) => {
    return managerAxios.put(`users/${id}`, {
        email,
        mobile
    })
}


/* 暴露查询的调用方法-----用户角色列表*/
export const roles = () => {
    return managerAxios.get('roles')
}


/* 暴露查询的调用方法-----分配用户角色*/
export const disrole = ({id,rid}) => {
    return managerAxios.put(`users/${id}/role`,{
        rid
    })
}

/* 暴露查询的调用方法-----删除角色权限*/
export const deleteRole = ({roleId,rightId}) => {
    return managerAxios.delete(`roles/${roleId}/rights/${rightId}`)
}


/* 暴露查询的调用方法-----树形用户权限*/
export const rightsTree = () => {
    return managerAxios.get('rights/tree')
}


/* 暴露查询的调用方法-----删除用户权限*/
export const giveRights = ({roleId,rids}) =>{
    return managerAxios.post(`roles/${roleId}/rights`,{
        rids
    })
}


/* 暴露查询的调用方法-----获取商品分类*/
export const getCategories = () => {
    return managerAxios.get('categories',{
        params: {
            type: 3
        }
    })
}


/* 暴露查询的调用方法-----数据统计*/
export const getReports = () => {
    return managerAxios.get('reports/type/1')
}

 


