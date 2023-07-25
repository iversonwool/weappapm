import { isEqual } from '../tools/utils'
import { lazyReportCache } from '../tools/report'

/**
 * 小程序启动监控
 */

class LaunchObserver {
  constructor() {
    this._initObserve()
  }

  private _initObserve() {
    // 对应App.onShow
    wx.onAppShow(showOptions => {
      // 获取本次小程序启动时的参数。如果当前是冷启动，则返回值与 App.onLaunch 的回调参数一致；如果当前是热启动，则返回值与 App.onShow 一致
      const enterOptions = wx.getEnterOptionsSync()
      // console.log('enterOptions', enterOptions)

      // 对应App.onLaunch
      const launchOptons = wx.getLaunchOptionsSync()
      // console.log('launchOptons', launchOptons)

      // console.log('showOptions', showOptions)
      const isColdStart = isEqual(enterOptions, launchOptons)
      // 这里有问题 showOptions 没有shareTicket字段 导致判断失效
      // 不是冷启动 就是 热启动
      const isHotStart = isEqual(enterOptions, showOptions)
      if (isColdStart) {
        lazyReportCache({
          type: 'performance',
          subType: 'cold-start', // 暂且这么命名吧
          startTime: Date.now(),
          timestamp: new Date().getTime(),
          pageURL: showOptions.path
        })
      } else {
        lazyReportCache({
          type: 'performance',
          subType: 'hot-start', // 暂且这么命名吧
          startTime: Date.now(),
          timestamp: new Date().getTime(),
        })
      }
    })
  }
}

export default LaunchObserver