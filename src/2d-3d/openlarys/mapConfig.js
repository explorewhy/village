import TileLayer from 'ol/layer/Tile';
import TileArcGISRest from 'ol/source/TileArcGISRest';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';

// 0表示部署离线瓦片地图，1表示OSM，2表示使用ArcGIS在线地图服务
const maptype = 2;
const streetap = function () {
  let maplayer = null;
  switch (maptype) {
    case 0:
      maplayer = new TileLayer({
        source: new XYZ({
          url: '本地瓦片'
        })
      });
      break;
    case 1:
      maplayer = new TileLayer({
        source: new OSM()
      });
      break;
    case 2:
      maplayer = new TileLayer({
        source: new TileArcGISRest({
          url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
        })
      });
      break;
  }
  return [maplayer];
};
const mapconfig = {
  x: 116.20, // 中心点经度和纬度
  y: 39.56,
  zoom: 5, // 地图缩放级别
  streetap
};
export default mapconfig;
