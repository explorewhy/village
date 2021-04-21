import { request } from '../request';

export function initial () {
  return request({
    method: 'get',
    url: '/webmaster-info'
  });
}

export function login (username, password) {
  return request({
    method: 'post',
    url: '/user-manage/login',
    data: {
      username,
      password
    }
  });
}
