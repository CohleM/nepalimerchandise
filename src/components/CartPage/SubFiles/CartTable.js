import React, { useEffect } from "react";
import { useSelector } from "react-redux";
function CartTable(props) {
	const cartDetail = useSelector((state) => state.auth.cartDetail);

	//console.log(cartDetail, typeof cartDetail);

	// let res = Object.keys(cartDetail).map((key) => [
	// 	Number(key),
	// 	cartDetail[key],
	// ]);
	console.log(cartDetail, cartDetail.length);
	//console.log("result", res);

	let check = false;
	if (cartDetail) check = true;

	const retImage = (images) => {
		if (images) {
			if (images.length > 0) {
				let image = images[0];
				return `http://localhost:5000/uploads/${image}`;
			}
		}
	};

	const renderProducts = () =>
		cartDetail &&
		cartDetail.map((product) => (
			<tr key={product._id}>
				<td style={{ border: "1px solid black" }}>
					{/* <h5>hahah</h5> */}
					<img style={{ width: "70px" }} src={retImage(product.images)} />
				</td>
				<td style={{ border: "1px solid black" }}>{product.quantity}</td>
				<td style={{ border: "1px solid black" }}>{product.price}</td>
				<td style={{ border: "1px solid black" }}>
					<button onClick={() => props.removeProduct(product._id)}>
						{" "}
						Remove from cart
					</button>
				</td>
			</tr>
		));
	// cartDetail.forEach((product) => {
	// 	console.log(product.quantity);
	// });
	return (
		<div>
			<table style={{ marginLeft: "auto", marginRight: "auto" }}>
				<thead style={{ border: "1px solid blackl" }}>
					<tr>
						<th>Product Image</th>
						<th>Product Quantity</th>
						<th> Price</th>
						<th>Remove from Cart</th>
					</tr>
				</thead>
				<tbody>{renderProducts()}</tbody>
			</table>
		</div>
	);
}

export default CartTable;
