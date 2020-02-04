import request from '@/utils/request';

export async function usersList(params) {
  return request('/api/account/list', {
    params,
  });
}

export async function appove(params) {
  return request('/api/account/appove', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}

export async function unPublish(params) {
  return request('/api/news/unPublish', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}

export async function deleteNews(params) {
  return request('/api/news/delete', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}

export async function modifyNews(params) {
  return request('/api/news/modify', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}
