// pages/report/my_detail/my_detail.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      person:{},
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getBodyCheckInfo(options.id);
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
  onShareAppMessage: function () {
  
  },
  getBodyCheckInfo:function(id){
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
          var openid = wx.getStorageSync('openid');
          wx.request({
            url: app.globalData.localUrl + '/bodycheck/getBodyCheckInfo',
            data: {
              'openid': openid, 
              'id':id,             
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              wx.hideLoading()//隐藏加载中提示框
              if (res.data.status == 1) {
                that.setData({
                  person: res.data.data,
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
  toCard:function(){
    wx.navigateTo({
      url: '../report_card/report_card',
    })
  }
})