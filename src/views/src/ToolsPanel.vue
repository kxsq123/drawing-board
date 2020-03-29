<!--<template>-->
<!--  &lt;!&ndash; 工具栏 &ndash;&gt;-->
<!--  <div class="board-tools">-->
<!--    <div-->
<!--      v-for="(item, index) in tools"-->
<!--      :key="item.key"-->
<!--      class="board-tools-item"-->
<!--      :class="{ active: toolsIndex === index }"-->
<!--      @click="handleTools(item.key, index)"-->
<!--    >-->
<!--      <div style="width: 100%"-->
<!--        @mouseenter="mouseChange(item.key, true)"-->
<!--        @mouseleave="mouseChange(item.key, false)"-->
<!--      >-->
<!--        <svg class="icon"-->
<!--          aria-hidden="true"-->
<!--          :style="{ color: item.key === 'free' && drawInfo.lineColor }">-->
<!--          <use :xlink:href="`#${item.icon}`"></use>-->
<!--        </svg>-->
<!--      </div>-->
<!--      &lt;!&ndash; 图片上传 &ndash;&gt;-->
<!--      <input-->
<!--        v-if="item.key === 'picture'"-->
<!--        style="display: none"-->
<!--        @change="uploadFile"-->
<!--        type="file"-->
<!--        ref="upload"-->
<!--        id="upload"/>-->
<!--      &lt;!&ndash; 🖌 &ndash;&gt;-->
<!--      <div-->
<!--        v-if="item.key === 'free'"-->
<!--        class="extend"-->
<!--        :style="{ top: `${index * 69}px` }"-->
<!--        @mouseenter="isFreeStatus = true" @mouseleave="isFreeStatus = false">-->
<!--        <transition name="slide-fade">-->
<!--          <div v-show="isFreeStatus">-->
<!--            <div-->
<!--              v-for="(i, index) in [5, 10, 15, 20, 25]"-->
<!--              @click="changeLineWidth(i, index)"-->
<!--              style="display: inline-block; height: 100%; cursor: pointer">-->
<!--                <span-->
<!--                  :style="{-->
<!--                    display: 'inline-block',-->
<!--                    width: `${i}px`,-->
<!--                    height: `${i}px`,-->
<!--                    borderRadius: `${i / 2}px`,-->
<!--                    backgroundColor: lineWidthIndex === index ? drawInfo.lineColor : '#e6e6e6',-->
<!--                    margin: '0 15px'-->
<!--                  }"-->
<!--                >-->
<!--                </span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </transition>-->
<!--      </div>-->
<!--      &lt;!&ndash; 🎨 &ndash;&gt;-->
<!--      <div-->
<!--        v-if="item.key === 'color'"-->
<!--        class="extend"-->
<!--        :style="{ top: `${index * 69}px` }"-->
<!--        @mouseenter="isColorStatus = true" @mouseleave="isColorStatus = false">-->
<!--        <transition name="slide-fade">-->
<!--          <div v-show="isColorStatus">-->
<!--              <span v-for="(item, index) in colorPicker">-->
<!--                <span-->
<!--                  @click.stop="changeLineColor(item, index)"-->
<!--                  :style="{-->
<!--                    display: 'inline-block',-->
<!--                    width: '20px',-->
<!--                    height: '20px',-->
<!--                    borderRadius: '5px',-->
<!--                    backgroundColor: item,-->
<!--                    margin: '0 15px'-->
<!--                  }"-->
<!--                >-->
<!--                  &lt;!&ndash; 选中的小圆点 &ndash;&gt;-->
<!--                  <div-->
<!--                    v-show="index === lineColorIndex"-->
<!--                    class="check-point"-->
<!--                  >-->
<!--                  </div>-->
<!--                </span>-->
<!--              </span>-->
<!--          </div>-->
<!--        </transition>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--  import { fabric } from 'fabric'-->
<!--  import boardMixin from './mixins'-->
<!--  -->
<!--  export default {-->
<!--    name: 'PicBoard',-->
<!--    mixins: [boardMixin],-->
<!--    data() {-->
<!--      return {-->
<!--        type: '', // 当前操作类型-->
<!--        // canvasObj: null, // 画板 canvas 对象-->
<!--        // drawingObject: null, // 当前绘制对象-->
<!--        // isDrawing: false,-->
<!--        // type === 'text' , 文字对象-->
<!--        // textObject: null,-->
<!--        drawInfo: { // 当前绘制信息-->
<!--          mouseFrom: {-->
<!--            x: 0,-->
<!--            y: 0-->
<!--          },-->
<!--          mouseTo: {-->
<!--            x: 0,-->
<!--            y: 0-->
<!--          },-->
<!--          lineColor: '#4D4D4D',-->
<!--          lineWidth: 4-->
<!--        },-->
<!--        /** extend area **/-->
<!--        isFreeStatus: false, // 🖌 扩展显示状态-->
<!--        isColorStatus: false, // 🎨 扩展显示状态-->
<!--        toolsIndex: '', // 工具栏索引-->
<!--        lineWidthIndex: 0,-->
<!--        lineColorIndex: 0,-->
<!--        colorPicker: [-->
<!--          '#4D4D4D', '#999999', '#F44E3B', '#FE9200',-->
<!--          '#FCDC00', '#A4DD00', '#73D8FF', '#FDA1FF'-->
<!--        ],-->
<!--        // /** page **/-->
<!--        // canvasArr: [{}], // 画布集合-->
<!--        // canvasIndex: 0, // 当前画布索引-->
<!--        tools: [-->
<!--          {-->
<!--            key: 'add',-->
<!--            name: '添加画板',-->
<!--            icon: 'icontianjiayemian1'-->
<!--          },-->
<!--          {-->
<!--            key: 'free',-->
<!--            name: '画笔',-->
<!--            icon: 'iconhuabi'-->
<!--          },-->
<!--          {-->
<!--            key: 'color',-->
<!--            name: '调色板',-->
<!--            icon: 'iconyanse1'-->
<!--          },-->
<!--          {-->
<!--            key: 'eraser',-->
<!--            name: '橡皮',-->
<!--            icon: 'iconeraser'-->
<!--          },-->
<!--          {-->
<!--            key: 'line',-->
<!--            name: '直线',-->
<!--            icon: 'iconline'-->
<!--          },-->
<!--          {-->
<!--            key: 'rect',-->
<!--            name: '矩形',-->
<!--            icon: 'iconjuxing'-->
<!--          },-->
<!--          {-->
<!--            key: 'triangle',-->
<!--            name: '三角形',-->
<!--            icon: 'iconiconfontsanjiaoxing'-->
<!--          },-->
<!--          {-->
<!--            key: 'circle',-->
<!--            name: '圆形',-->
<!--            icon: 'iconyuanxing'-->
<!--          },-->
<!--          {-->
<!--            key: 'text',-->
<!--            name: '文本',-->
<!--            icon: 'iconwenzi'-->
<!--          },-->
<!--          {-->
<!--            key: 'select',-->
<!--            name: '选择',-->
<!--            icon: 'icontuozhuai'-->
<!--          },-->
<!--          {-->
<!--            key: 'picture',-->
<!--            name: '图片',-->
<!--            icon: 'icontupian'-->
<!--          },-->
<!--          {-->
<!--            key: 'clear',-->
<!--            name: '清除',-->
<!--            icon: 'iconEliminate'-->
<!--          },-->
<!--          {-->
<!--            key: 'background',-->
<!--            name: '背景',-->
<!--            icon: 'iconbackground'-->
<!--          },-->
<!--          {-->
<!--            key: 'setting',-->
<!--            name: '设置',-->
<!--            icon: 'iconcanshu'-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    },-->
<!--    -->
<!--    methods: {-->
<!--      mouseChange(type, flag) {-->
<!--        const isFree = type === 'free';-->
<!--        const isColor = type === 'color';-->
<!--        if (isFree || isColor) {-->
<!--          this[isFree ? 'isFreeStatus' : 'isColorStatus'] = flag;-->
<!--        }-->
<!--      },-->
<!--      -->
<!--      changeLineWidth(width, index) {-->
<!--        this.lineWidthIndex = index;-->
<!--        this.drawInfo.lineWidth = width;-->
<!--      },-->
<!--      -->
<!--      changeLineColor(color, index) {-->
<!--        this.lineColorIndex = index;-->
<!--        this.drawInfo.lineColor = color;-->
<!--        this.handleTools('free', 1); // 模拟画笔点击-->
<!--      },-->
<!--      -->
<!--      uploadFile(e) {-->
<!--        // 设置图片-->
<!--        const addImage = (data) => {-->
<!--          const imgObj = new Image();-->
<!--          imgObj.src = data;-->
<!--          imgObj.onload = () => {-->
<!--            const image = new fabric.Image(imgObj);-->
<!--            this.canvasObj.centerObject(image);-->
<!--            this.canvasObj.add(image);-->
<!--            this.canvasObj.renderAll();-->
<!--          }-->
<!--        };-->
<!--        // 设置背景-->
<!--        const addBackground = (data) => {-->
<!--          fabric.Image.fromURL(data, (img) => {-->
<!--            this.canvasObj.setBackgroundImage(img, this.canvasObj.renderAll.bind(this.canvasObj), {-->
<!--              scaleX: this.canvasObj.width / img.width,-->
<!--              scaleY: this.canvasObj.height / img.height-->
<!--            });-->
<!--          });-->
<!--        };-->
<!--        const reader = new FileReader();-->
<!--        reader.onload = (event) => {-->
<!--          const data = event.target.result;-->
<!--          (this.type === 'background' ? addBackground : addImage)(data);-->
<!--        }-->
<!--        reader.readAsDataURL(e.target.files[0]);-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--  .board-tools {-->
<!--    .extend {-->
<!--      display: inline-block;-->
<!--      position: absolute;-->
<!--      height: 65px;-->
<!--      left: 70px;-->
<!--      z-index: 100;-->
<!--      padding: 0;-->
<!--      border: none;-->
<!--      border-radius: 2px;-->
<!--      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .6);-->
<!--      -->
<!--      .check-point {-->
<!--        background-color: white;-->
<!--        margin: 5px;-->
<!--        width: 10px;-->
<!--        height: 10px;-->
<!--        border-radius: 5px;-->
<!--        text-align: center;-->
<!--      }-->
<!--    }-->
<!--    -->
<!--    float: left;-->
<!--    width: 69px;-->
<!--    height: 100%;-->
<!--    border-right: 1px solid #e6e6e6;-->
<!--    margin: 0;-->
<!--    padding-left: 0;-->
<!--    background-color: #fff;-->
<!--    overflow: auto;-->
<!--    -->
<!--    &-item {-->
<!--      height: 64px;-->
<!--      text-align: center;-->
<!--      font-size: 25px;-->
<!--      line-height: 69px;-->
<!--      margin-bottom: 5px;-->
<!--    }-->
<!--    -->
<!--    &-item:hover {-->
<!--      background-color: #ecf5ff;-->
<!--    }-->
<!--    -->
<!--    .active {-->
<!--      background-color: #77c9ff;-->
<!--      color: white;-->
<!--    }-->
<!--  }-->
<!--</style>-->
