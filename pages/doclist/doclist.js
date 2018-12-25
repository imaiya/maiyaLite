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
    //云函数转发调用
    wx.BaaS
      .invokeFunction('githubTranspond', {
        url: options.url
      })
      .then(res => {
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

        console.log(filterArray)
        this.setData({
          fileList: filterArray
        })
      })
  },


})