// app.ts

import Monitor from './utils/WeMonitor/core/index'
// import WeAppMonitor from './utils/monitor.min.js'

App<IAppOption>({
  globalData: {},
  onLaunch() {
    // const data = performance.getEntriesByType('render')
    // console.log('-data-', data)
    new Monitor();
    // new WeAppMonitor()

    
  },
})