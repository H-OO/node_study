const events = require('events');
const EventEmitter = new events.EventEmitter();
// 监听 todo 事件
EventEmitter.on('todo', args => {
  console.log('todo..');
  console.log(args);
});

// 模拟异步
setTimeout(() => {
  // 触发 todo 事件
  EventEmitter.emit('todo', {
    a: 123
  });
}, 2000);