import request from '@/utils/request';

export async function queryReceive(params) {
  return request('/api/report/history/receive', {
    params,
  });
}
