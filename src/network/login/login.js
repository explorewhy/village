import { request } from '../request';

export function initial () {
  return request({
    method: 'get',
    url: '/village/v1/login/manage-info'
  });
}
