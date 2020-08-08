import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loadCart,
	getCartItems,
	removeFromCart,
	paymentSuccess,
} from "../../actions/authAction";
import CartTable from "./SubFiles/CartTable";
import { Result, Empty } from "antd";
import Paypal from "../utilities/Paypal";
function CartPage() {
	const dispatch = useDispatch();
	const [Total, setTotal] = useState(0);
	const productIds = [];
	const userCart = useSelector((state) => state.auth.user.cart);
	const cartDetail = useSelector((state) => state.auth.cartDetail);
	const [ShowSuccess, setShowSuccess] = useState(false);
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
		if (productIds && productIds.length > 0)
			dispatch(getCartItems(productIds, userCart));
	}, [userCart]);

	useEffect(() => {
		if (cartDetail && cartDetail.length >= 0) {
			let total = 0;
			cartDetail.forEach((product) => {
				total += product.price * product.quantity;
			});
			console.log("this is total", total);
			setTotal(total);
		}
	}, [cartDetail]);

	const removeCart = (productId) => {
		//console.log(productId);
		dispatch(removeFromCart(productId));
	};

	const transactionSuccess = (payment) => {
		dispatch(paymentSuccess(payment, cartDetail));
	};
	return (
		<div style={{ width: "100%" }}>
			<div style={{ justifyContent: "center" }}>
				{/* 
			{Total ? 
				<CartTable removeProduct={removeCart} />{" "}
				<div style={{ marginTop: "3rem" }}>
					<h3> Total amount :${Total} </h3>
				</div>
					: ShowSuccess ? 	<Result status="success" title="Successfully Purchased Item">

				</Result> : 
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

		}	
				 */}

				{/* {
					Total ? 	<CartTable removeProduct={removeCart} />
					<div style={{ marginTop: "3rem" }}>
						<h3> Total amount :${Total} </h3>
					</div> : ShowSuccess ? 	<Result status="success" title="Successfully Purchased Item">

</Result> :  	<div
					style={{
						justifyContent: "center",
						width: "100%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Empty description={false}> </Empty>
				</div>
				}
			 */}

				{Total ? (
					<div>
						<h4>Cart</h4>
						<CartTable removeProduct={removeCart} />
						<div style={{ marginTop: "3rem" }}>
							<h3> Total amount :${Total} </h3>
						</div>
					</div>
				) : ShowSuccess ? (
					<Result status="success" title="Successfully Purchased Item"></Result>
				) : (
					<div
						style={{
							justifyContent: "center",
							width: "100%",
							display: "flex",
							flexDirection: "column",
							marginTop: "10rem",
						}}
					>
						<Empty description={false}>Cart is Empty </Empty>
					</div>
				)}
				<Paypal transOnSuccess={transactionSuccess} amount={Total}>
					{" "}
				</Paypal>
			</div>
		</div>
	);
}

export default CartPage;
