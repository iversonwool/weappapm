import { lazyReportCache } from './report'
export const originalRequest = wx.request
// 劫持微信的网络请求
export default function requestProxy() {
  
  wx.request = function (args) {
    const { success, url, method, headers, fail } = args
    const originSuccess = success
    const originFail = fail

    const startTime = Date.now()
    const reportData = {
      type: 'performance',
      subType: 'wx.request',
      startTime,
      url,
      method: (method || 'GET').toUpperCase(),
      headers: headers || {},
      endTime: 0,
      duration: 0,
      status: 0,
      success: false,
      timestamp: 0,
    }

    originalRequest({
      ...args,
      success: function (callback) {
        const { statusCode, data } = callback
        if (originSuccess) originSuccess(callback)
        // 数据上报
        reportData.endTime = Date.now()
        reportData.duration = reportData.endTime - reportData.startTime
        reportData.status = statusCode
        reportData.success = true
        reportData.timestamp = new Date().getTime()
        lazyReportCache(reportData)
      },
      fail: function (...callback) {
        if (originFail) originFail(callback)

        reportData.endTime = Date.now()
        reportData.duration = reportData.endTime - reportData.startTime
        reportData.status = 0
        reportData.success = false
        reportData.timestamp = new Date().getTime()
        lazyReportCache(reportData)
      }
    })
  }
}