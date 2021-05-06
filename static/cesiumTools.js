/*eslint-disable*/
function triangleMeasure(Cesium, viewer) {
  let trianArr=[];
  let distanceLineNum=0;
  let XLine;
  let X,Y,H;
  let handlerT = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handlerT.setInputAction(function(movement) {
    distanceLineNum++;
    if(distanceLineNum === 1) {
      trianArr.push(lon, lat, MouseHeight);
      XLine = viewer.entities.add({
        id:'triangleLine',
        polyline: {
          //由回调函数进行懒惰评估
          positions: new Cesium.CallbackProperty(function () {
            if (MouseHeight>trianArr[2]){
              return Cesium.Cartesian3.fromDegreesArrayHeights([trianArr[0], trianArr[1], trianArr[2], trianArr[0], trianArr[1], MouseHeight, A, B, MouseHeight, trianArr[0], trianArr[1], trianArr[2]]);
            }else{
              return Cesium.Cartesian3.fromDegreesArrayHeights([trianArr[0], trianArr[1], trianArr[2], A, B, trianArr[2], A, B, MouseHeight, trianArr[0], trianArr[1], trianArr[2]]);
            }
            //返回给定一组经度，纬度和高度值的Cartesian3位置数组，其中经度和纬度以度为单位给出。/Cartesian3返回笛卡尔坐标
            //true当回调函数每次返回相同的值时，如果值发生变化，则为false
          }, false),
          arcType: Cesium.ArcType.NONE,
          width: 2,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.YELLOW
          }),
          depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.RED
          })
        }
      });
    }else{
      distanceLineNum=0;
      trianArr.push(lon,lat,MouseHeight);
      handlerT.destroy();
      viewer.entities.removeById('triangleLine');
      XLine = viewer.entities.add({
        id:'triangleLine',
        polyline:{
          positions:MouseHeight>trianArr[2]?new Cesium.Cartesian3.fromDegreesArrayHeights([trianArr[0], trianArr[1], trianArr[2], trianArr[0], trianArr[1], trianArr[5],trianArr[3], trianArr[4], trianArr[5], trianArr[0], trianArr[1], trianArr[2]]): new Cesium.Cartesian3.fromDegreesArrayHeights([trianArr[0], trianArr[1], trianArr[2], trianArr[3], trianArr[4], trianArr[5],trianArr[3], trianArr[4], trianArr[2], trianArr[0], trianArr[1], trianArr[2]]),
          arcType: Cesium.ArcType.NONE,
          width: 2,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.YELLOW
          }),
          depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.RED
          })
        }
      });

      // 空间
      let lineDistance = Cesium.Cartesian3.distance(Cesium.Cartesian3.fromDegrees(trianArr[0],trianArr[1]),Cesium.Cartesian3.fromDegrees(trianArr[3],trianArr[4])).toFixed(2);
      //高度
      let height = Math.abs(trianArr[2]-trianArr[5]).toFixed(2);
      //直线距离
      let strLine =  (Math.sqrt(Math.pow(lineDistance,2) + Math.pow(height,2))).toFixed(2);
      X = viewer.entities.add({
        id:'lineX',
        position:Cesium.Cartesian3.fromDegrees((trianArr[0]+trianArr[3])/2,(trianArr[1]+trianArr[4])/2, Math.max(trianArr[2],trianArr[5])),
        label:{
          text: '空间距离:'+lineDistance+'米',
          translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e5, 0),
          font: '45px 楷体',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          style:Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 3,
          disableDepthTestDistance : 1000000000,
          scale:0.5,
          pixelOffset:new Cesium.Cartesian2(0, -10),
          backgroundColor:new Cesium.Color.fromCssColorString("rgba(0, 0, 0, 0.7)"),
          backgroundPadding:new Cesium.Cartesian2(10, 10),
          verticalOrigin:Cesium.VerticalOrigin.BOTTOM
        }
      });
      H = viewer.entities.add({
        id:'lineZ',
        position:MouseHeight>trianArr[2]?Cesium.Cartesian3.fromDegrees(trianArr[0],trianArr[1],(trianArr[2]+trianArr[5])/2):Cesium.Cartesian3.fromDegrees(trianArr[3],trianArr[4],(trianArr[2]+trianArr[5])/2),
        label:{
          text: '高度差:'+height+'米',
          translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e5, 0),
          font: '45px 楷体',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          style:Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 3,
          disableDepthTestDistance : 1000000000,
          scale:0.5,
          pixelOffset:new Cesium.Cartesian2(0, -10),
          backgroundColor:new Cesium.Color.fromCssColorString("rgba(0, 0, 0, 0.7)"),
          backgroundPadding:new Cesium.Cartesian2(10, 10),
          verticalOrigin:Cesium.VerticalOrigin.BOTTOM
        }
      });
      Y = viewer.entities.add({
        id:'lineY',
        position:Cesium.Cartesian3.fromDegrees((trianArr[0]+trianArr[3])/2,(trianArr[1]+trianArr[4])/2,(trianArr[2]+trianArr[5])/2),
        label:{
          text: '直线距离:'+strLine+'米',
          translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e5, 0),
          font: '45px 楷体',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          style:Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 3,
          disableDepthTestDistance : 1000000000,
          scale:0.5,
          pixelOffset:new Cesium.Cartesian2(0, -10),
          backgroundColor:new Cesium.Color.fromCssColorString("rgba(0, 0, 0, 0.7)"),
          backgroundPadding:new Cesium.Cartesian2(10, 10),
          verticalOrigin:Cesium.VerticalOrigin.BOTTOM
        }
      });
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

const cesiumTools = {
  triangleMeasure
};

export default cesiumTools;
