/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar/NavBar";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ItemDetails from "./components/ItemDetails/ItemDetails";

const Router = (props) => {
  return (
    <>
      <BrowserRouter>
        <NavBar counter={props.counter} />
        <Routes>
          <Route
            path="/"
            element={
              <Products setCounter={props.setCounter} counter={props.counter} />
            }
          />
          <Route
            path="/category/:id"
            element={
              <Products setCounter={props.setCounter} counter={props.counter} />
            }
          />
          <Route
            path="/item/:id"
            element={
              <ItemDetails
                setCounter={props.setCounter}
                counter={props.counter}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
