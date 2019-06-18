// pages/repair/repair/repair.js
var app=getApp();
Page({
  data: {
    currenttab: 0,
    flag:true,
    street:'',
    imglist:[],
    json_imglist:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  uploadimg:function(e){
    var that=this;    
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res);
        var Url = 'https://group.iron-box.cn';
        for(var i=0;i<tempFilePaths.length;i++){
         
        }
        that.uploadOne(Url,0,tempFilePaths);
      }
    })
  },
  uploadOne: function (Url,i,allpath){
    var that = this;
    wx.uploadFile({
      url: Url + '/upload/upload_files', //仅为示例，非真实的接口地址
      filePath: allpath[i],
      name: 'file',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: {
        'folder': 'newyantian',
        'fileName': 'file'
      },
      success: function (res) {
        var data = JSON.parse(res.data);
        //do something
        console.log(res);
        if (data.status == true) {
          var imglist = that.data.imglist;
          imglist.push(Url + data.real_path);
          that.setData({
            imglist: imglist,
            json_imglist: JSON.stringify(imglist),
          })
          if(i<allpath.length-1){
            that.uploadOne(Url, i+1, allpath);
          }
        }
      }
    })
  },
  delimg:function(e){
    var that=this;
    var imglist=that.data.imglist;
    var index=e.currentTarget.dataset.index;
    imglist.splice(index,1);   
    that.setData({
      imglist: imglist,
      json_imglist: JSON.stringify(imglist),
    })
  },
  /**
   * 页面跳转
   */
  toPlaceintro: function () {
    wx.redirectTo({
      url: '../../place/placelist/placelist',
    })
  },
  toSportsteam: function () {
    wx.redirectTo({
      url: '../../personnel/sport_teams/sport_teams',
    })
  },
  /**
   * 街道选择
   */
  switchCurrent:function(e){
    let that=this;
    that.setData({
      currenttab:e.currentTarget.dataset.current,
      flag:true,
      street: e.currentTarget.dataset.current,
    }
    )    
  },
  // 显示遮罩层
  show:function(){
    let that=this;
    that.setData({
      flag:false
    })
  },

  /**
   * 报修
   */
  formSubmit: function (e) {
    var that = this
    var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8}$/;   
    var formValue=e.detail.value;
    var name = formValue.name, tel = formValue.tel, street = formValue.street, note = formValue.note, address = formValue.address, imglist = formValue.imglist;
    if (name.length == 0) {//判断用户输入的信息是否有效
      wx.showToast({
        title: '请输入姓名',
        image: '../../../images/notice.png',
        duration: 1000
      })
      return false;
      }
      else if(tel.length==0){
        wx.showToast({
          title: '请输入手机号',
          image: '../../../images/notice.png',
          duration: 1000
        })
        return false;
      }
     else if (!myreg.test(formValue.tel)) {
      wx.showToast({
        title: '无效的手机号',
        image: '../../../images/notice.png',
        duration: 1000
      })
      return false;
    } else if (street.length == 0) {
      wx.showToast({
        title: '请选择街道',
        image: '../../../images/notice.png',
        duration: 1000
      })
      return false;
    }
    else if (address.length == 0) {//判断用户输入的信息是否有效
      wx.showToast({
        title: '请输入地址',
        image: '../../../images/notice.png',
        duration: 1000
      })
      return false;
    } else {
      wx.getNetworkType({//获取网络连接状态,如果不为none则执行

        success: function (res) {
          console.log(res.networkType)
          var openid = wx.getStorageSync('openid');
          
          if (res.networkType != "none") {
            that.setData({
              nonet: false
            })
            wx.showLoading({//显示加载中提示框
              title: '加载中',
            })
            wx.request({//添加联系人
              url: app.globalData.localUrl + '/facility/ajax_repair',
              data: {
                openid: openid,
                name: name,
                tel: tel,
                street: street,
                note: note,
                address: address,
                imglist: imglist,                
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data)
                wx.hideLoading()//隐藏加载中提示框
                if (res.data.status == false) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1000
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 1000,
                    success: wx.navigateBack({
                      //url:'/association_intor/association_intor?cid='+that.data.cid,
                    })
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
    }
  }
})