import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, getCartItems } from "../../actions/authAction";
import CartTable from "./SubFiles/CartTable";

function CartPage() {
	const dispatch = useDispatch();

	const productIds = [];
	const userCart = useSelector((state) => state.auth.user.cart);

	console.log("outside");

	useEffect(() => {
		console.log("inside");
		//dispatch(loadCart());

		//let Juser = JSON.stringify(user);
		//console.log(userCart[0]);

		userCart.forEach((item) => {
			productIds.push(item.id);
		});
		// usercart is an array of whole product with quantity and productids is only the ids
		dispatch(getCartItems(productIds, userCart));
	}, []);

	// console.log(productIds);
	// console.log(userCart);
	return (
		<div style={{ width: "85%" }}>
			<h2>Cart</h2>
			<div>
				<CartTable />
			</div>
		</div>
	);
}

export default CartPage;
