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
 * 三角测量
 * @param Cesium
 * @param viewer
 */
function triangleMeasure(Cesium, viewer) {

}

const cesiumTools = {
  offsetByDistance,
  triangleMeasure,
  rollerBlind
};

export default cesiumTools;
