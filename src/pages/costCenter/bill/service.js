import request from '@/utils/request';

export async function queryBill(params) {
  return request('/api/cost/bill', {
    params,
  });
}
