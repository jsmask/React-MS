import axios from 'axios';
import { message } from 'antd';
import { BASEURL } from '../config/config';
import store from '@store/store';
import { setLoading } from '@store/action';

const defaultOptions = {
    method: 'GET',
    params:{},
    url:"",
    isloading:true
}

function showLoading() {
    store.dispatch(setLoading(true));
}

function hideLoading() {
    store.dispatch(setLoading(false));
}

export default function request(options,isloading=true){
    const params = Object.assign({},defaultOptions,options);
    
    const instance = axios.create({
        baseURL: BASEURL, //配置请求服务器路径
        timeout: 5000, //超时
    });

    instance.interceptors.request.use(options=>{
        if(isloading) showLoading();  
        return options;
    });
    instance.interceptors.response.use(res=>{
        if(isloading) hideLoading();
        return res.data;
    },err=>{
        message.error("系统错误");
        console.log(err.message);
        if(isloading) hideLoading()
    });
    
    return instance(params);
}