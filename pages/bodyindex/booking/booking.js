// pages/index/booking/booking.js
var app=getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    substate:true,//报名状态
    gender:'男',//选择性别
    notice:[],
    btnstyle:false, //buttn样式
    booking_date:'',
    time_range:'',
    dateArray:[],
    timeRangeArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getBookingNotice();
    that.getOpeningTime();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '盐田体育通',
      path: '/pages/bodyindex/booking/booking',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  // 点击选择性别
  clicked:function(e){
    let that=this;
    that.setData({
      gender: e.target.dataset.clicked
    })
  },
  btnstyle:function(){
    let that = this;
    that.setData({
      butstyle: true
    })
  },
  getBookingNotice:function(){  
      var that = this;
      wx.getNetworkType({//获取网络连接状态,如果不为none则执行
        success: function (res) {
          //console.log(res.networkType)
          if (res.networkType != "none") {
            that.setData({
              nonet: false
            })
            wx.showLoading({//显示加载中提示框
              title: '加载中',
            })
            wx.request({
              url: app.globalData.localUrl + '/bodycheck/getBookingNotice',
              data: {
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data)
               
                if (res.data.status == 1) {
                  that.setData({
                    notice: res.data.data,                    
                  })
                  if (res.data.data.content) {
                    WxParse.wxParse('article', 'html', res.data.data.content, that, 96);
                  }
                } else {
                  wx.showToast({
                    title: '获取信息失败',
                    icon: 'none',                    
                  })
                }
              },
              fail: function (error) {
                
                that.setData({
                  nonet: true
                })
              }
            })
          } else {
            that.setData({
              nonet: true
            })
          }
          wx.hideLoading()//隐藏加载中提示框
        }
      })    
  },
  getOpeningTime:function(){
    var that=this;
    wx.getNetworkType({//获取网络连接状态,如果不为none则执行
      success: function (res) {
        //console.log(res.networkType)
        if (res.networkType != "none") {
          that.setData({
            nonet: false
          })
          wx.showLoading({//显示加载中提示框
            title: '加载中',
          })
          wx.request({
            url: app.globalData.localUrl + '/bodycheck/getOpeningTime',
            data: {              
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              wx.hideLoading()//隐藏加载中提示框
              if (res.data.status == 1) {
                  that.setData({
                    dateArray:res.data.dateArray,
                    timeRangeArray: res.data.timeRangeArray,
                  })
              } else {
                wx.showToast({
                  title: '没有可用的日期',
                  icon: 'success',
                  duration: 1500
                })
              }
            },
            fail: function (error) {             
              that.setData({
                nonet: true
              })
            }
          })
        } else {
          that.setData({
            nonet: true
          })
        }
        wx.hideLoading()//隐藏加载中提示框
      }
    })
  },
  // 信息提交
  formSubmit: function (e) {
    var that = this;
    var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8}$/;
    var idreg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    console.log(e.detail.value);
    console.log(that.data.gender);
    if (e.detail.value.name.length == 0 || e.detail.value.tel.length == 0 || e.detail.value.age.length ==0 || e.detail.value.identity.length == 0) {//判断用户输入的信息是否有效
      wx.showToast({
        title: '请输入完整信息',
        image: '../../../images/notice.png',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(e.detail.value.tel)) {
      wx.showToast({
        title: '无效的手机号',
        image: '../../../images/notice.png',
        duration: 1500
      })
      return false;
    } else if (!idreg.test(e.detail.value.identity)) {
      wx.showToast({
        title: '无效的身份证号',
        image: '../../../images/notice.png',
        duration: 1500
      })
      return false;
    } else {
      wx.getNetworkType({//获取网络连接状态,如果不为none则执行
        success: function (res) {
          //console.log(res.networkType)
          if (res.networkType != "none") {
            that.setData({
              nonet: false
            })
            wx.showLoading({//显示加载中提示框
              title: '加载中',
            })
            var openid=wx.getStorageSync('openid');
            wx.request({//添加联系人
              url: app.globalData.localUrl+'/bodycheck/booking',
              data: {
                openid: openid,
                name: e.detail.value.name,
                tel: e.detail.value.tel,
                identity: e.detail.value.identity,
                age: e.detail.value.age,
                gender: that.data.gender,
                booking_date:e.detail.value.date,
                time_range: e.detail.value.time_range
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {                
                console.log(res.data)
                wx.hideLoading()//隐藏加载中提示框
                if (res.data.status== 1) {
                  wx.showModal({
                    title: '预约成功',
                    content: res.data.msg,
                    showCancel:false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({

                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  });
                  
                  
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1500
                  })
                }
              },
              fail: function (error) {
                wx.hideLoading()//隐藏加载中提示框
                that.setData({
                  nonet: true
                })
              }
            })
          } else {
            that.setData({
              nonet: true
            })
          }
        }
      })
    }
  },
  calendarClick: function (e) {
    var that=this;
    var dateArray = that.data.dateArray;
    this.setData({
      date: dateArray[e.detail.value],
      timeArray:that.data.timeRangeArray[e.detail.value],
      time_range:'',
    })
  },
  timeRangeClick:function(e){
    var that = this;
    var timeArray = that.data.timeArray;
    this.setData({
      time_range: timeArray[e.detail.value]
    })
  },
})