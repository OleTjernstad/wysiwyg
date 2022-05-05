import AppBarMui from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  mdiWindowClose,
  mdiWindowMaximize,
  mdiWindowRestore,
  mdiWindowMinimize,
  mdiMenu,
} from '@mdi/js';
import IconButton from '@mui/material/IconButton';

import Icon from '@mdi/react';
import { useEffect, useState } from 'react';

const { electron } = window;

export default function AppBar() {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  function openMenu(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    electron.ipcRenderer.openMenu(e.pageX, e.pageY);
  }

  function closeWindow() {
    electron.ipcRenderer.send('window-operations', 'close');
  }

  function maximizeWindow() {
    electron.ipcRenderer.send('window-operations', 'maximize');
  }
  function minimizeWindow() {
    electron.ipcRenderer.send('window-operations', 'minimize');
  }

  useEffect(() => {
    const removeListener = electron.ipcRenderer.on(
      'update-maximized',
      (arg) => {
        setIsMaximized(Boolean(arg));
      }
    );
    return () => {
      if (removeListener) removeListener();
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui position="static">
        <Toolbar color="primary" variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(e) => openMenu(e)}
          >
            <Icon path={mdiMenu} title="Menu" size={1} color="white" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => minimizeWindow()}
          >
            <Icon
              path={mdiWindowMinimize}
              title="minimize"
              size={1}
              color="white"
            />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => maximizeWindow()}
          >
            {isMaximized ? (
              <Icon
                path={mdiWindowRestore}
                title="restore"
                size={1}
                color="white"
              />
            ) : (
              <Icon
                path={mdiWindowMaximize}
                title="maximize"
                size={1}
                color="white"
              />
            )}
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => closeWindow()}
          >
            <Icon path={mdiWindowClose} title="Lukk" size={1} color="white" />
          </IconButton>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}
