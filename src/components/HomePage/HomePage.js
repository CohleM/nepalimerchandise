import React from "react";
import PhotoGrid from "./sections/PhotoGrid";
import Cards from "./sections/Cards";
import CardsWithReview from "./sections/CardsWithReview";
import { Typography } from "@material-ui/core";
function HomePage() {
	return (
		<div style={{ backgroundColor: "white" }}>
			<PhotoGrid />
			<Cards />
			<CardsWithReview />
		</div>
	);
}

export default HomePage;
