/**
 * Created by daizengyu on 2019-08-28.
 */

import { fabric } from 'fabric'
import { assert } from './index';

const getLine = ({ mouseFrom, mouseTo, lineColor, lineWidth }, type) => {
  return new fabric.Line([mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y], {
    stroke: lineColor,
    strokeWidth: lineWidth,
    ...type === 'dashed' && { strokeDashArray: [3, 5] }
  })
}

const shape = {

  solidLine() {
    return getLine(this, 'solid');
  },

  dashedLine() {
    return getLine(this, 'dashed');
  },

  circle() {
    const { x: lastX, y: lastY } = this.mouseFrom,
      { x, y } = this.mouseTo;
    const radius = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2) / 2;
    return new fabric.Circle({
      left: lastX,
      top: lastY,
      radius,
      fill: "rgba(255, 255, 255, 0)",
      stroke: this.lineColor,
      strokeWidth: this.lineWidth
    });
  },

  rect() {
    const { x: lastX, y: lastY } = this.mouseFrom,
      { x, y } = this.mouseTo;
    return new fabric.Rect({
      left: lastX,
      top: lastY,
      fill: "rgba(255, 255, 255, 0)",
      width: x - lastX,
      height: y - lastY,
      stroke: this.lineColor,
      strokeWidth: this.lineWidth
    });
  },

  triangle() {
    const { x: lastX, y: lastY } = this.mouseFrom,
      { x, y } = this.mouseTo;
    return new fabric.Triangle({
      top: lastY,
      left: lastX,
      width: x - lastX,
      height: y - lastY,
      fill: "rgba(255, 255, 255, 0)",
      stroke: this.lineColor,
      strokeWidth: this.lineWidth
    });
  },

  rightTriangle() {
    const { x: lastX, y: lastY } = this.mouseFrom,
      { x, y } = this.mouseTo;
    const path = `M ${lastX} ${lastY} L ${lastX} ${y} L ${x} ${y} z`;
    return new fabric.Path(path, {
      left: lastX,
      top: lastY,
      stroke: this.lineColor,
      strokeWidth: this.lineWidth,
      fill: "rgba(255, 255, 255, 0)"
    });
  },

  text() {
    const { x, y } = this.mouseFrom;
    return new fabric.Textbox('', {
      left: x,
      top: y,
      width: 150,
      fontSize: 20,
      borderColor: '#2c2c2c',
      hasControls: false
    });
  }
};

const draw = (info, type) => {
  assert(typeof shape[type] === 'function', '未找到对应的函数');
  return shape[type].call(info);
}

export default draw;
