import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import registerUser from "./components/users/registerUser";
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import UploadProduct from "./components/products/uploadProduct";
import LandingPage from "./components/products/LandingPage";
//             { <Route path = "/" exact component  = {ExerciseList} /> }
import DetailedProduct from "./components/products/DetailedProduct";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authAction";
import { useEffect } from "react";
import Logout from "./components/users/Logout";
import Login from "./components/users/Login";
import CartPage from "./components/CartPage/CartPage";
import History from "./components/users/History";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/utilities/Footer";
import ProductPage from "./components/ProductPage/ProductPage";
function App() {
	useEffect(() => {
		console.log(store);
		store.dispatch(loadUser());
	}, []);
	return (
		<div style={{ width: "100%", backgroundColor: "white" }}>
			<Provider store={store}>
				<Router>
					{/* <div className= "container"> */}
					<Navbar />
					<Route exact path="/" exact component={HomePage} />
					<br />
					<Switch>
						<Route exact path="/edit/:id" component={EditExercise} />
						<Route exact path="/create" component={CreateExercise} />
						<Route exact path="/product/upload" component={UploadProduct} />
						<Route exact path="/user" component={CreateUser} />
						<Route exact path="/product/:productId" component={ProductPage} />
						<Route exact path="/register" component={registerUser} />
						<Route exact path="/users/logout" component={Logout} />
						<Route exact path="/users/login" component={Login} />

						<Route exact path="/users/cartPage" component={CartPage} />

						<Route exact path="/users/history" component={History} />
					</Switch>

					<Footer />
					{/* </div> */}
				</Router>
			</Provider>
		</div>
	);
}

export default App;
