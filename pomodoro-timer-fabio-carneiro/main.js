const { app, BrowserWindow } = require("electron")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 820,
        height: 400,
        resizable: false,
        autoHideMenuBar: true,
        icon: "resources/img/pomodoroTimer.png"
    })
    win.loadFile("./resources/index.html")
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})