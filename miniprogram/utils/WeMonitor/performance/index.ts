import { lazyReportCache } from '../tools/report'
import LaunchObserver from './launch'

export class PerformanceObserver {
  constructor() {
    this._initObserver()
  }

  private _initObserver() {
    const performance = wx.getPerformance()
    const observer = performance.createObserver((e) => {
      // if (observer) observer.disconnect()
      console.log('-', e.getEntries())
      const entries = e.getEntries()
      entries.forEach((p: any) => {
        if (p.name === 'firstContentfulPaint') {
          // 页面首次内容绘制(FCP)时间点
          lazyReportCache({
            type: 'performance',
            subType: 'first-screen-paint',
            startTime: p.startTime,
            pageURL: p.path,
            timestamp: new Date().getTime(),
          })
        } else if (p.name === 'largestContentfulPaint') {
          // 页面最大内容绘制(LCP)时间点
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            startTime: p.startTime,
            name: p.name,
            pageURL: p.path,
            timestamp: new Date().getTime(),
          })
        } else if (p.name === 'firstRender') {
          // 页面首次渲染耗时
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            startTime: p.startTime,
            timestamp: new Date().getTime(),
            pageURL: p.path,
            duration: p.duration,
          })
        } else if (p.name === 'appLaunch') {
          // 小程序启动耗时
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            startTime: p.startTime,
            timestamp: new Date().getTime(),
            pageURL: p.path,
            duration: p.duration
          })
        } else if (p.name === 'route') {
          // 路由处理耗时
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            entryType: p.entryType,
            startTime: p.startTime,
            timestamp: new Date().getTime(),
            pageURL: p.path,
            duration: p.duration,
            referrer: p.referrerPath
          })
        } else if (p.name === 'evaluateScript') {
          // 逻辑层 JS 代码注入耗时
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            startTime: p.startTime,
            timestamp: new Date().getTime(),
            duration: p.duration
          })
        } else if (p.name === 'downloadPackage') {
          // 代码包下载耗时
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            startTime: p.startTime,
            timestamp: new Date().getTime(),
            duration: p.duration
          })
        } else if (p.name === 'resourceTiming') {
          // 视图层资源加载耗时
          lazyReportCache({
            type: 'performance',
            subType: p.name,
            startTime: p.startTime,
            timestamp: new Date().getTime(),
            duration: p.duration,
            initiatorType: p.initiatorType,// 初始化性能条目的资源类型
            uri: p.uri // 资源路径
          })
        }
      });
    })
    // https://developers.weixin.qq.com/miniprogram/dev/api/base/performance/PerformanceEntry.html
    // 所有的类型['render', 'script', 'navigation', 'loadPackage', 'resource']
    observer.observe({ 
      entryTypes: [
        'render',
        'navigation',
        'script',
        'loadPackage',
        'resource', // 是单个页面元素的加载
      ] 
    })

    new LaunchObserver()
  }
}