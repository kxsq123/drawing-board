<template>
  <transition name="fade">
    <div class="notify">
      <svg
        v-if="type !== ''"
        class="icon"
        aria-hidden="true"
        style="font-size: 24px; margin-right: 10px"
      >
        <use :xlink:href="`#${iconMap[type]}`"></use>
      </svg>
      {{ message }}
    </div>
  </transition>
</template>
<script>
  
  export default {
    name: 'Notify',
    data() {
      return {
        type: 'success',
        iconMap: {
          success: 'iconchenggong',
          error: 'iconshibai',
          warning: 'iconjinggaoicon'
        },
        timer: '',
        message: '',
        duration: 2000
      }
    },
    
    mounted() {
      this.timer = setTimeout(() => {
        this.remove();
      }, this.duration);
    },
    
    methods: {
      remove() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  }
</script>

<style lang="less" scoped>
  .notify {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    width: 240px;
    padding: 14px 26px 14px 13px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    position: fixed;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
    overflow: hidden;
    z-index: 9999;

    .fade-enter {
      &.right {
        right: 0;
        transform: translateX(100%);
      }
    
      &.left {
        left: 0;
        transform: translateX(-100%);
      }
    }

    .fade-leave-active {
      opacity: 0;
    }
  }
</style>
