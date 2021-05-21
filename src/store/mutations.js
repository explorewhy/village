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
  addDownLines (state, payload) {
    state.downLine = !state.downLine;
    state.payload = payload;
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
