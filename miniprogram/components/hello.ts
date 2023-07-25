// components/hello.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    a: 'hello who?'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeText() {
      this.setData({
        a: 'hello leehow!'
      })
    }
  },
  // 低版本方式
  attached() {
    console.log('data', this.data)
  }
  // lifetimes 方式
  // lifetimes: {
  //   attached() {
  //     console.log('-', this.data)
  //   }
  // }
})
