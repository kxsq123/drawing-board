/**
 * Created by daizengyu on 2019-09-05.
 */

const toString = Object.prototype.toString;
const nativeIsArray = Array.isArray;

const assert = (condition, msg) => {
  if (!condition)
    throw new Error(`assert failed, ${msg}`);
}

const isString = target => typeof target === 'string';

const isObject = obj => obj && typeof obj === 'object';

const isArray = nativeIsArray || ((obj) => toString.call(obj) === '[object Array]');

const isEmpty = obj => [Array, Object].includes((obj || {}).constructor) && !Object.keys(obj).length;

const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      fn.apply(this, arguments);
    }, delay);
  }
};

export {
  assert,
  isString,
  isObject,
  isArray,
  isEmpty,
  debounce
};
