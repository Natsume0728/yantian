// pages/index/report_detail/report_detail.js
var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    nonet:false,
    detail: [],
    clicked: false,
    prevAid: 0,
    nextAid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      if(parseInt(options.id)>0){
        that.setData({
          id:options.id
        })
        that.getDetail();
      }
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
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '盐田体育通',
      path: '/pages/bodyindex/report/report?id='+that.data.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  getDetail:function(){  
    var that = this;   
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType != "none") {
          that.setData({
            noNetwork: false
          })
        }
        try {//获取用户的openid           
          wx.showLoading({
            title: '正在加载中',
          })
          wx.request({//发送请求获得订单详情
            url: app.globalData.localUrl + '/bodycheck/detail',
            data: {
              id: that.data.id
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              var data = res.data;
              WxParse.wxParse('article', 'html', data.content, that, 24);
              that.setData({
                detail: data,
                clicked: false,
                prevAid: data.prevAid,
                nextAid: data.nextAid,
              }, function () {
                console.log(that.data);
              })
              wx.hideLoading()//隐藏加载中提示框
            },
            fail: function (error) {
              wx.hideLoading()//隐藏加载中提示框
              that.setData({
                nonet: true
              })
            }
          })
        }
        catch (e) {
          console.log("initiate从缓存中获取openid失败")
        }
      }
    })
  },
  next: function (e) {
    console.log(e)
    wx.redirectTo({
      url: '../report_detail/report_detail?id=' + e.currentTarget.dataset.id,
    })
  },
})