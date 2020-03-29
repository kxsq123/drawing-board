<template>
  <div class="board">
    <!-- 左侧工具栏 -->
    <LeftTools
      @uploadFile="uploadFile"
      @handleTools="handleTools">
    </LeftTools>
    
    <!-- 上方工具栏 -->
    <TopTools @handleTools="handleTools"></TopTools>
    
    <!-- 主画图区 -->
    <PicBoard
      style="width: calc(100% - 70px); float: right;"
      :canvasArr="canvasArr"
      :canvasIndex="canvasIndex"
      @changePage="changePage"
    >
    </PicBoard>
  </div>
</template>
<script>
  import { fabric } from 'fabric'
  import boardMixin from './mixins'
  import TopTools from "./src/TopTools";
  import PicBoard from "./src/PicBoard";
  import LeftTools from "./src/LeftTools";
  
  export default {
    
    name: 'TeacherBoard',
    
    components: {
      PicBoard,
      LeftTools,
      TopTools
    },
    
    mixins: [boardMixin],
    
    data() {
      return {
        drawingObject: null, // 当前绘制对象
        isDrawing: false,
        textObject: null
      }
    },
    
    mounted() {
      this.initKeyboardEvent();
      this.initCanvas();
    },
    
    computed: {
      isFreeDrawing() {
        return this.type === 'free';
      }
    },
    
    methods: {

      initCanvas() {
        this.addCanvas();
        this.initEvent();
      },

      initEvent() {
        this.canvasObj.on({
          'mouse:down': this.mouseDown,
          'mouse:up': this.mouseUp,
          'mouse:move': this.mouseMove,
          'object:added': this.objectAdded,
          'object:rotating': this.objectRotating,
          'object:scaling': this.objectScaling,
          'object:moving': this.objectMoving,
          'object:modified': this.objectModified,
          'selection:created': this.selectionCreated
        });
      },

      initKeyboardEvent() {
        document.addEventListener('keydown', ({ keyCode }) => {
          const isUpArrow = keyCode === 38;
          const isDownArrow = keyCode === 40;
          if (isUpArrow || isDownArrow) {
            const index = isUpArrow ? this.canvasIndex - 1 : this.canvasIndex + 1;
            this.changePage(this.canvasArr[index], index);
          }
        });
      },

      uploadFile(e) {
        // 设置图片
        const addImage = (data) => {
          const imgObj = new Image();
          imgObj.src = data;
          imgObj.onload = () => {
            const image = new fabric.Image(imgObj);
            this.canvasObj.centerObject(image);
            this.canvasObj.add(image);
            this.canvasObj.renderAll();
          }
        };
        // 设置背景
        const addBackground = (data) => {
          fabric.Image.fromURL(data, (img) => {
            this.canvasObj.setBackgroundImage(img, this.canvasObj.renderAll.bind(this.canvasObj), {
              scaleX: this.canvasObj.width / img.width,
              scaleY: this.canvasObj.height / img.height
            });
          });
        };
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target.result;
          (this.type === 'background' ? addBackground : addImage)(data);
        }
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  }
</script>

<style lang="less" scoped>
  .board {
    width: 100%;
    height: 100%;
    
    
    .slide-fade-enter-active {
      transition: all 0.5s ease;
    }
    
    .slide-fade-leave-active {
      transition: all 0.5s;
    }
    
    .slide-fade-enter,
    .slide-fade-leave-to {
      opacity: 0;
      transform: translateX(-10px);
    }
    
  }
</style>
