const szwegoSql = require('../../lib/mysql/szwego') 
const ApiErrorNames = require('../../error/ApiErrorNames')
const { size, map, head } = require('lodash')
const fs = require('fs')
const request = require('../../lib/request')
const zipper = require('zip-local')
/**
 * 产品列表
 */
exports.list = async (ctx, next) => {
  /**
   * 关键词 title
   * 商铺ID shopId
   * 分类ID categoryId
   * 页脚  currentPage
   * 显示个数 pageSize
   * 起始时间 start
   * 结束时间 end
   */
  // const { body } = ctx.request
  const { query } = ctx
  try {
    const list = await szwegoSql.product.list(query)
    ctx.body = ApiErrorNames.getSuccessInfo(list)
  } catch (error) {
    ctx.throw(500)
  }
}

exports.edit = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const prd = await szwegoSql.product.edit(body)
    ctx.body = ApiErrorNames.getSuccessInfo(prd)
  } catch (error) {
    ctx.throw(500)
  }
}

const creatDirectory = async (directory) => {
  return new Promise((resolve, reject) => {
    const hasDir = fs.stat(directory, (error, stats) => {
      if (error) {
        return false
      }
      console.log('文件：'+stats.isFile())
      console.log('目录：'+stats.isDirectory())
    })
    if (!hasDir) {
      fs.mkdir(directory, error => {
        if (error) {
            console.log(error)
            return false
        }
        resolve(true)
        console.log('创建目录成功')
      })
    } else {
      resolve(true)
    }
  })
}

exports.download = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const list = body
    let i = 0
    const now = Date.now()
    const tempDir = `public/downloadTemp/${now}`
    await creatDirectory(tempDir)
    while (i < size(list)) {
      const item = list[i]
      const { imgs, title, id } = item
      const filePath = `${tempDir}/${id}`
      await creatDirectory(filePath)
      fs.writeFile(`${filePath}/description.txt`, title, 'utf8', error => {
        if(error){
            console.log(error)
            return false
        }
        console.log('写入成功')
      })
      let j = 0
      while (j < size(imgs)) {
        const { src } = imgs[j]
        const fileName = `${j}.jpg`
        await request.instance({
          method: 'get',
          url: src,
          responseType: 'stream'
        }).then((res) => {
          res.data.pipe(fs.createWriteStream(`${filePath}/${fileName}`))
        }).catch(err => {
          console.log(err)
        })
        j += 1
      }
      i += 1
    }
    zipper.sync.zip(tempDir).compress().save(`${tempDir}.zip`)
    ctx.body = ApiErrorNames.getSuccessInfo({ link: `${process.env.HOST}:${process.env.PORT}/downloadTemp/${now}.zip` })
  } catch (error) {
    ctx.throw(500)
  }
}
