export default {
  namespaced: true,
  state: {

    /** 左侧工具栏 **/
    type: '',
    toolsIndex: 0,

    /** 绘制信息 **/
    lineColor: '#4D4D4D',
    lineWidth: 4,
    mouseFrom: {
      x: 0,
      y: 0
    },
    mouseTo: {
      x: 0,
      y: 0
    }
  },
  mutations: {
    SET_LEFT_TOOLS (state, { key, index }) {
      state.type = key;
      state.toolsIndex = index;
    },
    SET_DRAW_TYPE (state, payload) {
      state.type = payload;
    },
    SET_LINE_COLOR (state, payload) {
      state.lineColor = payload;
    },
    SET_LINE_WIDTH (state, payload) {
      state.lineWidth = payload;
    },
    SET_MOUSE_FROM (state, payload) {
      state.mouseFrom = payload;
    },
    SET_MOUSE_TO (state, payload) {
      state.mouseTo = payload;
    }
  }
};
