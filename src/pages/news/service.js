import request from '@/utils/request';

export async function addNews(params) {
  return request('/api/news/add', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}

export async function newsList(params) {
  return request('/api/news/list', {
    params,
  });
}

export async function publishNews(params) {
  return request('/api/news/publish', {
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
