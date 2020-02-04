import request from '@/utils/request';

export async function querySendingHistory(params) {
  return request('/api/report/history', {
    params,
  });
}
