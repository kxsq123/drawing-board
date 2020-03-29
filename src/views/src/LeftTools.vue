<template>
  <div class="left-tools">
    <div
      v-for="(item, index) in tools"
      :key="item.key"
      class="left-tools-item"
      :class="{ active: toolsIndex === index }"
      @click="$emit('handleTools', item.key, index)"
    >
      <div style="width: 100%"
        @mouseenter="mouseChange(item.key, true)"
        @mouseleave="mouseChange(item.key, false)"
      >
        <svg class="icon"
          aria-hidden="true"
          :style="{ color: item.key === 'free' && lineColor }">
          <use :xlink:href="`#${item.icon}`"></use>
        </svg>
      </div>
      <!-- 图片上传 -->
      <input
        v-if="item.key === 'picture'"
        style="display: none"
        @change="$emit('uploadFile', $event)"
        type="file"
        ref="upload"
        id="upload"/>
      <!-- 🖌 -->
      <div
        v-if="item.key === 'free'"
        class="extend"
        :style="{ top: `${index * 69}px` }"
        @mouseenter="isFreeStatus = true" @mouseleave="isFreeStatus = false">
        <transition name="slide-fade">
          <div v-show="isFreeStatus">
            <div
              v-for="(i, index) in [5, 10, 15, 20, 25]"
              @click="changeLineWidth(i, index)"
              style="display: inline-block; height: 100%; cursor: pointer">
                <span
                  :style="{
                    display: 'inline-block',
                    width: `${i}px`,
                    height: `${i}px`,
                    borderRadius: `${i / 2}px`,
                    backgroundColor: lineWidthIndex === index ? lineColor : '#e6e6e6',
                    margin: '0 15px'
                  }"
                >
                </span>
            </div>
          </div>
        </transition>
      </div>
      <!-- 🎨 -->
      <div
        v-if="item.key === 'color'"
        class="extend"
        :style="{ top: `${index * 69}px` }"
        @mouseenter="isColorStatus = true" @mouseleave="isColorStatus = false">
        <transition name="slide-fade">
          <div v-show="isColorStatus">
              <span v-for="(item, index) in colorPicker" :key="index">
                <span
                  @click.stop="changeLineColor(item, index)"
                  :style="{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    borderRadius: '5px',
                    backgroundColor: item,
                    margin: '0 15px'
                  }"
                >
                  <!-- 选中的小圆点 -->
                  <div
                    v-show="index === lineColorIndex"
                    class="check-point"
                  >
                  </div>
                </span>
              </span>
          </div>
        </transition>
      </div>
      
      <!-- 几何图形 -->
      <div
        v-if="item.key === 'shape'"
        class="extend"
        :style="{ top: `${index * 69}px` }"
        @mouseenter="isShapeStatus = true" @mouseleave="isShapeStatus = false">
        <transition name="slide-fade">
          <div v-show="isShapeStatus">
              <span v-for="(item, index) in shapeList"
                @click.stop="$emit('handleTools', item.key, 4)"
                :key="index"
                :style="{ border: type === item.key ? '2px dashed #77c9ff' : 'none'}"
                class="extend-shape">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
              </span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    
    name: 'LeftTools',
    
    data() {
      return {
        lineWidthIndex: 0,
        lineColorIndex: 0,
        /** extend area **/
        isFreeStatus: false, // 🖌 扩展显示状态
        isColorStatus: false, // 🎨 扩展显示状态
        isShapeStatus: false,
        shapeList: [
          {
            key: 'solidLine',
            name: '直线',
            icon: 'iconline'
          },
          {
            key: 'dashedLine',
            name: '虚线',
            icon: 'iconxuxian'
          },
          {
            key: 'arrowLine',
            name: '箭头',
            icon: 'iconarrow-right'
          },
          {
            key: 'rect',
            name: '矩形',
            icon: 'iconjuxing'
          },
          {
            key: 'triangle',
            name: '三角形',
            icon: 'iconiconfontsanjiaoxing'
          },
          {
            key: 'rightTriangle',
            name: '直角三角形',
            icon: 'iconzhijiaosanjiaoxing'
          },
          {
            key: 'circle',
            name: '圆形',
            icon: 'iconyuanxing1'
          },
        ],
        colorPicker: [
          '#4D4D4D', '#999999', '#F44E3B', '#FE9200',
          '#FCDC00', '#A4DD00', '#73D8FF', '#FDA1FF'
        ],
        tools: [
          {
            key: 'add',
            name: '添加画板',
            icon: 'icontianjiayemian1'
          },
          {
            key: 'free',
            name: '画笔',
            icon: 'iconhuabi'
          },
          {
            key: 'color',
            name: '调色板',
            icon: 'iconyanse1'
          },
          {
            key: 'eraser',
            name: '橡皮',
            icon: 'iconeraser'
          },
          {
            key: 'shape',
            name: '图形',
            icon: 'icontuxing'
          },
          {
            key: 'text',
            name: '文本',
            icon: 'iconwenzi'
          },
          {
            key: 'picture',
            name: '图片',
            icon: 'icontupian'
          },
          {
            key: 'clear',
            name: '清除',
            icon: 'iconEliminate'
          },
          {
            key: 'background',
            name: '背景',
            icon: 'iconbackground'
          },
          {
            key: 'setting',
            name: '设置',
            icon: 'iconcanshu'
          }
        ]
      }
    },
  
    computed: {
      ...mapState('draw', [
        'type',
        'lineWidth',
        'lineColor',
        'toolsIndex',
      ])
    },
    
    methods: {
      
      ...mapMutations('draw', [
        'SET_LINE_WIDTH',
        'SET_LINE_COLOR'
      ]),
      
      changeLineWidth(width, index) {
        this.lineWidthIndex = index;
        this.SET_LINE_WIDTH(width);
      },
  
      changeLineColor(color, index) {
        this.lineColorIndex = index;
        this.SET_LINE_COLOR(color);
        this.$emit('handleTools', 'free', 1); // 模拟画笔点击
      },
      
      mouseChange(type, flag) {
        const map = {
          free: 'isFreeStatus',
          color: 'isColorStatus',
          shape: 'isShapeStatus'
        }
        const status = map[type]
        if (status) {
          this[status] = flag;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  
  .left-tools {
    float: left;
    width: 69px;
    height: 100%;
    border-right: 1px solid #e6e6e6;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
    overflow: auto;
    
    .extend {
      display: inline-block;
      position: absolute;
      height: 65px;
      left: 70px;
      z-index: 100;
      padding: 0;
      border: none;
      border-radius: 2px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .6);
      
      &-shape {
        margin: 0px 10px;
        padding: 5px 10px;
        color: black;
      }
      
      .check-point {
        background-color: white;
        margin: 5px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        text-align: center;
      }
    }
    
    &-item {
      height: 64px;
      text-align: center;
      font-size: 25px;
      line-height: 69px;
      margin-bottom: 5px;
    }
    
    &-item:hover {
      background-color: #ecf5ff;
    }
    
    .active {
      background-color: #77c9ff;
      color: white;
    }
  }
</style>
