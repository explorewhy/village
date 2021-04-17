import { Loading } from 'element-ui';

let loadingCount = 0;
let loading;

const startLoading = (target) => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)',
    target
  });
};

const endLoading = (target) => {
  loading.close(target);
};

export const showLoading = (target) => {
  if (loadingCount === 0) {
    startLoading(target);
  }
  loadingCount += 1;
};

export const hideLoading = (target) => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading(target);
  }
};
