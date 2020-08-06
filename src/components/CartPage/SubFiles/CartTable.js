import React from "react";
import { Table } from "antd";

function CartTable(props) {
	const renderTableContent = () => {};
	return (
		<div>
			<table style={{ marginLeft: "auto", marginRight: "auto" }}>
				<thead>
					<tr>
						<th>Product Image</th>
						<th>Product Quantity</th>
						<th>Product Price</th>
						<th>Remove from Cart</th>
					</tr>
				</thead>
				<tbody>{renderTableContent()}</tbody>
			</table>
		</div>
	);
}

export default CartTable;
