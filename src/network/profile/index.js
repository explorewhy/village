import { request } from '../request';

export function getUserInfo () {
  return request({
    method: 'get',
    url: '/user-manage/user-info'
  });
}
