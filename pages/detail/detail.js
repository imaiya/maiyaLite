// pages/detail.js
import contentAPI from '../../api/api_content'
import util from '../../api/util'
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    dateStrt: '',
    showLoading: true
  },

  onShareAppMessage(res) {
    var that = this
    return {
      title: '我给你分享了一篇技术类的文章,一起来看看吧',
      path: 'pages/detail/detail?id=' + that.data.content.id
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.data.content.id = options.id
    contentAPI.getContentWithId(options.id, (res) => {
      console.log(res)
      contentAPI.updateReaded(options.id, res.data.readed)
      this.setData({
        content: res.data,
        dateStrt: util.dateDiff(res.data.created_at)
      })
      var that = this
      setTimeout(function() {
        that.setData({
          showLoading: false
        })
      }, 1000);


    })


  },









})