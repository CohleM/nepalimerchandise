import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/authAction";

import TextField from "@material-ui/core/TextField";
import { useStyles } from "./Style";
import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Grid from "@material-ui/core/Grid";
import { Paper, Divider } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
//import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Link from "@material-ui/core/Link";

function RegisterUser(props) {
	const classes = useStyles();
	const [username, setusername] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const data = useSelector((state) => state.auth);
	const error = useSelector((state) => state.error);

	const dispatch = useDispatch();
	//very nice mofo saved me some time yollooo
	useEffect(() => {
		if (isAuthenticated) props.history.push("/");
	}, [isAuthenticated]);

	const handleOnSubmit = (e) => {
		e.preventDefault();
		console.log(username, email, password);
		const newUser = {
			username,
			email,
			password,
		};

		// this is register actioni

		dispatch(register(newUser));
	};

	return (
		// <div>
		// 	<Form>
		// 		<label>Username</label>{" "}
		// 		<Input onChange={(e) => setusername(e.target.value)} />
		// 		<label>email</label>{" "}
		// 		<Input onChange={(e) => setemail(e.target.value)} />
		// 		<label>password</label>{" "}
		// 		<Input onChange={(e) => setpassword(e.target.value)} type="password" />
		// 		<Button onClick={handleOnSubmit}>Submit </Button>
		// 	</Form>
		// </div>

		<div>
			<div className={classes.root1}>
				<Container maxWidth="xl">
					<Paper variant="outlined" className={classes.paper} style={{}}>
						<form noValidate autoComplete="off">
							<Grid
								container
								direction="column"
								spacing={3}
								style={{ padding: "0px" }}
							>
								<Grid item xs={12}>
									<Typography
										variant="h6"
										style={{ textTransform: "uppercase" }}
									>
										{" "}
										register
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										id="standard-basic"
										label="Username"
										onChange={(e) => setusername(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										id="standard-basic"
										label="Email"
										onChange={(e) => setemail(e.target.value)}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										id="standard-password-input"
										label="Password"
										type="password"
										autoComplete="current-password"
										fullWidth
										onChange={(e) => setpassword(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="outlined"
										size="small"
										className={classes.margin}
										style={{ outline: "none" }}
										onClick={handleOnSubmit}
									>
										REGISTER
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="overline" color="textSecondary">
										Already have an Account ?{" "}
									</Typography>
									<Link
										variant="overline"
										underline="none"
										color="textPrimary"
										style={{ outline: "none" }}
										onClick={() => props.history.push("/users/login")}
									>
										{" "}
										LOGIN
									</Link>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Container>
			</div>
		</div>
	);
}

export default RegisterUser;
