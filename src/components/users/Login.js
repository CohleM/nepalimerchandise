import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";

import { login } from "../../actions/authAction";
function Login(props) {
	//	const [username, setusername] = useState("");
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
		console.log(email, password);
		const newUser = {
			email,
			password,
		};

		// this is register actioni

		dispatch(login(newUser));
	};

	return (
		<div>
			<Form>
				<label>email</label>
				<Input onChange={(e) => setemail(e.target.value)} />
				<label>password</label>
				<Input onChange={(e) => setpassword(e.target.value)} type="password" />
				<Button onClick={handleOnSubmit}>Login </Button>
			</Form>
		</div>
	);
}

export default Login;
