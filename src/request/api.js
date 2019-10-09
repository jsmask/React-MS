import request from './request';

//登录接口
export const reqLogin=(params,isloading)=>request({url:"/login",method:"POST",params},isloading);

//获取角色列表
export const reqRoleList=params=>request({url:"/role/list",method:"GET",params},false);

//获取角色信息
export const reqRoleInfo=params=>request({url:"/role/info",method:"POST",params},false);

//修改角色信息
export const reqRoleRevise=(params,isloading)=>request({url:"/role/revise",method:"POST",params},isloading);

//删除角色信息
export const reqRoleDelete=(params,isloading)=>request({url:"/role/delete",method:"POST",params},isloading);