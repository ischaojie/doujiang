//app.js
App({
  onLaunch: function () {
    // auth
    this.auth() 
  },


  auth() {
    wx.request({
      url: 'https://doujiang.shiniao.fun/v1/token?key=hakuna',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        wx.setStorageSync('token', res.data.message)
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})