import request from './request';

//登录接口
export const reqLogin = (params, isloading) => request({ url: "/login", method: "POST", params }, isloading);

//获取首页信息
export const reqHomeInfo = (params, isloading) => request({ url: "/home/info", method: "GET", params }, isloading);

//获取角色列表
export const reqRoleList = params => request({ url: "/role/list", method: "GET", params }, false);

//获取角色信息
export const reqRoleInfo = params => request({ url: "/role/info", method: "POST", params }, false);

//修改角色信息
export const reqRoleRevise = (params, isloading) => request({ url: "/role/revise", method: "POST", params }, isloading);

//添加角色信息
export const reqRoleAdd = (params, isloading) => request({ url: "/role/add", method: "POST", params }, isloading);

//删除角色信息
export const reqRoleDelete = (params, isloading) => request({ url: "/role/delete", method: "POST", params }, isloading);

//获取道具列表
export const reqPropList = params => request({ url: "/prop/list", method: "GET", params }, false);

//获取道具信息
export const reqPropInfo = params => request({ url: "/prop/info", method: "POST", params }, false);

//修改道具信息
export const reqPropRevise = (params, isloading) => request({ url: "/prop/revise", method: "POST", params }, isloading);

//修改道具状态
export const reqPropChangeStatus = params => request({ url: "/prop/changestatus", method: "POST", params }, false);

//添加道具信息
export const reqPropAdd = (params, isloading) => request({ url: "/prop/add", method: "POST", params }, isloading);

//删除道具信息
export const reqPropDelete = (params, isloading) => request({ url: "/prop/delete", method: "POST", params }, isloading);

