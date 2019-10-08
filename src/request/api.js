import request from './request';

//登录接口
export const reqLogin=(params,isloading)=>request({url:"/login",method:"POST",params},isloading);

//获取角色列表
export const reqRoleList=params=>request({url:"/role/list",method:"GET",params},false);
