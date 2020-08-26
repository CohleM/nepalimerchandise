import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

import image from "../../../images/beauty.jpg";
import two from "../../../images/Headphones.jpg";

import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import { loadUser } from "../../actions/authAction";
import { loadUser } from "../../../actions/authAction";
import { useDispatch } from "react-redux";
// import { Card, Col, Row } from "antd";
// import ImageSlider from "../utilities/ImageSlider";
// import CheckBox from "../utilities/CheckBox";
// import { continents, price } from "../utilities/Datas";
// import RadioBox from "../utilities/RadioBox";
// import SearchFeature from "../utilities/SearchFeature";

const { Meta } = Card;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 10,
		marginRight: 10,
		[theme.breakpoints.up("lg")]: {
			marginLeft: 100,
			marginRight: 100,
		},
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	root1: {
		maxWidth: 345,
		borderRadius: 0,
		border: "1px solid #D6C9C9",
	},
	media: {
		height: 100,

		[theme.breakpoints.up("sm")]: {
			height: 200,
		},
	},
	typ: {
		//fontFamily: "Roboto",
		fontWeight: "500",
		fontSize: "13px",
		textAlign: "center",
		[theme.breakpoints.up("sm")]: {
			fontWeight: "500",
			fontSize: "18px",
			textAlign: "center",
		},
	},
	box: {
		marginTop: 20,
		textAlign: "center",
		marginBottom: 0,
	},
	pricetyp: {
		fontWeight: "600",
		color: "#FA4242",
		fontSize: "13px",
		[theme.breakpoints.up("sm")]: {
			fontWeight: "600",
			color: "#FA4242",
			fontSize: "18px",
		},
	},
	catt: {
		marginTop: "25px",
		marginBottom: "25px",
		fontWeight: "600",
		fontSize: "16px",
		[theme.breakpoints.up("sm")]: {
			marginTop: "50px",
			marginBottom: "50px",
			fontWeight: "600",
			fontSize: "24px",
		},
	},
	lm: {
		//fontFamily: "Roboto",
		fontWeight: "500",
		fontSize: "10px",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 20,
		[theme.breakpoints.up("sm")]: {
			fontWeight: "500",
			fontSize: "18px",
			textAlign: "center",
			marginTop: 70,
			marginBottom: 70,
			backgroundColor: "white",
		},
	},
	// ct: {
	// 	marginLeft: 20,
	// 	marginRight: 20,
	// },
}));

function CenteredGrid(props) {
	const [value, setValue] = React.useState(2);
	const classes = useStyles();

	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState(0);
	const [Filters, setFilters] = useState({
		continents: [],
		price: [],
	});
	const [Searchitems, setSearchitems] = useState("");
	//useEffect is similar to  componentDidMount it executes before loading the actual page
	//const dispatch = useDispatch();
	const getProducts = (variables) => {
		axios
			.post("http://localhost:5000/product/getProducts", variables)
			.then((response) => {
				if (response.data.success) {
					// console.log(variables.loadmore)
					//setProducts(response.data.products)
					if (variables.loadmore)
						setProducts([...Products, ...response.data.products]);
					else setProducts(response.data.products);
					setPostSize(response.data.postSize);
					// console.log(response.data.products)
				} else {
					alert("Failed to fetch the products");
					console.log(response.err);
				}
			});
	};

	useEffect(() => {
		const variables = {
			skip: Skip,
			limit: Limit,
		};
		getProducts(variables);
		//dispatch(loadUser());
	}, []);

	const onLoadMore = () => {
		let skip = Skip + Limit;

		const variables = {
			skip: skip,
			limit: Limit,
			loadmore: true,
			filters: Filters,
		};

		console.log(Products);
		getProducts(variables);
		setSkip(skip);
	};

	const showFilteredResults = (filters) => {
		const variables = {
			skip: 0,
			limit: Limit,
			filters: filters,
		};
		setSkip(0);
		getProducts(variables);
	};

	// const handlePrice = (value) => {
	// 	let data = price;
	// 	let array = [];
	// 	for (let key in data) {
	// 		if (data[key]._id === parseInt(value, 10)) {
	// 			array = data[key].array;
	// 		}
	// 	}
	// 	return array;
	// };
	// const handleFilters = (filters, category) => {
	// 	//console.log(filters)

	// 	const newFilters = { ...Filters };
	// 	// console.log(newFilters)
	// 	newFilters[category] = filters;

	// 	if (category === "price") {
	// 		newFilters[category] = handlePrice(filters);
	// 	}
	// 	showFilteredResults(newFilters);
	// 	setFilters(newFilters);
	// 	console.log(newFilters);
	// };

	const updateSearchItems = (newSearchItems) => {
		setSearchitems(newSearchItems);

		const variables = {
			skip: 0,
			limit: Limit,
			filters: Filters,
			searchItem: newSearchItems,
		};
		getProducts(variables);
		console.log(newSearchItems);
		setSkip(0);
	};

	var Items = [
		{
			image: image,
			category: "BEAUTY",
			description: "2,153 items in this category",
			price: 200,
			rating: 1,
		},
		{
			image: two,
			category: "ELECTRONICS",
			description: "2,153 items in this category",
			price: 300,
			rating: 2,
		},
		{
			image: image,
			category: "BEAUTY",
			description: "2,153 items in this category",
			price: 500,
			rating: 3,
		},
		{
			image: two,
			category: "ELECTRONICS",
			description: "2,153 items in this category",
			price: 800,
			rating: 4,
		},
		{
			image: image,
			category: "BEAUTY",
			description: "2,153 items in this category",
			price: 1100,
			rating: 4,
		},
		{
			image: two,
			category: "ELECTRONICS",
			description: "2,153 items in this category",
			price: 2300,
			rating: 5,
		},
		{
			image: image,
			category: "BEAUTY",
			description: "2,153 items in this category",
			price: 1100,
			rating: 4,
		},
		{
			image: two,
			category: "ELECTRONICS",
			description: "2,153 items in this category",
			price: 2300,
			rating: 5,
		},
	];

	return (
		<div className={classes.root} style={{ backgroundColor: "white" }}>
			<Container maxWidth="xl" className={classes.ct}>
				<Typography gutterBottom className={classes.catt}>
					FEATURED
				</Typography>

				<Grid container spacing={2}>
					{Products.map((item, i) => (
						<Grid item xs={6} sm={4} md={3} key={i}>
							<Card className={classes.root1} elevation={0}>
								<CardActionArea
									style={{ outline: "none" }}
									onClick={() => props.history.push(`/product/${item._id}`)}
								>
									<CardMedia
										className={classes.media}
										image={`http://localhost:5000/uploads/${item.images[0]}`}
										title={item.title}
									/>
									<CardContent>
										<Typography gutterBottom className={classes.typ}>
											{item.title}
										</Typography>
										{/* <Typography
											variant="body2"
											color="textSecondary"
											component="p"
											style={{ textAlign: "center" }}
										>
											{item.description}
										</Typography> */}
										<Box
											component="fieldset"
											mb={3}
											borderColor="transparent"
											className={classes.box}
										>
											<Rating
												name="read-only"
												value={3}
												readOnly
												size="small"
											/>
											<Typography gutterBottom className={classes.pricetyp}>
												${item.price}
											</Typography>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>

				{/* {Products.length === 0 ? (
				<div
					style={{
						display: "flex",
						height: "300px",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<h2>No post yet...</h2>
				</div>
			) : (
				<div>
					<Row gutter={[16, 16]}>{renderCards}</Row>
				</div>
			)}

			<br />
			<br /> */}

				{PostSize >= 8 ? (
					<Typography
						variant="h6"
						display="block"
						gutterBottom
						className={classes.lm}
					>
						<Button
							size="medium"
							style={{ outline: "none", margin: "0px" }}
							onClick={onLoadMore}
						>
							LOAD MORE
						</Button>
					</Typography>
				) : (
					""
				)}
			</Container>
		</div>
	);
}

export default withRouter(CenteredGrid);