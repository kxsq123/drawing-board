/**
 * Created by daizengyu on 2019-09-10.
 */

export default class UndoCache {

  constructor(len) {
    this.len = len;
    this.queue = [''];
    this.index = 0;
  }

  push(object) {
    if (this.queue.length >= this.len) {
      this.queue.shift();
    }
    this.queue.push(object);
  }

  get(index) {
    return this.queue[index];
  }

}

