/* eslint-disable*/
/**
 * 初始化地图
 * @param instance：viewer实例
 * @param id：视图窗口id
 */
export function initMap (instance, id, latitude, longitude) {
  const tiandituTk = 'ceec0851abde92930a20952b3591d5e4';
  const subdomains = ['0','1','2','3','4','5','6','7'];
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
    vrButton: false, // VR
    selectionIndicator: false,
    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
      // 天地图
      url: "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="+tiandituTk,
      subdomains: subdomains,
      layer: "tdtImgLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",//使用谷歌的瓦片切片方式
      show: true
    }),
    contextOptions: {
      webgl:{
        alpha: true,
        depth:true,
        stencil:true,
        antialias:true,
        premultipliedAlpha:true,
        //通过canvas.toDataURL()实现截图需要将该项设置为true
        preserveDrawingBuffer:true,
        failIfMajorPerformanceCaveat:true
      }
    }
  });
  instance._cesiumWidget._creditContainer.style.display = 'none';
  instance.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk="+tiandituTk,
    subdomains: subdomains,
    layer: "tdtCiaLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: true
  }));
  const options = {};
  options.defaultResetView = Cesium.Rectangle.fromDegrees(73, 12, 135, 53);
  options.enableCompass = true; // 启用指南针
  options.enableZoomControls = true; // 启用缩放控件
  options.enableDistanceLegend = true; // 启用距离图例
  options.enableCompassOuterRing = true; // 启用指南针外环
  instance.extend(Cesium.viewerCesiumNavigationMixin, options);
  setTimeout(function () {
    instance.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 6000000),
      // orientation: {
      //   // 指向
      //   heading: Cesium.Math.toRadians(348.4202942851978),
      //   // 视角
      //   pitch: Cesium.Math.toRadians(-90),
      //   roll: Cesium.Math.toRadians(0)
      // }
    });
  }, 1000);
  instance.scene.screenSpaceCameraController.inertiaSpin = 0.9999;
  if (latitude && longitude) {
    const canvas = instance.scene.canvas;
    const ellipsoid = instance.scene.globe.ellipsoid;
    const handler = new Cesium.ScreenSpaceEventHandler(canvas);
    handler.setInputAction(function (movement) {
      // 捕获椭球体，将笛卡尔二维坐标转为椭球体坐的笛卡尔三维坐标，返回球体表面的点
      const cartesian = instance.camera.pickEllipsoid(movement.endPosition, ellipsoid);
      if (cartesian) {
        // 将笛卡尔三维坐标转为底图坐标（弧度）
        const cartographic = instance.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        // 将地图坐标转为十进制
        latitude.innerHTML = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
        longitude.innerHTML = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
  return instance;
}
