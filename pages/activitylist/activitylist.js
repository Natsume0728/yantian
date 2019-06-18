// pages/act_trans/act_trans.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    maxPage: 1,    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getActivityList(1);
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
    var that = this;
    var page = that.data.page;
    var maxPage = that.data.maxPage;
    console.log(that);
    if (maxPage > page) {
      that.getActivityList(parseInt(page) + 1);
    }
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
      path: '/pages/activitylist/activitylist',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  getActivityList: function (page) {
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
            url: app.globalData.localUrl + '/activity/getActivityList',
            data: {
              'page': page,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var data = res.data;
              //console.log(res); 
              //console.log(res.data)
              if (res.data.status == 1) {
                var oldList = that.data.list;
                for (var i = 0; i < data.list.length; i++) {
                  oldList.push(data.list[i]);
                }
                that.setData({
                  list: oldList,
                  maxPage: data.maxPage,
                  page: data.page,
                }, function () {
                  if (data.maxPage == data.page) {
                    wx.showToast({
                      title: '没有更多数据',
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: '没有更多数据',
                })
                that.setData({
                  maxPage: that.data.page,
                }, function () {

                })
                console.log(res);
              }
              
            },
            fail: function (error) {
              wx.showToast({
                title: '没有网络',
              })//隐藏加载中提示框
              that.setData({
                nonet: true
              })
            }
          })
          wx.hideLoading()//隐藏加载中提示框
        } else {
          that.setData({
            nonet: true
          })

        }
      }
    })
  },
  toActivityDetail: function (e) {
    wx.navigateTo({
      url: '../actdetails/actdetails?id='+e.currentTarget.dataset.id,
    })
  },
})