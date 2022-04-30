import AppBarMui from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const { electron } = window;

export default function AppBar() {
  function openMenu(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    electron.ipcRenderer.openMenu(e.pageX, e.pageY);
  }

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Button color="inherit">X</Button>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}
