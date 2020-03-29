/**
 * Created by daizengyu on 2019-08-20.
 */

import io from 'socket.io-client';

const socket = io('http://localhost:8300');

socket.on('connect', () => {
  console.log('socket connect success...');
});

socket.on('disconnect', () => {
  console.log('socket disconnect...');
});

export default socket;
