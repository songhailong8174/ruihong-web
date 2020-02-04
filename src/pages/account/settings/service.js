import request from '@/utils/request';
import md5 from "md5";

export async function queryCurrent() {
  return request('/api/account/currentUser');
}
export async function queryProvince() {
  return request('/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
export async function modifyInfo(params) {
  return request('/api/account/user/modify', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}

export async function getCaptcha(mobile) {
  return request(`/api/account/validCode?mobile=${mobile}`);
}

export async function modifyPassword(params){
  let data = {
    password: md5(params.oldPwd),
    realname: md5(params.newPwd),
    company: md5(params.rePwd)
  };
  return request('/api/account/user/modifyPassword', {
    method: 'POST',
    requestType: 'form',
    data: data
  });
}

export async function modifyMobile(params) {
  return request('/api/account/user/modifyMobile', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}

export async function authUser(params) {
  return request('/api/account/user/auth', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}
