// pages/bodyindex/my_appoint/my_appoint.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currenttab:0,
    has_appoint:true,
    userlist:[],
    my:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this; 
    that.getBooking();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    var userlist = that.data.userlist;  
    
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
  
  },
  // tab
  toTab:function(e){
    let that=this;
    that.setData({
      currenttab:e.target.dataset.tab
    })
  },
  cancel_booking:function(e){
    var that=this;
    wx.showModal({
      title: '温馨提示',
      content: '确认取消?',
      success:function(res){
          if(res.confirm){
            that.cancelBooking(e);
          }else{

          }
      }
    })
  },
  cancelBooking:function(e){
      var that=this;      
      wx.getNetworkType({//获取网络连接状态,如果不为none则执行
          success: function (res) {
            //console.log(res.networkType)
            if (res.networkType != "none") {
              that.setData({
                nonet: false
              })
              wx.showLoading({//显示加载中提示框
                title: '提交中',
              })
              var openid = wx.getStorageSync('openid');
              wx.request({
                url: app.globalData.localUrl + '/bodycheck/cancel_booking',
                data: {
                  'openid': openid,
                  'id':e.currentTarget.dataset.id,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data)
                  wx.hideLoading()//隐藏加载中提示框
                  if (res.data.status == 1) {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'success',
                      duration: 1000
                    })
                    wx.redirectTo({
                      url:'../my_appoint/my_appoint',
                    })
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
  },
  getBooking:function(){    
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
          var openid=wx.getStorageSync('openid');
          wx.request({
            url: app.globalData.localUrl + '/bodycheck/getBooking',
            data: {
              'openid':openid,              
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              wx.hideLoading()//隐藏加载中提示框
              if (res.data.status == 1) {
                  that.setData({
                      userlist:res.data,
                  })
              } else {
                wx.showToast({
                  title: '没有预约信息',
                  icon: 'none',
                  duration: 1000
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
  },
  goToBooking: function (e) {
      wx.navigateTo({
        url: '../booking/booking',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
  },
})
