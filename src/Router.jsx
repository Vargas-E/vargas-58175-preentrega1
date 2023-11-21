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
            path="/vargas-ivan-58175-react"
            element={
              <Products setCounter={props.setCounter} counter={props.counter} />
            }
          />
          <Route
            path="/vargas-ivan-58175-react/category/:id"
            element={
              <Products setCounter={props.setCounter} counter={props.counter} />
            }
          />
          <Route
            path="/vargas-ivan-58175-react/item/:id"
            element={
              <ItemDetails
                setCounter={props.setCounter}
                counter={props.counter}
              />
            }
          />
          <Route path="/vargas-ivan-58175-react/contact" element={<Contact />} />
          <Route path="/vargas-ivan-58175-react/about-us" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
