import { request } from '../request';

export function getAirData () {
  return request({
    method: 'get',
    url: '/echart-data/air-quality'
  });
}

export function getWaterSource () {
  return request({
    method: 'get',
    url: '/echart-data/water-source'
  });
}

export function getWarningLevel () {
  return request({
    method: 'get',
    url: '/echart-data/warning-level'
  });
}

export function getGrainProduction () {
  return request({
    method: 'get',
    url: '/echart-data/grain-production'
  });
}

export function getGDP () {
  return request({
    method: 'get',
    url: '/echart-data/gdp-data'
  });
}

export function getPopulationData () {
  return request({
    method: 'get',
    url: '/echart-data/population-data'
  });
}
