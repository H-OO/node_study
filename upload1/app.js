const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// 配置路由
router.get('/', async ctx => {
  console.log('连接')
  const { req } = ctx
  console.log(req)
  ctx.body = '/index'
})

router.post('/', async ctx => {
  console.log('连接')
  const { req } = ctx

  // 获取 post 请求参数
  let thunks = ''
  req.on('data', thunk => {
    thunks = thunks.concat(thunk)
  })
  req.on('end', () => {
    // const { file } = JSON.parse(thunks);
    console.log(thunks)
  })

  ctx.body = '/index'
})

router.post('/upload', async ctx => {
  const { req } = ctx
  // 获取 post 请求参数
  let thunks = ''
  req.on('data', thunk => {
    console.log(thunk)
    thunks += thunk
  })
  req.on('end', () => {
    console.log(thunks)
  })

  ctx.body = '/upload'
})

app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()) // 在所有路由中间件最后调用，根据`ctx.status`设置响应头
app.listen(9000)
