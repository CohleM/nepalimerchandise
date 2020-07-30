import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/authAction";
function RegisterUser(props) {
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

		// this is register action

		dispatch(register(newUser));

		console.log(isAuthenticated);
		console.log(data);
	};

	return (
		<div>
			<Form>
				<label>Username</label>{" "}
				<Input onChange={(e) => setusername(e.target.value)} />
				<label>email</label>{" "}
				<Input onChange={(e) => setemail(e.target.value)} />
				<label>password</label>{" "}
				<Input onChange={(e) => setpassword(e.target.value)} type="password" />
				<Button onClick={handleOnSubmit}>Submit </Button>
			</Form>
		</div>
	);
}

export default RegisterUser;
