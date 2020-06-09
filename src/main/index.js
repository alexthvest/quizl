import { app, BrowserWindow, ipcMain } from 'electron'
import QuizService from './services/quiz.service'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const quizService = new QuizService(process.execPath)
let mainWindow

ipcMain.on('app:started', e => {
  e.sender.send('data:loaded', quizService.getQuizes())
})

ipcMain.on('quiz:item:add', (e, item) => {
  e.sender.send('quiz:item:added', quizService.addQuizItem(item))
})

ipcMain.on('quiz:item:edit', (e, item) => {
  e.sender.send('quiz:item:edited', quizService.editQuizItem(item))
})

ipcMain.on('quiz:item:remove', (e, item) => {
  e.sender.send('quiz:item:removed', quizService.removeQuizItem(item))
})

ipcMain.on('quiz:started', (e, id) => {
  e.sender.send('quiz:loaded', quizService.getQuizById(id))
})

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Quizl',
    width: 1000,
    height: 563,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
