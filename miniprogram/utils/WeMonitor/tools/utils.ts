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


// 判断是否是对象或数组
function isObject(obj: object) {
  return typeof obj === 'object' && obj !== null
}
// 全相等（深度）
export function isEqual(obj1: object, obj2: object) {
  if (!isObject(obj1) || !isObject(obj2)) {
      // 值类型（注意，参与 equal 的一般不会是函数）
      return obj1 === obj2
  }
  if (obj1 === obj2) {
      return true
  }
  // 两个都是对象或数组，而且不相等
  // 1. 先取出 obj1 和 obj2 的 keys ，比较个数
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
      return false
  }
  // 2. 以 obj1 为基准，和 obj2 一次递归比较
  for (let key in obj1) {
      // 比较当前 key 的 val —— 递归！！！
      const res = isEqual(obj1[key], obj2[key])
      if (!res) {
          return false
      }
  }
  // 3. 全相等
  return true
}
// ————————————————
// 版权声明：本文为CSDN博主「react_in」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/weixin_40957741/article/details/115130590
