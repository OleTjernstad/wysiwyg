import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';
import { isFile } from 'contracts/file';

export async function openFile(mainWindow: BrowserWindow) {
  const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Html', extensions: ['htm', 'html', 'txt'] }],
  });

  if (!files || files.canceled) return;

  const filePath = files.filePaths[0];

  const pathArray = filePath.split('\\');
  const lastIndex = pathArray.length - 1;

  const content = fs.readFileSync(filePath).toString();
  mainWindow.webContents.send('new-file', {
    content,
    name: pathArray[lastIndex],
    path: filePath,
  });
}

export async function startSaveFile(mainWindow: BrowserWindow) {
  mainWindow.webContents.send('start-save-file');
}

export async function saveFile(mainWindow: BrowserWindow, data: unknown) {
  // const files = await dialog.showOpenDialog(mainWindow, {
  //   properties: ['openFile'],
  //   filters: [{ name: 'Html', extensions: ['htm', 'html', 'txt'] }],
  // });

  if (!isFile(data)) return;

  fs.writeFile(data.path, data.content, (err) => {
    console.log(err);
  });
}
