/* eslint-disable */

/**
 * 初始化地图
 * @param instance：viewer实例
 * @param id：视图窗口id
 */
export function initMap (instance, id) {
  // token
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NTE5MTc4Ni0wNjZlLTQ1ZDItOTFlZi1mY2Y4NmFkNDRjZTgiLCJpZCI6NDQyMTMsImlhdCI6MTYxMzcwNTM5Nn0.XomgRaWlZcTyJBjbnzLTfN42gV995hsh-o1-_lI8wyU';
  instance = new Cesium.Viewer(id, {
    geocoder: false, // 位置查找工具
    homeButton: false, // 视角返回初始位置
    sceneModePicker: false, // 选择视角的模式（球体、平铺、斜视平铺）
    baseLayerPicker: false, // 图层选择器（地形影像服务）
    navigationHelpButton: false, // 导航帮助(手势，鼠标)
    animation: false, // 左下角仪表盘（动画器件）
    timeline: false, // 底部时间线
    fullscreenButton: false, // 全屏
    vrButton: false // VR
  });
  instance._cesiumWidget._creditContainer.style.display = "none";
}
