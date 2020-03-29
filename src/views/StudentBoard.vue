<template>
  <!-- 工具栏 -->
  <div class="student">
    <PicBoard
      :canvasArr="canvasArr"
      :canvasIndex="canvasIndex"
      @changePage="changePage"
    >
    </PicBoard>
  </div>
</template>
<script>
  import { fabric } from 'fabric'
  import socket from "../utils/socket"
  import boardMixin from './mixins'
  import PicBoard from "./src/PicBoard"

  export default {
    
    name: 'StudentBoard',
    
    mixins: [boardMixin],
    
    components: {
      PicBoard
    },
    
    data() {
      return {}
    },
    
    mounted() {
      this.init();
      this.addListener();
    },
    
    methods: {
      
      init() {
        this.canvasObj = new fabric.Canvas(`c${this.canvasIndex}`, {
          isDrawingMode: false,
          selectable: false,
          selection: false
        })
        this.canvasObj.setHeight(window.innerHeight);
        this.canvasObj.setWidth(window.innerWidth);
        this.$set(this.canvasArr, this.canvasIndex, this.canvasObj);
      },

      addListener() {
        // 接受教师端播放的数据
        socket.on('receive', (data) => {
          this.play(data);
        })
      },
      
      // 播放
      play(data) {
        this.canvasObj.loadFromJSON(data, () => {
          this.canvasObj.renderAll();
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .student {
  }
</style>
