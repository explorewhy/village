export default {
  addControlViewer (state, payload) {
    state.controlViewer = payload.homeViewer;
  },
  addRoleType (state, payload) {
    state.roleType = payload.roleType;
  }
};
