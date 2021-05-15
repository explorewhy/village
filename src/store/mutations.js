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
  }
};
