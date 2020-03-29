<template>
  <!-- 工具栏 -->
  <div class="edit">
    <div class="edit-tools">
      <button
        v-for="(item, index) in tools"
        :disabled="isDisabled(item.key)"
        :key="item.key"
        class="edit-tools-item"
        :class="{ active: currentIndex === index, 'btn-disabled': isDisabled(item.key) }"
        @click="handleTools(item.key, index)"
      >
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#${item.icon}`"></use>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'TopTools',
    data() {
      return {
        currentIndex: '',
        editStatus: false,
        tools: [
          {
            key: 'undo',
            name: '上一步',
            icon: 'iconshangyibu'
          },
          {
            key: 'redo',
            name: '下一步',
            icon: 'iconxiayibu'
          },
          {
            key: 'select',
            name: '选择',
            icon: 'icontuozhuai'
          },
          {
            key: 'copy',
            name: '复制',
            icon: 'iconfuzhi'
          },
          {
            key: 'paste',
            name: '粘贴',
            icon: 'iconniantie'
          }
        ]
      }
    },
  
    computed: {
      ...mapState('tools', ['redoArr', 'undoArr'])
    },
    
    methods: {
      isDisabled (key) {
        if (key === 'redo') {
          return this.redoArr.length === 0;
        }
        if (key === 'undo') {
          return this.undoArr.length === 0;
        }
      },
      handleTools (key, index) {
        this.currentIndex = index;
        this.$emit('handleTools', key)
      }
    }
  }
</script>

<style lang="less" scoped>
  
  .edit {
    z-index: 999;
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: center;
    
    &-hide {
      width: 40px;
      height: 20px;
      border-radius: 0 0 40px 40px;
      background-color: #74bc7b;
    }
  
    &-tools {
      width: 240px;
      height: 50px;
      border-right: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #fff;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, .6);
      border-radius: 5px;
  
      &-item {
        display: inline-block;
        background: #fff;
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 24px;
        line-height: 50px;
        border: 1px solid #dcdfe6;
        outline: none;
        margin: 0;
      }
  
      &-item:hover {
        background-color: #ecf5ff;
      }
  
      .active {
        background-color: #77c9ff;
        color: white;
      }
      
      .btn-disabled {
        color: #c0c4cc;
        cursor: not-allowed;
        background-image: none;
        background-color: #fff;
        border-color: #ebeef5;
      }
    }
  }
</style>
