import request from '@/utils/request';

export async function queryRule(params) {
  return request('/api/cost/rechage', {
    params,
  });
}
