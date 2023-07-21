import { originalRequest } from './request'
import { addCache, getCache, clearCache } from './cache'
import { currentOS, /*getBrowserInfo*/ } from './utils'
import config from './consts'

// const { browser = 'Chrome', ver = '106.0.0.0' } = getBrowserInfo()
const packagesVersion = /*__VERSION__ ||*/ '1.0.0'
const getOS = currentOS()

const sendBeaconOS = () => {
  return reportWithXHR
}

const sendBeacon = sendBeaconOS()

export function report(data: any, isImmediate = false) {
  if (!config.report_url) {
    console.error('请设置上传 url 地址')
  }
  // TODO: 相关参数需要修改
  const reportData = JSON.stringify({
    type: 'performance',
    platform: 'h5',
    dataSource: getOS.os,
    h5Browser: 'browser',
    h5SdkVersion: packagesVersion,
    h5BrowserVersion: '15.17.1',
    detail: { data },
  })
  console.info('[WEAPP_APM]', data)

  if (isImmediate) {
    sendBeacon(reportData)
    return
  }

  
  setTimeout(() => {
    sendBeacon(reportData)
  })
}

let timer: any = null
export function lazyReportCache(data: any, timeout = 3000) {
  addCache(data)
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    const cacheData = getCache()
    if (cacheData.length) {
      report(cacheData)
      clearCache()
    }
  }, timeout)
}

export function reportWithXHR(data: any) {
  // console.log('data', data)
  // 使用保存的原始对象发送请求 防止循环调用
  originalRequest({
    url: config.report_url,
    header: { api: config.report_api },
    method: 'POST',
    data: JSON.stringify(data)
  })
}