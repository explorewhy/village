export default {
  addControlViewer (state, payload) {
    state.controlViewer = payload.homeViewer;
  },
  addRoleType (state, payload) {
    state.roleType = payload.roleType;
  },
  addJWD (state, payload) {
    state.showJWD = !state.showJWD;
    state.payload = payload;
  },
  beginJump (state, payload) {
    state.isJump = !state.isJump;
    state.jumpData.long = payload.longitude;
    state.jumpData.lat = payload.latitude;
    if (payload.height) {
      state.jumpData.height = payload.height;
    }
  },
  addAirChartData (state, payload) {
    state.airChartData = payload;
  },
  addWaterData (state, payload) {
    state.waterSourceData = payload;
  },
  addFoodChartData (state, payload) {
    state.footChartData = payload;
  },
  addGDPChartData (state, payload) {
    state.gdpChartData = payload;
  },
  addPopulationData (state, payload) {
    state.populationChartData = payload;
  }
};
