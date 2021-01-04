const axios = require('axios')
const QS = require('qs')
const ApiErrorNames = require('../error/ApiErrorNames')
const { assign, isUndefined, isEmpty } = require('lodash')
const cheerio = require('cheerio')

const config = {
  timeout: 60 * 1000
}
const customConfig = {
  retry: 5,
  retryDelay: 1000,
  shouldRetry: (error) => {
    return error
  },
  withCredentials: true
}

const queue = {}

const instance = axios.create(config)

instance.interceptors.request.use(
  (config) => {
    if (isUndefined(queue[config.url])) {
      queue[config.url] = {
        retryCount: 0
      }
    }
    return assign(config, customConfig)
  },
  (err) => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    const config = err.config
    const key = config.url
    if (err.response && !isUndefined(err.response.status) && err.response.status === 404) {
      const $ = cheerio.load(String(err.response.data))
      const href = $('#saveQuest').attr('href')
      if (!isUndefined(href) && !isEmpty(href)) {
        return err.response
      }
    }
    console.log('retry', queue[key].retryCount)
    // 判断是否配置了重试
    if (!config || !config.retry) {
      queue[key] = undefined
      return Promise.reject(err)
    }

    if (!config.shouldRetry || typeof config.shouldRetry !== 'function') {
      queue[key] = undefined
      return Promise.reject(err)
    }

    // 判断是否满足重试条件
    if (!config.shouldRetry(err)) {
      queue[key] = undefined
      return Promise.reject(err)
    }

    // 判断是否超过了重试次数
    if (queue[key].retryCount >= config.retry) {
      queue[key] = undefined
      return Promise.reject(err)
    }

    // 重试次数自增
    queue[key].retryCount += 1

    // 延时处理
    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, config.retryDelay || 1)
    })

    // 重新发起axios请求
    return backoff.then(() => {
      return instance(config)
    })
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

const get = async (url, params, isHtml = false) => {
  const CancelToken = axios.CancelToken
  let cancel = null
  const requestParams = {
    params,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  }
  return new Promise((resolve, reject) => {
    instance
      .get(url, requestParams)
      .then((res) => {
        queue[url] = undefined
        const resInfo = !isHtml ? res.data : { data: res.data }
        resolve(ApiErrorNames.getSuccessInfo(assign(resInfo, { headers: res.headers, cancel })))
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const post = async (url, params) => {
  const CancelToken = axios.CancelToken
  let cancel = null
  const requestParams = assign(QS.stringify(params), {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })
  return new Promise((resolve, reject) => {
    instance
      .post(url, requestParams)
      .then((res) => {
        queue[url] = undefined
        resolve(ApiErrorNames.getSuccessInfo(assign(res.data, { headers: res.headers, cancel })))
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  instance,
  get,
  post
}
