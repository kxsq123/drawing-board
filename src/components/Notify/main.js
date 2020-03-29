/**
 * Created by daizengyu on 2019-09-10.
 */

import Vue from 'vue';
import Main from './index';
import { assert, isString, isObject } from '@/utils'

const NotifyConstructor = Vue.extend(Main);

const Notify = (options) => {
  const instance = new NotifyConstructor({ data: options });
  instance.$mount();
  document.body.appendChild(instance.$el);
}

// 添加方法, 支持$notify.success 的调用方式
['success', 'error', 'warning'].forEach(type => {
  Notify[type] = (options) => {
    assert(isString(options) || isObject(options))
    const params = {
      type,
      ...isString(options) ? { message: options } : options
    }
    return Notify(params);
  }
});

export default Notify;
