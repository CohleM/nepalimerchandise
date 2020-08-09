import React, { Component } from "react";
import { Link } from "react-router-dom";
//import {  Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useSelector } from "react-redux";
export default function Navbar() {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	//let prodCount = 0;
	//if (isAuth) prodCount = useSelector((state) => state.auth.user.cart);
	const prodCount = useSelector((state) => state.auth.user.cart);

	//console.log(prodCount, prodCount.length);
	let count = 0;
	if (prodCount && prodCount.length >= 1) count = prodCount.length;

	return (
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
			<Link to="/" className="navbar-brand">
				NepaliMerchandise
			</Link>
			<div className="collpase navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="navbar-item">
						<Link to="/register" className="nav-link">
							register
						</Link>
					</li>
					<li className="navbar-item">
						<Link to="/user" className="nav-link">
							Create User
						</Link>
					</li>
					<li className="navbar-item">
						<Link exact to="/product/upload" className="nav-link">
							uploadproduct
						</Link>
					</li>

					<li className="navbar-item">
						<Link exact to="/users/logout" className="nav-link">
							logout
						</Link>
					</li>

					<li className="navbar-item">
						<Link exact to="/users/login" className="nav-link">
							Login
						</Link>
					</li>

					<li className="navbar-item">
						<Link exact to="/users/cartPage" className="nav-link">
							{/* <Icon
									type="shopping-cart"
									style={{ fontSize: 30, marginBottom: 4 }}
								/> */}
							<Badge count={count} style={{}}>
								<ShoppingCartOutlined style={{ fontSize: "20px" }} />
							</Badge>
						</Link>
					</li>

					<li className="navbar-item">
						<Link exact to="/users/history" className="nav-link">
							History
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
