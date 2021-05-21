/*eslint-disable*/
function offsetByDistance (Cesium, viewer) {
  const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(110,40,1000),
    billboard: {
     image: '',
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scale: 1,
    }
  });
  // viewer.flyTo(entity);
}

/**
 * 卷帘
 * @param Cesium
 * @param viewer
 */
function rollerBlind (Cesium, viewer, slider) {
  const layers = viewer.imageryLayers;
  const blackMarble = layers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
    url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer'
  }));
  blackMarble.splitDirection = Cesium.ImagerySplitDirection.LEFT;
  viewer.scene.imagerySplitPosition = (slider.offsetLeft) / slider.parentElement.offsetWidth;
  const handler = new Cesium.ScreenSpaceEventHandler(slider);
  let moveActive = false;
  function move (movement) {
    if(!moveActive) {
      return;
    }
    let relativeOffset = movement.endPosition.x;
    let splitPosition = (slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
    slider.style.left = 100.0 * splitPosition + '%';
    viewer.scene.imagerySplitPosition = splitPosition;
  }

  handler.setInputAction(function () {
    moveActive = true;
  }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
  handler.setInputAction(function () {
    moveActive = true;
  }, Cesium.ScreenSpaceEventType.PINCH_START);

  handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

  handler.setInputAction(function () {
    moveActive = false;
  }, Cesium.ScreenSpaceEventType.LEFT_UP);
  handler.setInputAction(function () {
    moveActive = false;
  }, Cesium.ScreenSpaceEventType.PINCH_END);
  return blackMarble;
}

/**
 * 显示经纬度
 * @param Cesium
 * @param viewer
 */
function showLatLongLine (Cesium, viewer) {
  const latLongLine = {};
   latLongLine.lang = [];
   //经度
   let langS = [];
   //每隔10° 画一条线
   for (let lang= -180; lang <= 180; lang += 10) {
     let text = "西经";
     if (lang< 0) {
       text = "东经";
     } else if (lang=== 0) {
       text = "本初子午线";
     }
     text += lang===0?"":"" + lang+ "°";
     //绘制经度
     latLongLine.lang.push(viewer.entities.add({
       position: Cesium.Cartesian3.fromDegrees(lang,0),
       polyline: {
         positions: Cesium.Cartesian3.fromDegreesArray([lang, -90, lang, 0, lang, 90]),//为了绕一圈地球中间加了一个赤道点
         width: 1.0,
         material: Cesium.Color.fromBytes(66, 147, 254, 255 * 0.8),//好看的颜色
       } ,label: {//标注经度
         text: text,
         verticalOrigin:Cesium.VerticalOrigin.TOP,
         font: '16px Helvetica',
         fillColor: Cesium.Color.GOLD,
         style: Cesium.LabelStyle.FILL_AND_OUTLINE,
         outlineWidth: 1,
         outlineColor: Cesium.Color.BLACK,
         pixelOffset: new Cesium.Cartesian3(0, -50, -2000)//像素为单位的位置偏移实际上笛卡尔3的z值无效，因为他只支持笛卡尔2
       },
     }));
   }

   for (let lang= -180; lang<= 180; lang+= 5) {
     langS.push(lang);
   }
   //每隔10读绘制一条纬度线和纬度标注
   for (let lat= -80; lat<= 80; lat+= 10) {
     let text = "北纬";
     if (lat< 0) {
       text = "南纬";
     } else if (lat=== 0) {
       text = "赤道";
     }
     text += "" + lat+ "°";
     latLongLine.lat = [];
     latLongLine.lat.push(viewer.entities.add({
         position: Cesium.Cartesian3.fromDegrees(0,lat),//这个主要是为了让文字可以显示到正确的位置
         polyline: {
           positions: Cesium.Cartesian3.fromDegreesArray(langS.map(long=> {
             return [long,lat].join(",")
           }).join(",").split(",").map(item => Number(item))),//把经度和纬度拼为二维数组，然后在转换为字符串分割，然后在转换为一维数组，然后转数组
           width: 1.0,
           material: Cesium.Color.BLUE,
         },
         label: {//标注
           text: text,
           font: '16px Helvetica' ,
           fillColor: Cesium.Color.GOLD,
           style: Cesium.LabelStyle.FILL_AND_OUTLINE,
           outlineWidth: 1,
           outlineColor: Cesium.Color.BLACK,
           pixelOffset: new Cesium.Cartesian3(0, -5, -2000)
         },
       })
     )
   }
 }

/**
 * 地下管线
 * @param Cesium
 * @param viewer
 */
function downPipeline (Cesium, viewer, element) {
  const scene = viewer.scene;
  scene.screenSpaceCameraController.enableCollisionDetection = false;
  let longitude = -3.82518;
  let latitude = 53.11728;
  let height = 72.8;
  let position = Cesium.Cartesian3.fromDegrees(
    longitude,
    latitude,
    height
  );
  // let url = require('../static/source/downLine.glb')
  // viewer.entities.add({
  //   name: url,
  //   position: position,
  //   model: {
  //     uri: url,
  //   },
  // });

  viewer.scene.camera.flyTo({
    destination: new Cesium.Cartesian3(
      3827270.552916987,
      -255123.18143177085,
      5079147.091351856
    ),
    orientation: new Cesium.HeadingPitchRoll(
      3.2624281242239963,
      -0.22213535190506972,
      6.282786783842843
    ),
    duration: 5.0,
  });

}

/**
 * 天地图矢量
 * @param Cesium
 * @param viewer
 */
function tianDiVector (Cesium, viewer, key) {
  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" + key,
    layer: "tdtAnnoLayer",
    style: "default",
    format: "tiles",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: true
  }));
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url:
      "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" + key,
    layer: "tdtAnnoLayer",
    style: "default",
    format: "tiles",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: true
  }));
}

/**
 * 天地图影像
 * @param Cesium
 * @param viewer
 */
function tianDiImage (Cesium, viewer, key) {
  // viewer.imageryLayers.removeAll();
  const subdomains = ['0','1','2','3','4','5','6','7'];
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" + key,
    subdomains: subdomains,
    layer: "tdtCiaLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: true
  }));
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" + key,
    subdomains: subdomains,
    layer: "tdtCiaLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: true
  }));
}

/**
 * 天地图地形
 * @param Cesium
 * @param viewer
 */
function tianDiTerrain (Cesium, viewer) {

}

/**
 * ArcGIS矢量
 * @param Cesium
 * @param viewer
 */
function arcGISVector (Cesium, viewer) {

}

/**
 * ArcGIS影像
 * @param Cesium
 * @param viewer
 */
function arcGISImage (Cesium, viewer) {

}

/**
 * ArcGIS地形
 * @param Cesium
 * @param viewer
 */
function arcGISTerrain (Cesium, viewer) {

}

const cesiumTools = {
  downPipeline,
  rollerBlind,
  showLatLongLine,
  tianDiVector,
  tianDiImage,
  tianDiTerrain,
  arcGISVector,
  arcGISImage,
  arcGISTerrain
};

export default cesiumTools;
