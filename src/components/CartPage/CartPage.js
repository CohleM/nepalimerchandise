import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, getCartItems } from "../../actions/authAction";
import CartTable from "./SubFiles/CartTable";
import { Result, Empty } from "antd";

function CartPage() {
	const dispatch = useDispatch();
	const [Total, setTotal] = useState(0);
	const productIds = [];
	const userCart = useSelector((state) => state.auth.user.cart);
	const cartDetail = useSelector((state) => state.auth.cartDetail);
	console.log("outside");

	useEffect(() => {
		//console.log("inside", typeof userCart);
		//dispatch(loadCart());

		//let Juser = JSON.stringify(user);
		//console.log(userCart[0]);

		userCart.forEach((item) => {
			productIds.push(item.id);
		});
		// usercart is an array of whole product with quantity and productids is only the ids
		dispatch(getCartItems(productIds, userCart));
		//userCart.forEach();
	}, [userCart]);

	useEffect(() => {
		if (cartDetail && cartDetail.length > 0) {
			let total = 0;
			cartDetail.forEach((product) => {
				total += product.price * product.quantity;
			});

			setTotal(total);
		}
	}, [cartDetail]);

	const removeFromCart = (productID) => {
		console.log(productID);
		//do some dispatch
	};
	// console.log(productIds);
	// console.log(userCart);
	return (
		<div style={{ width: "85%" }}>
			<h2>Cart</h2>
			<div style={{ justifyContent: "center" }}>
				<CartTable removeProduct={removeFromCart} />{" "}
				<div style={{ marginTop: "3rem" }}>
					<h3> Total amount :${Total} </h3>{" "}
				</div>
				<Result status="success" title="Successfully Purchased Item">
					{" "}
				</Result>
				<div
					style={{
						justifyContent: "center",
						width: "100%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Empty description={false}> </Empty>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
