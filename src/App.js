import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";


import Navbar from "./components/navbar.component"
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import UploadProduct from "./components/products/uploadProduct";
import LandingPage from "./components/products/LandingPage";
//             { <Route path = "/" exact component  = {ExerciseList} /> }
import DetailedProduct from "./components/products/DetailedProduct"
function App() {
  return (
      <Router>
        <div className= "container">
          <Navbar/>
          <br/>
          <Route path = "/" exact component  = {LandingPage} />
          <Route path="/edit/:id"  component={EditExercise} />
          <Route path="/create"  component={CreateExercise} />
          <Route path="/user"  component={CreateUser} />
          <Route path="/product/upload"  component={UploadProduct} />

          <Route path="/product/:productId"  component={DetailedProduct} />
        </div>
      </Router>
  );

}

export default App;
