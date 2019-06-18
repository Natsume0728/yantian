// pages/act_intro/act_intro.js
var app=getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likes:0,//点赞人数
    clicked:false,// 是否点赞
    act:'',
    prevAid:'',
    nextAid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // WxParse.emojisInit('[]', "/wxParse/emojis/", {
    //   "00": "00.gif",      "01": "01.gif",      "02": "02.gif",      "03": "03.gif",
    //   "04": "04.gif",      "05": "05.gif",      "06": "06.gif",      "07": "07.gif",
    //   "08": "08.gif",      "09": "09.gif",      "09": "09.gif",      "10": "10.gif",
    //   "11": "11.gif",      "12": "12.gif",      "13": "13.gif",      "14": "14.gif",
    //   "15": "15.gif",      "16": "16.gif",      "17": "17.gif",      "18": "18.gif",
    //   "19": "19.gif",
    // });
    var that = this;
    console.log(options);
    wx.getNetworkType({
      success: function (res){
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
            url: app.globalData.localUrl + '/club/activity_detail',
            data: {
              aid: options.aid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              var data = res.data;
              WxParse.wxParse('article', 'html', data.des, that, 24);
              that.setData({
                act: data,
                clicked:data.is_thumb,
                prevAid:data.prevAid,
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
      title: that.data.act.title,
      path: '/pages/act_intro/act_intro?id=' + that.data.act.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    } 
  },
  /**点赞 */
  switchLike:function(e){
    let that=this;
    let clicked=that.data.clicked;
    let likes=that.data.likes;
    if(!clicked){
      that.setData({
        clicked:true,
        likes: ++likes
      })
      // return;
    }else{
      that.setData({
        clicked:false,
        likes:--likes
      })
    }
  },
  prevAct:function(e){
    console.log(e)
    wx.redirectTo({
      url: '../act_intro/act_intro?aid=' + e.currentTarget.dataset.prevaid,
    })
  },
  nextAct:function(e){
    console.log(e);
    wx.redirectTo({
      url: '../act_intro/act_intro?aid=' + e.currentTarget.dataset.nextaid,
    })
  }
})