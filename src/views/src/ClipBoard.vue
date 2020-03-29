<template>
  <!-- 工具栏 -->
  <div class="clip-board">
    <canvas id="clip"></canvas>
  </div>
</template>
<script>
  // import { fabric } from 'fabric'
  
  export default {
    name: 'ClipBoard',
    data() {
      return {
        clipCanvas: null
      }
    },
    
    // mounted() {
      // this.initCanvas();
    // },
    
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  .clip-board {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99999;
    border: 2px solid gold;
    
    #clip {
      width: 200px;
      height: 200px;
    }
  }
</style>
