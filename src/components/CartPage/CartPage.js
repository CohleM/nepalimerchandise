import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loadCart,
	getCartItems,
	removeFromCart,
} from "../../actions/authAction";
import CartTable from "./SubFiles/CartTable";
import { Result, Empty } from "antd";

function CartPage() {
	const dispatch = useDispatch();
	const [Total, setTotal] = useState(0);
	const productIds = [];
	const userCart = useSelector((state) => state.auth.user.cart);
	const cartDetail = useSelector((state) => state.auth.cartDetail);
	//let flag = false
	console.log("outside");

	// usercart is an array of whole product with quantity and productids is only the ids
	//fires up cartDetail state
	//dispatch(getCartItems(productIds, userCart));

	useEffect(() => {
		userCart.forEach((item) => {
			productIds.push(item.id);
		});
		// usercart is an array of whole product with quantity and productids is only the ids
		//fires up cartDetail state
		dispatch(getCartItems(productIds, userCart));
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

	const removeCart = (productId) => {
		console.log(productId);
		dispatch(removeFromCart(productId));
	};

	return (
		<div style={{ width: "85%" }}>
			<h2>Cart</h2>
			<div style={{ justifyContent: "center" }}>
				<CartTable removeProduct={removeCart} />{" "}
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
					{/* //{console.log("trying")} */}
				</div>
			</div>
		</div>
	);
}

export default CartPage;
