//index.js
import contentAPI from '../../api/api_content'
const {
  $Message
} = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
  data: {
    contentList: [],
    loading: false
  },

  noViewData: {
    offset: 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //下拉刷新
  onPullDownRefresh: function() {
    this.data.contentList.length = 0
    // this.setData({
    //   contentList: this.data.contentList
    // })
    this.loadData(this.data.contentList.length);
  },
  /**
   * 上拉加载
   */
  onReachBottom: function() {
    this.loadData(this.data.contentList.length);
  },
  onLoad: function() {
    //发起请求
    this.loadData(0)

  },

  onShareAppMessage(res) {
    var that = this
    return {
      title: '麦芽的博客',
      path: 'pages/index/index'
    }
  },

  onItemClick: function(event) {
    console.log(event)
    var contentId = event.currentTarget.dataset.cid

    wx.navigateTo({
      url: '../detail/detail?id=' + contentId
    })
  },
  /**
   * 加载数据
   */
  loadData(offset) {
    this.setData({
      loading: true
    })
    contentAPI.getContentList(offset, (res) => {
      console.log(res)
      if (res.data.meta.limit + res.data.meta.offset >= res.data.meta.total_count && res.data.objects.length == 0) {
        $Message({
          content: '没有更多啦',
          duration: 2
        });
      }
      this.setData({
        contentList: this.data.contentList.concat(res.data.objects),
        loading: false,
      })
      wx.stopPullDownRefresh()
    })
  }
})