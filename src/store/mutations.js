export default {
  addControlViewer (state, payload) {
    state.controlViewer = payload.viewer;
  },
  addRoleType (state, payload) {
    state.roleType = payload.roleType;
  }
};
