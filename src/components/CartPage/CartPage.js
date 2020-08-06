import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, getCartItems } from "../../actions/authAction";
import CartTable from "./SubFiles/CartTable";
import { Result, Empty } from "antd";

function CartPage() {
	const dispatch = useDispatch();

	//dispatch(loadCart());
	// useEffect(() => {
	// 	//dispatch(loadCart());
	// }, []);
	const productIds = [];
	const userCart = useSelector((state) => state.auth.user.cart);
	//let Juser = JSON.stringify(user);
	//console.log(userCart[0]);

	const cartDetail = useSelector((state) => state.auth.cartDetail);
	console.log("this is cartDetail", userCart);

	userCart.forEach((item) => {
		productIds.push(item.id);
	});
	// usercart is an array of whole product with quantity and productids is only the ids
	//console.log("yolo");

	//dispatch(getCartItems(productIds, userCart));

	return (
		<div style={{ width: "100%" }}>
			<h2>Cart</h2>
			<div style={{ justifyContent: "center" }}>
				<div style={{ justifyContent: "center" }}>
					<CartTable />
				</div>
				<div style={{ marginTop: "3rem" }}>
					<h3> Total amount :$ </h3>{" "}
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
