import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export async function openFile(mainWindow: BrowserWindow) {
  const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Html', extensions: ['htm', 'html', 'txt'] }],
  });

  if (!files || files.canceled) return;

  const filePath = files.filePaths[0];

  const fileContent = fs.readFileSync(filePath).toString();
  mainWindow.webContents.send('new-file', fileContent);
}
