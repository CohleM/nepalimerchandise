import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	ADD_CART_TO_USER,
	ADD_CART_ERROR,
} from "./types";
import axios from "axios";
import { returnErrors, clearErrors } from "./errorAction";
//Checking token and loading user

//initially this function is created and takes in two parameters
export const loadUser = () => (dispatch, getState) => {
	//dipathing means firing action to the reducers
	dispatch({ type: USER_LOADING });
	console.log("loaduser executed");
	// get token from localstorage
	// const token = getState().auth.token;

	// console.log("token", token);

	// //headers
	// const config = {
	// 	headers: {
	// 		"Content-type": "application/json",
	// 	},
	// };

	// if (token) {
	// 	config.headers["x-auth-token"] = token;
	// }
	// axios.get takes in an object of headers
	axios
		.get("http://localhost:5000/users/getinfo", tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log("getinfo error", err);
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

//Setsup the header
export const tokenConfig = (getState) => {
	const token = getState().auth.token;

	//headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	if (token) {
		config.headers["x-auth-token"] = token;
	}

	//console.log(config);
	return config;
};

//Register user
export const register = ({ username, email, password }) => (dispatch) => {
	//headers
	const config = {
		"Content-type": "application/json",
	};

	//convert js object to json
	//this stringfy doesn't work fires up error
	const body = JSON.stringify({ username, email, password });
	//console.log(body);
	//now we make a req to the server
	console.log("this executed woow");
	axios
		.post(
			"http://localhost:5000/users/register",
			{
				name: username,
				email: email,
				password: password,
			},
			config
		)
		.then((res) => {
			console.log("executed");
			//console.log(res.data);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err.response);
			dispatch(
				returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
			);
			dispatch({
				type: REGISTER_FAIL,
			});
		});
};

export const login = ({ email, password }) => (dispatch) => {
	const config = {
		"Content-type": "application/json",
	};

	axios
		.post(
			"http://localhost:5000/users/login",
			{
				email,
				password,
			},
			config
		)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
			);
			dispatch({
				type: LOGIN_FAIL,
			});
			console.log(err);
		});
};

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT_SUCCESS,
	});
};

export const addToCart = (productId) => (dispatch, getState) => {
	axios
		.get(
			`http://localhost:5000/users/addToCart?id=${productId}`,
			tokenConfig(getState)
		)
		.then((res) => {
			//console.log(res.data);
			dispatch({
				type: ADD_CART_TO_USER,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					"ADD_TO_CART_ERROR"
				)
			);
		});
};
