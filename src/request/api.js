import request from './request';
import { IMAGESURL } from '@config/config';

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

//获取统计数据
export const reqEchartsData = (params, isloading) => request({ url: "/echarts/data", method: "GET", params }, isloading);

//获取收入支出列表
export const reqIncomeList = params => request({ url: "/income/list", method: "POST", params }, false);

//删除道具图片
export const reqPropDeleteImg = (params, isloading) => request({ url: "/prop/deleteimg", method: "POST", params }, isloading);

//上传图片
export const reqUploadImages = params => request({ url: IMAGESURL, method: "POST", params }, false);

//获取模型列表
export const reqModelList = params => request({ url: "/model/list", method: "GET", params }, false);

//获取模型信息
export const reqModelInfo = params => request({ url: "/model/info", method: "POST", params }, false);

//修改模型信息
export const reqModelRevise = (params, isloading) => request({ url: "/model/revise", method: "POST", params }, isloading);

//添加模型信息
export const reqModelAdd = (params, isloading) => request({ url: "/model/add", method: "POST", params }, isloading);

//删除模型信息
export const reqModelDelete = (params, isloading) => request({ url: "/model/delete", method: "POST", params }, isloading);

//获取用户列表
export const reqUserList = params => request({ url: "/user/list", method: "GET", params }, false);

//获取用户信息
export const reqUserInfo = params => request({ url: "/user/info", method: "POST", params }, false);

//设置用户背包
export const reqSetBags = (params, isloading) => request({ url: "/user/setbags", method: "POST", params }, isloading);
