import React from "react";

function CartTable() {
	return (
		<div>
			<table style={{ border: "1px solid black" }}>
				<thead>
					<tr>
						<th>Product Image</th>
						<th>Product Quantity</th>
						<th>Product Price</th>
						<th>Remove from Cart</th>
					</tr>
				</thead>
			</table>
		</div>
	);
}

export default CartTable;
