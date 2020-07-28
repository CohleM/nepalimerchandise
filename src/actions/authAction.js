import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from "./types";
import axios from "axios";
import { returnErrors, clearErrors } from "./errorAction";
//Checking token and loading user

//initially this function is created and takes in two parameters
export const loadUser = () => (dispatch, getState) => {
	//dipathing means firing action to the reducers
	dispatch({ type: USER_LOADING });

	//get token from localstorage
	// const token = getState().auth.token;

	// //headers
	// const config = {
	// 	headers: {
	// 		"Content-type": "application/json",
	// 	},
	// };

	// if (token) {
	// 	config.headers["x-auth-token"] = token;
	// }
	//axios.get takes in an object of headers
	axios
		.get("http://localhost:5000/users/getinfo", tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

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
};
