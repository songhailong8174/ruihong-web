import request from '@/utils/request';
import md5 from "md5";

export async function fakeAccountLogin(params) {
  if(params.password1 != ''){
    params.password = md5(params.password1);
  } 
  return request('/api/account/login', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/account/validCode?mobile=${mobile}`);
}

export async function checkUserName(username) {
  return request(`/api/account/check?userName=${username}`);
}

export async function register(params){
  return request('/api/account/register', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}
