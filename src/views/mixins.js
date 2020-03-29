/**
 * Created by daizengyu on 2019-09-04.
 */
import draw from '@/utils/shape'; // 封装绘制方法
import { isEmpty, debounce } from '../utils';
// import UndoCache from './UndoCache';
import socket from '../utils/socket'
import { mapState, mapMutations } from 'vuex';

export default {

  data() {
    return {
      canvasObj: {},
      /** page **/
      canvasArr: [{}], // 画布集合
      canvasIndex: 0, // 当前画布索引

      toolsMap: {
        add: this.addHandler,
        eraser: this.selectHandler,
        picture: this.picHandler,
        background: this.picHandler,
        clear: this.clearHandler,
        free: this.freeHandler,
        select: this.selectHandler,
        copy: this.copyHandler,
        paste: this.pasteHandler,
        undo: this.undoHandler,
        redo: this.redoHandler,
      },
      copyTemp: {},
      isRevoke: true
    }
  },

  computed: {

    ...mapState('tools', [
      'snapshot'
    ]),

    ...mapState('draw', [
      'type',
      'lineColor',
      'lineWidth',
      'mouseFrom',
      'mouseTo'
    ]),

    drawInfo() {
      const { lineColor, lineWidth, mouseFrom, mouseTo } = this;
      return {
        lineColor,
        lineWidth,
        mouseFrom,
        mouseTo
      };
    }
  },

  methods: {

    ...mapMutations('tools', [
      'SET_UNDO_LIST',
      'SET_REDO_LIST',
      'CLEAR_UNDO_LIST',
      'CLEAR_REDO_LIST',
      'SET_SNAPSHOT',
      'SAVE_SNAPSHOT'
    ]),

    ...mapMutations('draw', [
      'SET_LEFT_TOOLS',
      'SET_DRAW_TYPE',
      'SET_MOUSE_FROM',
      'SET_MOUSE_TO'
    ]),

    // 初始化当前画布事件
    addCanvas() {
      this.canvasObj = new fabric.Canvas(`c${this.canvasIndex}`, {
        isDrawingMode: false,
        selectable: false,
        selection: false
      })
      this.canvasObj.freeDrawingBrush.color = this.lineColor;
      this.canvasObj.freeDrawingBrush.width = this.lineWidth;
      this.canvasObj.setHeight(window.innerHeight);
      this.canvasObj.setWidth(window.innerWidth - 70);
      this.$set(this.canvasArr, this.canvasIndex, this.canvasObj);
    },

    // 教师端发送 json
    sendEvent() {
      socket.emit('report', JSON.stringify(this.canvasObj));
    },

    // this.canvasObj.on(...)
    mouseDown({ e }) {
      this.setMousePosition(e, 'from');
      this.isDrawing = true;
      this.sendEvent();
    },

    mouseUp({ e }) {
      this.setMousePosition(e, 'to');
      this.drawingObject = null;
      this.isDrawing = false;
      this.sendEvent();
    },

    mouseMove({ e }) {
      if (!this.isDrawing) return;
      this.setMousePosition(e, 'to')
      !this.isFreeDrawing && this.drawing();
    },

    objectRotating() {
      this.isDrawing = false;
    },

    objectScaling() {
      this.isDrawing = false;
    },

    selectionCreated(o) {
      if (this.type !== 'eraser') return;
      if (o.target._objects) { // 框选
        o.target._objects.forEach(item => {
          this.canvasObj.remove(item);
        })
      } else {
        this.canvasObj.remove(o.target); // 单选
      }
      this.canvasObj.discardActiveObject(); // 取消当前选中
    },

    objectMoving(o) {
      this.isDrawing = false;
      // o.target.opacity = 0.5;
    },

    objectAdded() {
      this.debounceAdd();
    },

    objectModified() {
      this.debounceAdd();
    },

    debounceAdd: debounce(function () {
      if (this.isRevoke) {
        this.save();
      }
      this.isRevoke = true;
    }, 500),

    changePage(item, index) {
      if (index < 0 || index > this.canvasArr.length - 1) return;
      this.canvasIndex = index;
      if (Object.keys(item).length === 0) {
        // 确保视图已经更新
        this.$nextTick(_ => {
          this.initCanvas();
        });
      } else {
        this.canvasObj = this.canvasArr[this.canvasIndex];
      }
      this.reset();
    },

    save() {
      this.CLEAR_REDO_LIST();
      if (this.snapshot) {
        this.SET_UNDO_LIST();
      }
      this.SAVE_SNAPSHOT(JSON.stringify(this.canvasObj));
    },

    reset() {
      this.CLEAR_REDO_LIST();
      this.CLEAR_UNDO_LIST();
      this.SAVE_SNAPSHOT(JSON.stringify(this.canvasObj));
    },

    replay() {
      this.canvasObj.clear();
      this.isRevoke = false;
      this.canvasObj.loadFromJSON(this.snapshot, () => {
        this.canvasObj.renderAll();
      });
    },

    redoHandler() {
      this.SET_UNDO_LIST();
      this.SET_SNAPSHOT('redo');
      this.replay();
    },

    undoHandler() {
      this.SET_REDO_LIST();
      this.SET_SNAPSHOT('undo');
      this.replay();
    },

    setMousePosition({ offsetX, offsetY }, type) {
      const mouse = type === 'to' ? 'SET_MOUSE_TO' : 'SET_MOUSE_FROM';
      this[mouse]({ x: offsetX, y: offsetY });
    },

    drawing() {
      if (this.drawingObject) {
        this.canvasObj.remove(this.drawingObject);
      }
      const element = draw(this.drawInfo, this.type);
      if (element) {
        this.canvasObj.add(element);
        if (this.type === 'text') {
          this.textObject = element;
          this.textObject.enterEditing();
          this.textObject.hiddenTextarea.focus();
        }
        this.drawingObject = element;
      }
    },

    resetCanvas() {
      this.canvasObj.skipTargetFind = true; // 画板元素不能被选中
      this.canvasObj.isDrawingMode = false;
      this.canvasObj.selectable = true;
      this.canvasObj.selection = false; // 画板显示选中

      // 退出编辑模式
      if (this.textObject) {
        this.textObject.exitEditing();
        this.textObject = null;
      }
    },

    /** 侧边栏工具 **/
    handleTools(key, index) {
      this.SET_LEFT_TOOLS({ key, index })
      this.resetCanvas(); // 重置
      const handler = this.toolsMap[key];
      handler && handler();
    },

    addHandler() {
      this.canvasArr.push({});
      this.changePage({}, this.canvasArr.length - 1);
    },

    /**
     * 上传图片或背景
     * type === 'picture' || type === 'background'
     */
    picHandler() {
      const upload = document.getElementById('upload');
      // 不直接使用 upload.click 是为了解决冒泡问题
      const clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('click', false, false);
      upload.dispatchEvent(clickEvent);
    },

    clearHandler() {
      this.canvasObj.clear();
    },

    freeHandler() {
      this.canvasObj.isDrawingMode = true; // 开启自由绘制
      // 设置画笔样式
      this.canvasObj.freeDrawingBrush.color = this.lineColor;
      this.canvasObj.freeDrawingBrush.width = this.lineWidth;
    },

    // 开启选择区域
    selectHandler() {
      this.canvasObj.skipTargetFind = false;
      this.canvasObj.selectable = true;
      this.canvasObj.selection = true;
    },

    copyHandler() {
      const activeObj = this.canvasObj.getActiveObject();
      if (activeObj) {
        activeObj.clone((cloned) => {
          this.copyTemp = cloned;
          this.$notify.success('复制成功')
        });
      } else {
        this.$notify.warning('请选中要复制的元素')
      }
    },

    pasteHandler() {
      if (isEmpty(this.copyTemp)) {
        this.$notify.warning('请选中要复制的元素')
        return;
      }

      this.copyTemp.clone((clonedObj) => {
        this.canvasObj.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = this.canvasObj;
          clonedObj.forEachObject((obj) => {
            this.canvasObj.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          this.canvasObj.add(clonedObj);
        }
        this.copyTemp.top += 10;
        this.copyTemp.left += 10;
        this.canvasObj.setActiveObject(clonedObj);
        this.canvasObj.requestRenderAll();

        this.selectHandler()
      });
    }
  }
};
