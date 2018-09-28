const{app,BrowserWindow}=require('electron');
const express = require('./app.js')
const path=require('path');
 const url=require('url');

const ProgressBar = require('electron-progressbar');


// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
 let mainWindow;
 let newWin;

 function createWindow(){
     //create browser window
     mainWindow=new BrowserWindow({
         width:800,
         height:600,
         icon:path.join(__dirname,"img/png/permute.png")
        })
    //load index.html
     mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'/public/index.html'),
        protocol: 'file:',
        slashes:true
        
    }))
    mainWindow.webContents.openDevTools()


    win = new BrowserWindow({
        title:"Minimize this window. Results are being generated...",
        width:500,
        height:300,
        parent:mainWindow,
        show:false,
        closable:false
      })
      
      win.webContents.openDevTools();
      
    
    // win.on('closed',()=>{
    //     win=null;
    // })
}
       


app.on('ready',function(){
    createWindow();
   
});

//quit when all windows are closed
app.on('window-all-closed',()=>{
     // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
    if(process.platform!=='darwin'){
        app.quit();
        mainWindow.removeAllListeners('close');
        mainWindow=null;
    }});


function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};

module.exports.mainWindow=mainWindow;

module.exports.winHide=function(){
   win.hide();
}
module.exports.showNewWin=function(){
    newWin.show();
};
module.exports.urlLoad=function(url,callback){
        win.show();
        win.loadURL(url);
    setTimeout(() => {
        callback();
    }, 150);
    
}