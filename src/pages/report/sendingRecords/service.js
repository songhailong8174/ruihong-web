import request from '@/utils/request';

export async function queryNearSending(params) {
  return request('/api/report/history/near', {
    params,
  });
}
