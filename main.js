const { autoUpdater } = require('electron-updater') // import autoupdate
const { app,dialog, BrowserWindow, Menu, Tray,nativeImage } = require("electron");
const path = require('path');
const AutoLaunch = require('auto-launch');

app.whenReady().then(createWindow); // app readey thì tạo ra cửa sổ 
function createWindow() {
  let win;
  win = new BrowserWindow({
    width: 1400,
    height: 1200,
    resizable: true,
    icon:"build/timviec365.png",
  });
  
  //win.loadFile("index.html")
  win.loadURL("https://chat365.timviec365.vn/"); // load file UI 
  autoUpdater.checkForUpdatesAndNotify()    // check notify từ server 
  win.on('closed',ev=>{ // create a new window 
    win = new BrowserWindow({
      width: 1400,
      height: 1200,
      resizable: true,
      icon:"build/timviec365.png", // chỉ nhận png
    });
    //win.loadFile("index.html"); // load file UI
    win.loadURL("https://chat365.timviec365.vn/")
    win.hide();
  });

  // tạo image vì truy cập không thành công vào file build 
  const icon = nativeImage.createFromDataURL('data:image/jpeg;base64,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');
  let appIcon = new Tray(icon);
  //menu in tray 
  const contextMenu = Menu.buildFromTemplate([  // menu 
    { label: 'Show App', click:  function(){ // click vào thì show app 
      win.show();
      win.on('closed',ev=>{
        win = new BrowserWindow({
          width: 1400,
          height: 1200,
          resizable: true,
          icon:"build/timviec365.png",
        });
        win.loadURL("https://chat365.timviec365.vn/");
        //win.loadFile("index.html"); // load file UI
        win.hide();
      })
    } },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
    } }
  ])
  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
}
// tự động chạy khi bật máy
app.setLoginItemSettings({
  openAtLogin: true    
})

// nếu có câu lệnh app.quit() thì chương trình sẽ đóng hắn khi tất cả window đóng 
app.on('window-all-closed',()=>{
  // On macOS it is common for application and their menu bar 
  // to stay active until the user quits explicitly with cmd +Q
  if(process.platform!='darwin'){
   // app.quit()
  }
})

app.on('activate',()=>{
  //ON mac it's common to re-create a window in the app when the doc icon is clicked and there are no ather window open
  if(win===null){
    createWindow()
  }
})

// auto update
autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Ok'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version is being downloaded.'
	}
	dialog.showMessageBox(dialogOpts, (response) => {

	});
})
autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version has been downloaded. Restart the application to apply the updates.'
	};
	dialog.showMessageBox(dialogOpts).then((returnValue) => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall()
	})
});
