import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Dispatch, SetStateAction } from "react";

const drawerWidth = 240;

interface IHeaderProps {
  isClosing: boolean;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header(props: IHeaderProps) {
  const handleDrawerToggle = () => {
    if (!props.isClosing) {
      props.setMobileOpen(!props.mobileOpen);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: { sm: `${drawerWidth}px` },
      }}
      
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Umbra
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
