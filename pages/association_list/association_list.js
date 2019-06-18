// pages/association_list/association_list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {         
      nowtab:0,
      winWidth: 0,
      winHeight: 0,
      list: [], //全部社团列表
      hotList: [], //最热社团列表
      newList: [], //最新社团列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType != "none") {
          that.setData({
            noNetwork: false
          })}
          try {         
              wx.showLoading({
                title: '正在加载中',
              })
              wx.request({//发送请求获得订单详情
                url: app.globalData.localUrl + '/club/club_list',
                data: {                  
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res);                  
                  var data=res.data;
                  that.setData({                    
                    hotList: data.hotClubList,
                    newList: data.newClubList,
                  }, function () {

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
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
        
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
      path: '/pages/association_list/association_list',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  /**
   * 点击tab切换
   */
  switchNow:function(e){
    var that = this;
    if (this.data.nowtab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        nowtab: e.target.dataset.now
      })
    }
  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {
    let that = this;
    that.setData({ nowtab: e.detail.current }
    );

  },
  /** 页面跳转 */
  toAssintro: function (e) {
    var Aid = e.currentTarget.id;
    wx.navigateTo({
      url: '../association_intor/association_intor?id=' + Aid,
    })
  }, 
})