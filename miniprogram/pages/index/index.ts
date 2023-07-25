// index.ts

// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    a: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // console.log(p);

    // wx.onError(errorString => {
    //   console.log('error string\n', errorString)
    //   // console.log(e.message, e.stack)
    //   // const regExp = /([^(\s@]*):(\d+):(\d+)/
    //   // console.log(errorString.match(regExp))
    //   // console.log(regExp.exec(errorString))
    // })
    //
    // console.error('test error')
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     reject('reject message')
    //   }, 1000)
    // })
    
    // request
    // wx.request({
    //   url: 'https://dftcapp.dfmc.com.cn/ptapi/dftc-portal-service/dfctClueConfig/selectAll',
    //   method: 'POST',
    //   data: {envType: 1},
    //   success() {
    //     // console.log('-response-', res);
    //   }
    // })
    // console.log(p)
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  // onReady() {
  //   // onReady 方法里面监听性能
  //   this.setUpdatePerformanceListener({ withDataPaths: true }, (res: any) => {
  //     const { updateStartTimestamp, updateEndTimestamp, dataPaths = [] as string[] } = res;
  //     const cost = updateEndTimestamp - updateStartTimestamp;
  //     console.log('duration', cost);
  //   });
  // },
  onImgClick() {
    this.setData({
      a:{
        b: [
          {a: 1}, {b: 3},
          {c: [{a: 1}, {b: 3},
            {c: [{}]}]}
        ]
      }
    })
  }
})
