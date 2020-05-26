import React from "react";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.65),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.85),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar({ session }) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const[query, setQuery] = React.useState('');

  const handleDrawerOpen = () => {
    setOpen(true);

  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    e.persist();
    history.push({
      pathname: '/search',
      query: query,
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            eTV
          </Typography>
          <Paper component='form' className={classes.search} onSubmit={(e) => handleSearch(e)}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Paper>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button  onClick={() => {history.push('/'); setOpen(false)}}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button  onClick={() => {
            history.push('/search'); 
            setOpen(false)
          }}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Search"} />
          </ListItem>
          {
            session && session.getCurrentUser && (
              <>
                <ListItem button>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Favorites"} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary={"My Receipes"} />
                </ListItem>
                <ListItem button onClick={() => {history.push('/new'); setOpen(false)}}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add a New Receipe"} />
                </ListItem>
              </>
            )
          }
        </List>
        <Divider />
        { 
          session && session.getCurrentUser ? (
            <List>
            <ListItem button  onClick={() => {history.push('/profile'); setOpen(false)}}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"My Account"} />
            </ListItem>
            
          </List>
          ) : (
            <List>
            <ListItem button onClick={() => {history.push('/React-IMDB/login'); setOpen(false)}}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
            <ListItem button onClick={() => {history.push('/React-IMDB/register'); setOpen(false)}}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Register"} />
            </ListItem>
          </List>
          )
        }
      </Drawer>
    </div>
  );
}
