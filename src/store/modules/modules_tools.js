export default {
  namespaced: true,
  state: {
    snapshot: '',
    redoArr: [],
    undoArr: []
  },
  mutations: {
    SAVE_SNAPSHOT (state, payload) {
      state.snapshot = payload;
    },
    SET_SNAPSHOT (state, type) {
      state.snapshot = (type === 'undo' ? state.undoArr : state.redoArr).pop();
    },
    SET_UNDO_LIST (state) {
      state.undoArr.push(state.snapshot);
    },
    SET_REDO_LIST (state) {
      state.redoArr.push(state.snapshot);
    },
    CLEAR_UNDO_LIST (state) {
      state.undoArr = [];
    },
    CLEAR_REDO_LIST (state) {
      state.redoArr = [];
    }
  }
};
