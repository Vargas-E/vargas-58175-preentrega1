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

  // TODO

  // terminar el update de usuario DONE!!! EL USUARIO UPDATEA BIEN
  // Agregar que el form de compra que pide datos no aparezca si los datos ya estan (por eso hay que updatear los datros de USUARIO) DONE!!!!
  // Agregar validacion al form de compra al final DONE!!!!
  // Crear cart inicial, y al terminar sea cierre o finish updatear el objeto, IMPORTANTE DONE!!!!
  // IMPORTANTE: VER PORQUE NO AGARRA EL CART DE CARTLIST AL USAR BEFORE UNLOAD!! IMPORTANTE!!! NOSE, PERO SE SOLUCIONO DE OTRA FORMA! DONE!!!
  // agregar guardado de carrito con window.beforeunload IMPORTANTE DONE!!! SE SOLUCIONO DE OTRA FORMA!
  // agregar productos a firebase IMPORTANTE DONE!!!!
  // Cambiar las llamadas por llamadas a firebase, cuando se entra en itemdetails que llame al item por id (la idea es que podria cambiar el stock) IMPORTANTE DONE!!
  // Se cambio el counter!! DONEEEE
  // terminar el check de usuario con localStorage agregando checkeo de fecha DONE! SE PUSO EN 24HS
  // Agregar validaciones para login registro  DONE CON SNACKBARS!
  // CSSS ASDASDASDASD
  // SI QUEDA TIEMPO REFACTORIZAR, EN ESPECIAL LO DE FIREBASE!!
  // SI QUEDA MAS TIEMPO AUN, AGREGAR TODOS LOS PRODUCTOS DE DUMMYJSON!!!

  // AGREGAR LOADING A  LOGIN, A REGISTER  Y A FINISHPURCHASE

  // DONT
  // agregar que al finalizar la compra se cambie el stock del producto (?)
  // agregar historial (?)
  // Agregar para que si no hay stock diga agotado IMPORTANTE (?)


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
