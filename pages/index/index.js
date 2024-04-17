// index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadedUrls: [],
    imageGroups: [],
    predictions: [],
  },

  upload() {
    this.setData({
      uploadedUrls: [],
      imageGroups: [],
      predictions: []
    });
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 5,
      camera: 'back',
      success: async res => {
        console.log(res.tempFiles);
        this.setData({
          uploadedUrls: [...res.tempFiles, ...this.data.uploadedUrls],
        }, () => {
          // 在 setData 回调中更新 imageGroups
          this.setData({
            imageGroups: this.chunkArray(this.data.uploadedUrls, 3)
          });
        });

        await this.data.uploadedUrls.forEach((item) => {
          wx.uploadFile({
            method: 'post',
            url: 'http://127.0.0.1:5000/predict',
            filePath: item.tempFilePath,
            name: 'image',
            success: res => {
              this.setData({
                predictions: [...this.data.predictions, res.data, ]
              })
            },
          })
        });
      },
    })
  },

  chunkArray(arr, size) {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})