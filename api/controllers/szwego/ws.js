exports.test = async (ctx, next) => {
  ctx.websocket.send('Hello World')
  ctx.websocket.on('message', (message) => {
    console.log(message)
  })
  ctx.websocket.on("close", (message) => {
    console.log(message)
  })
}
