import { lazyReportCache } from '../tools/report'
import { getPageURL } from '../tools/utils'

export class ErrorObserver {
  private oldConsoleError: any

  constructor() {
    this.oldConsoleError = console.error;
    this._initObserver();
  }

  private _initObserver() {
    this._composeErrorObserver();
  }

  private _composeErrorObserver() {
    console.error = (...args) => {
      this.oldConsoleError.apply(this, args)
      const now = Date.now()

      lazyReportCache({
        type: 'error',
        subType: 'console-error',
        startTime: now,
        errData: args,
        pageURL: getPageURL(),
        timestamp: new Date().getTime(),
      })
    }

    /*
    收集资源加载失败报错 js css img...
    window.addEventListener('error', (e: any) => {
      const { target, path = [] } = e || {}
      if (!target) return

      if (target.src || target.href) {
        const url = target.src || target.href
        lazyReportCache({
          url,
          type: 'error',
          subType: 'resource',
          startTime: e.timeStamp,
          errData: [''],
          html: target.outerHTML,
          resourceType: target.tagName,
          timestamp: new Date().getTime(),
          paths: path.map(item => {
            const { tagName } = item
            if (!tagName) return ''

            return tagName
          }).filter(Boolean),
          pageURL: getPageURL(),
        })
      }
    }, true) */

    // 收集js错误
    wx.onError(errorString => {
      // console.log('error string\n', errorString)
      // /([^(\s@]*):(\d+):(\d+)/ 匹配堆栈开始的位置，以及报错的文件、行号、列号
      const regExp = /([^(\s@]*):(\d+):(\d+)/
      // /[at\s]*(\S*)(?=[@|\s])/ 匹配出调用的函数名(这里的函数名大多数时候没有意义，因为小程序会做混淆)
      // /(\w*):(.*)/匹配出报错类型和描述 但是有坑,有些设备没有报错类型
      // console.log(errorString.match(regExp))
      const lineAndColumn = errorString.match(regExp)
      if (lineAndColumn) {
        lazyReportCache({
          type: 'error',
          subType: 'js',
          msg: errorString,
          line: lineAndColumn[2],
          column: lineAndColumn[3],
          errData: [errorString],
          pageURL: getPageURL(),
          startTime: Date.now(),
          timestamp: new Date().getTime()
        })
      }
      // console.log(regExp.exec(errorString))
    })

    // 收集promise错误，但有时候可能拿不到数据
    wx.onUnhandledRejection(e => {
      // console.log(e)
      lazyReportCache({
        type: 'error',
        subType: 'promise',
        errData: [e.reason],
        startTime: Date.now(),
        pageURL: getPageURL(),
        timestamp: new Date().getTime(),
      })
    })
  }
}