// pages/photo_intro/photo_intro.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag:true,
      images:[
      ],
      img_id:'',
      big:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
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
            url: app.globalData.localUrl + '/club/club_atlas',
            data: {
              cid: options.cid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              var data = res.data; 
              console.log(data.atlas);            
              that.setData({
                images: data.atlas.real,               
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
  show:function(e){
    let that=this;
    if(that.data.flag){
      that.setData({
        flag: false,
        img_id:e.target.id
      })
    }else{
    that.setData({
      flag:true,
      img_id: e.target.id
    })
    }
   console.log(that.data.img_id);
   console.log(e.target.id);
   var index = that.data.img_id;
   var images = that.data.images;
   for (let i = 0; i < images.length; i++) {
     if (images[i].pic_id == index) {
       that.setData({
         big: images[i]
       }
       )
     }
   }
  }
})