/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar/NavBar";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import { Login } from "./pages/Login";
import { useContext } from "react";
import { UserContext } from "./contexts/userContext";
import { Register } from "./pages/Register";
import CartPage from "./pages/CartPage";
import { Alert, Snackbar } from "@mui/material";
import History from "./pages/History";

const Router = () => {
  const { user, snackbarError, setSnackbarError } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        {user && <NavBar />}
        <Routes>
          <Route
            path="/vargas-ivan-58175-react"
            element={user ? <Products /> : <Login />}
          />
          <Route
            path="/vargas-ivan-58175-react/category/:id"
            element={user ? <Products /> : <Login />}
          />
          <Route
            path="/vargas-ivan-58175-react/item/:id"
            element={user ? <ItemDetails /> : <Login />}
          />
          <Route
            path="/vargas-ivan-58175-react/contact"
            element={<Contact />}
          />
          <Route
            path="/vargas-ivan-58175-react/about-us"
            element={<AboutUs />}
          />
          <Route path="/vargas-ivan-58175-react/login" element={<Login />} />
          <Route
            path="/vargas-ivan-58175-react/register"
            element={<Register />}
          />
          <Route
            path="/vargas-ivan-58175-react/cart_page"
            element={user ? <CartPage /> : <Login />}
          />
                    <Route
            path="/vargas-ivan-58175-react/history"
            element={user ? <History /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
      <Snackbar
        open={!!snackbarError}
        autoHideDuration={3000}
        onClose={() => setSnackbarError(null)}
      >
        <Alert
          onClose={() => setSnackbarError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Router;
