// 监控setData 的性能

// 重写 Page
const OriginPage = Page;
export function pageProxy() {
  Page = function (page) {
    const originalOnReady = page.onReady || function () {} // 页面有可能没有定义onReady 方法
    page.onReady = function () {
      // onReady 方法里面监听性能
      this.setUpdatePerformanceListener({ withDataPaths: false /* 设为false 不浪费资源*/ }, (res) => {
        const { updateStartTimestamp, updateEndTimestamp } = res;
        const cost = updateEndTimestamp - updateStartTimestamp;
        console.log(cost);
      });
      return originalOnReady.call(this);
    }
    return OriginPage(page);
  }
}

// 重写 Component
const OriginComponent = Component;
export function componentProxy() {
  Component = function (comp) {
    const originalAttached = comp.attached || function () {};
    let originalLifetimesAttacted
    if (comp.lifetimes && comp.lifetimes.attached) {
      originalLifetimesAttacted = comp.lifetimes.attached

      comp.lifetimes.attached = function () {
        this.setUpdatePerformanceListener({ withDataPaths: false }, (res) => {
          const { updateStartTimestamp, updateEndTimestamp } = res;
          const cost = updateEndTimestamp - updateStartTimestamp;
          console.log('duration', cost);
        });
        return originalLifetimesAttacted.call(this);
      }
    }
    comp.attached = function () {
      this.setUpdatePerformanceListener({ withDataPaths: false }, (res) => {
        const { updateStartTimestamp, updateEndTimestamp } = res;
        const cost = updateEndTimestamp - updateStartTimestamp;
        console.log(cost);
      });
      return originalAttached.call(this);
    };
    return OriginComponent(comp);
  }
}