// pages/bodyindex/index/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:[],
    report:[],
    show_more_q:true,
    show_more_r:false,
    nonet:false,
    userbind:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.initialPage()
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
      path: '/pages/bodyindex/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  initialPage:function(){
      var that = this;
      wx.getNetworkType({//获取网络连接状态,如果不为none则执行
        success: function (res) {
          //console.log(res.networkType)
          if (res.networkType != "none") {
            that.setData({
              nonet: false,
            })
            wx.showLoading({//显示加载中提示框
              title: '加载中',
            })
            var openid =wx.getStorageSync('openid');
            console.log(openid);
            wx.request({//发送请求获得订单详情
              url: app.globalData.localUrl + '/Bodycheck/index',
              data: {
                'getinfo':1,
                'openid':openid,
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                var data = res.data;
                //console.log(res); 
                console.log(res.data)
                if (res.data.status == 1) {                  
                    that.setData({
                      question: data.question.list,
                      report:data.report.list,
                      show_more_q:data.question.count>1?true:false,
                      show_more_r:data.report.count>1?true:false,
                      userbind:data.userbind,
                    }, function () {
                        console.log(that.data);
                    })
                } else {
                  wx.showToast({
                    title: '服务器忙',
                  })
                  console.log(res);
                }
                wx.hideLoading()//隐藏加载中提示框
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
  }, 
  /**
   * 页面路由
   */
  seeDetail:function(e){
    wx.navigateTo({
      url: '../report_detail/report_detail?id='+e.currentTarget.dataset.id,
    })
  },
  toGetMore:function(e){    
    wx.navigateTo({
      url: '../recom_read/recom_read?type_id='+e.currentTarget.dataset.typeid,
    })
  },  
  toBooking:function(){
    wx.navigateTo({
      url: '../booking/booking',
    })
  },
  toMybooking:function(){
    wx.navigateTo({
      url: '../my_appoint/my_appoint',
    })
  },
  toMyreport:function(){
    wx.navigateTo({
      url: '../my_report/my_report',
    })
  },
  toUserBind: function () {
    wx.navigateTo({
      url: '../userBind/userBind',
    })
  }
})