// pages/personnel/teams/teams.js
var app=getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_id:'',
    nonnet:false,
    info:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    if(parseInt(options.team_id)>0){
      that.setData({
        team_id: options.team_id,
      })
      that.getDetail()
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
  getDetail: function (e) {
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
          wx.request({//发送请求获得订单详情
            url: app.globalData.localUrl + '/team/team_detail',
            data: {
              team_id: that.data.team_id,
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
                  info: data,
                }, function () {
                  WxParse.wxParse('article', 'html', data.introduce, that, 24);
                })
              } else {
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
})