// pages/doclist/doclist.js
Page({

  data: {
    fileList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    wx.BaaS.request({
      data: {
        access_token: 'a83282f90e3f99082518be4ab5392cb2f6f989bd'
      },
      url: options.url,
      method: 'GET'
    }).then(res => {
      var filterArray = res.data
        .filter(item => item.name != '.gitignore') //过滤忽略文件
        .filter(item => !(item.name == 'samples' && item.type == 'dir')) //过滤代码示例
        .filter(item => item.type == 'dir' || (item.name.indexOf('.md') > -1 || item.name.indexOf('.MD') > -1)) //过滤不是.md的文档
        .filter(item => !(item.name == 'images')) //过滤资源文件
        .filter(item => !(item.name == 'cover')) //过滤资源文件
        .sort((a, b) => {
          if (a.type == 'dir') return b.type == 'dir' ? 0 : -1
          else return b.type == 'file' ? 0 : 1
        })
      // .sort((a, b) => {
      //   a.name > b.name ? -1 : 1
      // })

      console.log(filterArray)
      this.setData({
        fileList: filterArray
      })
    })
  },


})