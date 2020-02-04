import request from '@/utils/request';

export async function queryTemplates(params) {
  return request('/api/sms/template', {
    params,
  });
}
export async function removeTemplate(params) {
  return request('/api/sms/template/delete', {
    params
  });
}
export async function addTemplate(params) {
  return request('/api/sms/template', {
    method: 'POST',
    requestType: 'form',
    data: params
  });
}
