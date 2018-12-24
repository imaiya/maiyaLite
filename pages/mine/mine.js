let MyUser = new wx.BaaS.User()
import contentAPI from '../../api/api_content'
const {
  $Message
} = require('../../dist/base/index');
Page({
  data: {
    about_id: '',
    subscibe: false,
    nickname: "nickname",
    avatar: "https://cloud-minapp-23011.cloud.ifanrusercontent.com/1gZY5WlFS52T4hmP.png",
    show_authorize: false
  },
  onChange(event) {
    const detail = event.detail;
    $Message({
      content: detail.value ? '订阅成功' : '已为您取消订阅',
      duration: 3,

    });
    this.setData({
      'subscibe': detail.value
    })
    contentAPI.updateUserSubscibe(detail.value)

  },
  onFormidAccess(e) {
    console.log('获取到formId并上报: ' + e.detail.formId)
    wx.BaaS.wxReportTicket(e.detail.formId)
  },

  userInfoHandler(data) {
    wx.BaaS.handleUserInfo(data).then(res => {
      // res 包含用户完整信息，详见下方描述
      this.setData({
        nickname: res.nickName,
        avatar: res.avatarUrl,
        show_authorize: false
      })
    }, res => {
      $Message({
        content: '登录失败,请重新登录',
        duration: 5,
        type: 'warning'
      });
      // **res 有两种情况**：用户拒绝授权，res 包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 Error 对象（详情见下方注解）
    })
  },
  onLoad: function() {
    var that = this
    // 简单登录,无需授权
    wx.BaaS.login(false).then(res => {
      console.log(res)
      //检查自建账户系统中是否有该用户
      MyUser.get(res.id).then(user => {
        console.log("已经授权过,自建账户系统中有该用户信息")
        console.log(user)
        that.setData({
          subscibe: user.data.subscibe
        })
        if (user.data.is_authorized) {
          that.setData({
            avatar: user.data.avatar,
            nickname: user.data.nickname
          })
          //
        } else {
          $Message({
            content: '请先登录以获取您的基本信息',
            duration: 5
          });
          that.setData({
            show_authorize: true
          })
          console.log("该用户还没有授权,展示授权按钮让其授权")
          //

        }
      }, err => {
        $Message({
          content: '请先登录以获取您的基本信息',
          duration: 5
        });
        that.setData({
          show_authorize: true
        })
        console.log("该用户还没有授权,展示授权按钮让其授权")
        //
        // err
      })
    }, err => {
      console.log("登录出错")
      // err
    })
  }
})