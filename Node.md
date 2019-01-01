# Node

Node 是一个平台，是它选择了JS并为其提供API，让JS能进行后台开发

**概念**

- 回调函数，错误优先
- 异步 // 网络操作或磁盘操作
- I/O // input/output
- 非阻塞机制 // 耗时事件都先放入`事件队列`等待`Event Loop`去执行，触发回调
- 异步操作无法通过`try-catch`语句捕获异常
- thread poolth // 线程池，Node 将阻塞操作交给内部维护的线程池
- Node 主线程通过不断调度实现非阻塞

---

**process**

- stdin // 标准输入
- stdout // 标准输出

---

**fs**

- stat // 检查文件是否存在
- writeFile // 创建文件
- unlink // 删除文件
