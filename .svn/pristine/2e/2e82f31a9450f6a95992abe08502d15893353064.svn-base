// pages/tansintro/tansintro.js
var app=getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    detail:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=parseInt(options.id);
    console.log(id);
    if(id>0){
      var that=this;
      that.trainingDetail(id);
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
  onShareAppMessage: function () {
  
  },
  trainingDetail: function (id) {
    var that = this;
    wx.getNetworkType({//获取网络连接状态,如果不为none则执行
      success: function (res) {
        //console.log(res.networkType)        
        if (res.networkType != "none"&&id>0) {
          that.setData({
            nonet: false,
          })
          wx.showLoading({//显示加载中提示框
            title: '加载中',
          })
          wx.request({//发送请求获得订单详情
            url: app.globalData.localUrl + '/activity/trainingDetail',
            data: {
              'id': id,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var data = res.data;
              //console.log(res); 
              //console.log(res.data)
              if (res.data.status == 1) {
                that.setData({
                  detail: data.detail,
                }, function () {
                  if (data.detail.des){
                    WxParse.wxParse('des', 'html', data.detail.des, that, 96);
                  }else{
                    that.setData({
                      currentTab: 1,
                    })
                  }
                  if(data.detail.content){
                    WxParse.wxParse('content', 'html', data.detail.content, that, 96);
                  }else{
                    that.setData({
                      currentTab: 2,
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: '获取数据失败',
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
  swichTabs:function(e){
    var that=this;
    if(this.data.currentTab === e.target.dataset.current){
      return false;
    }else{
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
   
  }

})