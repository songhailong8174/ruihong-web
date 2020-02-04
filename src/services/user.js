import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/account/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function logout() {
  return request('/api/account/logout');
}
