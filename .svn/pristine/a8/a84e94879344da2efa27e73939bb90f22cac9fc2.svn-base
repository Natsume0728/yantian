// pages/index/recom_read/recom_read.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_id:'',
    page:1,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      console.log(options);
      if(parseInt(options.type_id)>0){
        that.setData({
          type_id:options.type_id,
        })
        that.getMore(1);
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
    var that = this;
    console.log(that);
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    var page = that.data.page;
    // 页数+1  
    page = page + 1;
    that.getMore(page);
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
      path: '/pages/bodyindex/recom_read/recom_read',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  getMore: function (page) {
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
          var type_id = that.data.type_id;
          wx.request({//发送请求获得订单详情
            url: app.globalData.localUrl + '/bodycheck/getMore',
            data: {
              type_id: type_id,
              page: page,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var data = res.data;
              console.log(res); 
              //console.log(res.data)
              if (res.data.status == 1) {               
                var oldList =that.data.list;
                for (var i = 0; i < res.data.list.length; i++) {
                    oldList.push(res.data.list[i]);
                } 
                that.setData({
                    list: oldList,
                    page: page,
                }, function () {

                })
              } else {
                wx.showToast({
                  title: '没有更多',
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
  getDetail:function(e){
    wx.redirectTo({
      url: '../report_detail/report_detail?id='+e.currentTarget.dataset.id,
    })
  }
})