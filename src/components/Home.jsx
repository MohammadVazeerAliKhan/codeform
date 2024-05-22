import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import HeadsetOutlinedIcon from "@mui/icons-material/HeadsetOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import SubmitFormStepper from "./SubmitFormStepper";

// Description: Home Page contains the left side collapsible navbar with list of navbar menu items and main content rendered in the same page (Stepper component)

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", gap: "20px" }}>
      <CssBaseline />
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: "fixed",
          zIndex: 9999,
          top: "68px",
          transform: "translate(-50%)",
          left: open ? drawerWidth : "65px",
          backgroundColor: "darkgray",
          padding: 0,
        }}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <Drawer variant="permanent" open={open}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ConnectWithoutContactIcon />
              </ListItemIcon>
              <ListItemText primary="BrownMonster" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SpaceDashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIndOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Placements" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <EventRepeatOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Time Sheets" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <HeadsetOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Employee Self Service" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary="Immigration" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="Balance Sheets" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, zIndex: 1, margin: "4vh" }}
      >
        <SubmitFormStepper />
      </Box>
    </Box>
  );
}
