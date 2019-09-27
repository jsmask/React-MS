import request from './request';

//登录接口
export const reqLogin=(params,isloading)=>request({url:"/login",method:"POST",params},isloading);
