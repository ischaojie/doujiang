// pages/lucky.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOrHidden: false,
    // 抽奖前动画展示
    showDou: true,
    addr: "",
    // 抽奖人数
    luckyPeopleNum: 1,
    // 截止时间
    luckyDate: "",
    // 抽中的用户
    luckyPeople: "",
    // 幸运用户名字
    luckyPeopleName: " ",
    reshareNum: ""

  },
  // 复制幸运用户名字
  copyLuckyPeople: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text.slice(9),
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  // 抽奖
  lucky(mdata) {
    var resdata;
    var mluckyPeopleName;
    var self = this;
    wx.request({
      url: 'https://doujiang.shiniao.fun/v1/lucky',
      data: {
        url: mdata.addr,
        time: mdata.luckyDate,
        num: mdata.luckyPeopleNum
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      method: 'POST',
      success(res) {
        console.log(res.data)
        resdata = res.data.message;
        for (var lucky in resdata.lucky) {

          mluckyPeopleName += " @"+resdata.lucky[lucky]['name']

        };
        self.setData({
          showOrHidden: true,
          showDou: false,
          luckyPeople: resdata.lucky,
          reshareNum: resdata.reshare,
          luckyPeopleName: mluckyPeopleName
        });
      },
      fail(err) {
        console.log(err)
      }
    });


  },

  luckyStart: function(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var mdata
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {
      data: 'test'
    });
    eventChannel.emit('someEvent', {
      data: 'test'
    });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('luckyData', function(data) {
      console.log(data)
      mdata = data

    });
    this.setData({
      addr: mdata.addr,
      luckyDate: mdata.luckyDate,
      luckyPeopleNum: mdata.luckyPeopleNum
    });

    // 抽奖前动画

    // 抽奖
    this.lucky(mdata);

    // wx.setStorageSync('resLucky', res)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})