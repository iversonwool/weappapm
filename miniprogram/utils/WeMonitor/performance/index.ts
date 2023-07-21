import { lazyReportCache } from '../tools/report'
import { getPageURL } from '../tools/utils'

export class PerformanceObserver {
  constructor() {
    this._initObserver()
  }

  private _initObserver() {
    const performance = wx.getPerformance()
    const observer = performance.createObserver((e) => {
      if (observer) observer.disconnect()
      console.log('-', e.getEntries())
      const entries = e.getEntries()
      entries.forEach((p: any) => {
        if (p.name === 'firstContentfulPaint') {
          // console.log('FCP')
          lazyReportCache({
            type: 'performance',
            subType: 'first-screen-paint',
            startTime: p.startTime,
            pageURL: getPageURL(),
            timestamp: new Date().getTime(),
          })
        } else if (p.name === 'largestContentfulPaint') {
          // console.log('LCP')
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            target: '',
            startTime: p.startTime,
            name: p.name,
            pageURL: getPageURL(),
            timestamp: new Date().getTime(),
          })
        } else if (p.name === 'firstRender') {
          // console.log('FR')
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            startTime: p.startTime,
            timestamp: new Date().getTime(),
            pageURL: getPageURL(),
          })
        }
      });
    })
    // https://developers.weixin.qq.com/miniprogram/dev/api/base/performance/PerformanceEntry.html
    // 所有的类型['render', 'script', 'navigation', 'loadPackage', 'resource']
    observer.observe({ 
      entryTypes: [
        'render',
        // 'resource', // 是单个页面元素的加载
        // 不需要的不监听，不浪费资源
        /*'script', 'navigation', 'loadPackage', */
      ] 
    })
  }
}