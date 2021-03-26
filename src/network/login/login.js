import { request } from '../request';

export function initial () {
  return request({
    method: 'get',
    url: '/webmaster-info'
  });
}
