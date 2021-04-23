import { request } from '../request';

export function verifyUser (username) {
  return request({
    method: 'post',
    data: { username },
    url: '/user-manage/back-password-verify'
  });
}

export function changePassword (firstPassword) {
  return request({
    method: 'post',
    data: { firstPassword },
    url: '/user-manage/change-password'
  });
}
