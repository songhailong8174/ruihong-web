import request from '@/utils/request';

// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
export async function getFakeCaptcha(mobile) {
  return request(`/api/account/validCode?mobile=${mobile}`);
}

export async function findPass(params){
  return request('/api/account/modifyPass', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}
