import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
	Typography,
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	InputBase,
	Grid,
	CssBaseline,
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		//display: "flex",
	},
	// This group of buttons will be aligned to the right
	rightToolbar: {
		// marginLeft: theme.spacing(3),
		// width: "50%",
		// marginBottom: 0,
		// marginTop: 0,
		marginRight: 0,
		[theme.breakpoints.up("sm")]: {
			//marginTop: "30px",
			marginLeft: "auto",
			//marginRight: 20,
		},
	},
	typ: {
		//textAlign: "left",
		marginLeft: "20px",
		marginRight: "auto",
		[theme.breakpoints.up("sm")]: {
			//marginTop: "30px",
			marginLeft: "auto",
			marginRight: "auto",
			//marginRight: 20,
		},
	},

	appBarBg: {
		backgroundColor: "#222F3E",
		//222F3E
		// height: 90,
		// textAlign: "center",
		[theme.breakpoints.up("sm")]: {
			//height: 90,
			//marginRight: 20,
		},

		//height: "90px",
	},
	menuButton: {
		// height: "90px",
		marginRight: "auto",
	},
	search: {
		position: "relative",
		borderRadius: 20,
		border: "1px solid white",
		backgroundColor: "#222F3E",
		"&:hover": {
			backgroundColor: "#222F3E",
		},
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
		width: "100%",
		// marginTop: 150,
		marginBottom: 20,
		[theme.breakpoints.up("sm")]: {
			// marginLeft: theme.spacing(3),
			// width: "50%",
			// marginBottom: 0,
			// marginTop: 0,
			display: "none",
			//marginTop: "30px",
		},
	},
	search1: {
		// position: "relative",
		// borderRadius: 20,
		// border: "1px solid white",
		// backgroundColor: "#222F3E",
		// "&:hover": {
		// 	backgroundColor: "#222F3E",
		// },
		// marginRight: theme.spacing(2),
		// marginLeft: 30,
		// width: "100%",
		// // marginTop: 150,
		// marginBottom: 20,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "50%",
			marginBottom: 0,
			marginTop: 0,
			display: "block",

			position: "relative",
			borderRadius: 20,
			border: "1px solid white",
			backgroundColor: "#222F3E",
			"&:hover": {
				backgroundColor: "#222F3E",
			},
			//marginTop: "30px",
		},
	},
	tb: {
		[theme.breakpoints.up("sm")]: {
			// marginLeft: theme.spacing(3),
			// width: "50%",
			// marginBottom: 0,
			// marginTop: 0,
			display: "none",
			//marginTop: "30px",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		//marginLeft: "90%",
		// background: "white",
		// borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		color: "white",
		// border: "1px solid white",
	},
	inputRoot: {
		color: "inherit",
		// width: "100%",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		//vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		// [theme.breakpoints.up("md")]: {
		// 	width: "100%",
		// },
	},

	icons: {
		// height: "90px",
		marginRight: "auto",
		[theme.breakpoints.up("md")]: {
			//marginLeft: theme.spacing(3),
			marginRight: 50,
			height: "90px",
		},
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		// width: `calc(100% - ${drawerWidth}px)`,
		// transition: theme.transitions.create(["margin", "width"], {
		// 	easing: theme.transitions.easing.easeOut,
		// 	duration: theme.transitions.duration.enteringScreen,
		// }),
		// marginRight: drawerWidth,
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
		justifyContent: "flex-start",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginRight: -drawerWidth,
	},
	contentShift: {
		// transition: theme.transitions.create("margin", {
		// 	easing: theme.transitions.easing.easeOut,
		// 	duration: theme.transitions.duration.enteringScreen,
		// }),
		//marginRight: 0,
	},
}));

function Navbar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	//let prodCount = 0;
	//if (isAuth) prodCount = useSelector((state) => state.auth.user.cart);
	const prodCount = useSelector((state) => state.auth.user.cart);

	//console.log(prodCount, prodCount.length);
	let count = 0;
	if (prodCount && prodCount.length >= 1) count = prodCount.length;

	return (
		<div style={{ marginBottom: "0px" }}>
			<CssBaseline />
			<AppBar
				position="sticky"
				className={clsx(classes.appBar, classes.appBarBg, {
					[classes.appBarShift]: open,
				})}
				elevation={0}
			>
				<Toolbar>
					{/* <IconButton
					className={classes.menuButton}
					aria-label="Menu"
					color="inherit"
				></IconButton> */}

					<Typography variant="title" color="inherit" className={classes.typ}>
						logo
					</Typography>
					<div className={classes.search1}>
						<div className={classes.searchIcon}>
							<SearchIcon style={{ fontSize: "20px" }} />
						</div>
						<InputBase
							//placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>

					<section className={classes.rightToolbar}>
						<Grid container spacing={0}>
							<Grid item xs={4}>
								<IconButton
									color="inherit"
									aria-label="Edit"
									className={classes.icons}
									style={{ outline: "none" }}
									onClick={() => props.history.push("/users/cartPage")}
								>
									<Badge badgeContent={count} color="secondary">
										<ShoppingCartIcon style={{ fontSize: "20px" }} />
									</Badge>
								</IconButton>
							</Grid>
							<Grid item xs={4}>
								<IconButton
									color="inherit"
									aria-label="Save"
									className={classes.icons}
									style={{ outline: "none" }}
									aria-haspopup="true"
									onClick={handleClick}
								>
									<PermIdentityIcon style={{ fontSize: "20px" }} />
								</IconButton>
							</Grid>
							<Grid item xs={4}>
								<IconButton
									color="inherit"
									aria-label="More Options"
									//className={classes.icons}

									onClick={handleDrawerOpen}
									className={clsx(open && classes.hide, classes.icons)}
									style={{ outline: "none" }}
								>
									<MenuIcon style={{ fontSize: "20px" }} />
								</IconButton>
							</Grid>
						</Grid>
					</section>
				</Toolbar>
				<Toolbar className={classes.tb}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon style={{ fontSize: "20px" }} />
						</div>
						<InputBase
							//placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
				</Toolbar>
			</AppBar>
			{/* Main Body goes here */}
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="right"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose} style={{ outline: "none" }}>
						{theme.direction === "rtl" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={() => props.history.push("/users/cartPage")}>
						Settings
					</MenuItem>
					<MenuItem onClick={() => props.history.push("/users/history")}>
						History
					</MenuItem>
					<MenuItem onClick={() => props.history.push("/users/logout")}>
						Logout
					</MenuItem>
				</Menu>
				<List>
					{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</div>
	);
}

export default withRouter(Navbar);
