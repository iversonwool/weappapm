// const appInstace = getApp()

/**
 * fn for deep copy
 * @param {*} target 
 * @returns 
 */
export function deepCopy(target: any) {
  if (typeof target === 'object') {
    const result: any = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (typeof target[key] == 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }

    return result
  }

  return target
}

/**
 * get current os
 * @returns 
 */
export const currentOS = () => {

  let os // 操作系统
  // 这个device info 就够了
  const deviceInfo = wx.getDeviceInfo()
  // console.log(deviceInfo)
  // console.log('-', wx.getSystemInfoSync())
  let system = deviceInfo.system
  if (system.match(/iOS/i) != null) {
    os = 'iOS'
  } else {
    os = 'Android'
  }
  // 鸿蒙， Windows 认为是Android
  return {
    os
  }
}

/**
 * get BrowserInfo
 * @returns { browser: string, ver: string }
 */
// export const getBrowserInfo = () => {
//   const Sys = {
//     browser: 'mobile',
//     ver: ''
//   }
//   const ua = navigator.userAgent.toLowerCase();

//   const re = /(msie|firefox|chrome|opera|safari|mobile|version).*?([\d.]+)/;
//   const m = ua.match(re);

//   if (!m) return Sys;

//   Sys.browser = m[1].replace(/version/, 'safari');
//   Sys.ver = m[2];

//   return Sys
// }

/**
 * get your page url
 * @returns 
 */
export function getPageURL() {
  const pages = getCurrentPages() //获取加载的页面
  const currentPage = pages[pages.length-1] //获取当前页面的对象
  var url = currentPage?.route || '' //当前页面url
  return url
}
