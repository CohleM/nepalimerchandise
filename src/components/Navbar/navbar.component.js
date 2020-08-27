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
import { useStyles } from "./Style";
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
