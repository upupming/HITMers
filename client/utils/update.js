module.exports = (language) => {
  const updateManager = wx.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    if(!res.hasUpdate) {
      wx.showToast({
        title: language.noUpdate,
        icon: 'none'
      });
    }
  });

  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: 'Update',
      content: 'Update is ready, relaunch?',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      }
    });
    
  });

  // updateManager.onUpdateFailed(function () {
  //   // 新的版本下载失败
  // });
};