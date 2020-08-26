import React from "react";
import PhotoGrid from "./sections/PhotoGrid";
import Cards from "./sections/Cards";
import CardsWithReview from "./sections/CardsWithReview";

import Footer from "../utilities/Footer";
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
