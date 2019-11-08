//index.js
//获取应用实例
const app = getApp()
const moment = require('../../utils/moment.min.js');
import Toast from 'vant-weapp/toast/toast';

Page({
  data: {
    show: false,
    showNotice: false,
    // 时间选择器
    minHour: 0,
    maxHour: 0,
    // minDate: new Date(2018, 10, 1).getTime(),
    // maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),

    // 选中的截止时间
    luckyDate: moment().format('YYYY-MM-DD, HH:mm:ss'),
    // 抽奖人数
    luckyPeopleNum: 1,
    // 广播地址
    addr: "",
    errorAddr: "",
    // 时间格式化
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      } else if (type === 'hour') {
        return `${value}时`;
      } else if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    }
  },

  // 时间戳格式化
  timestampTodate(timestamp) {
    var date = new Date();
    date.setTime(timestamp);
    return date.toLocaleString()
  },

  // 广播地址解释 
  noticeAddr() {
    this.setData({
      showNotice: true
    });
  },

  noticeAddrClose() {
    this.setData({
      showNotice: false
    });
  },
  //
  addrChange(event) {
    var addr_re = new RegExp("(http|https)+://www.douban.com/[^\s]*")
    if (addr_re.test(event.detail)) {
      this.setData({
        addr: event.detail,
        errorAddr: ''
      })
    } else {
      this.setData({
        errorAddr: "广播地址错误"
      })
    }
  },

  // 抽奖人数
  onPeopleChange(event) {
    this.setData({
      luckyPeopleNum: event.detail
    })
  },

  // 弹出窗口
  showPop() {
    this.setData({
      show: true
    });
  },
  // 关闭弹窗
  onClose() {
    this.setData({
      show: false
    });
  },

  // 时间选择
  timeInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },

  // 日期选择确认
  getDate(event) {
    var timestamp = event.detail;
    var day = moment(timestamp);
    this.setData({
      luckyDate: day.format('YYYY-MM-DD, HH:mm:ss'),
      show: false
    });
  },

  // 下一步按钮
  next() {
    var data = this.data
    if (data.addr === "") {
      Toast.fail({
        message: '广播地址错误',
        duration: 1000
      });
    } else {
      wx.navigateTo({
        url: '../lucky/lucky',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data) {

          },
          someEvent: function(data) {

          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('luckyData', {
            addr: data.addr,
            luckyDate: data.luckyDate,
            luckyPeopleNum: data.luckyPeopleNum
          })
        }
      })
    }
  },
  onLoad: function() {
    
  },
})