// pages/report/my_report/my_report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportList:[],
    showNotice:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getBodyCheckList();
    // var user=data_.userData();
    // user.sort(function(a,b){
    //   return Date.parse(b.testTime) - Date.parse(a.testTime);
    // });
    // that.setData({
    //   user:user
    // })
  
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
  
  },
  getBodyCheckList:function(e){
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
            url: app.globalData.localUrl + '/bodycheck/getBodyCheckList',
            data: {
              'openid': openid,              
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              wx.hideLoading()//隐藏加载中提示框
              if (res.data.status == 1) {
                that.setData({
                  reportList: res.data.data,
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
  toDetail:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../my_report_detail/my_report_detail?id='+id,
    })
  },
  hideNotice:function(e){
    console.log(e);
    var that=this;
    that.setData({
      showNotice:false,
    })
  }
})