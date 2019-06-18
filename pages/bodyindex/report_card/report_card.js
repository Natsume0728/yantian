// pages/report/report_card/report_card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var date=new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(month>1 && month<10){
      month="0"+month;
    }
    if (day > 1 && day < 10){
      day ="0"+day;
    }
    var time=date.getFullYear()+'-'+month+'-'+day;
    that.setData({
      time:time
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
  
  }
})