import request from '@/utils/request';

export async function sedingCount(params) {
  return request('/api/report/sedingCount', {
    params,
  });
}
