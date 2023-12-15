/* eslint-disable react/prop-types */
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartIconContainer, cartIconCounter } from "./cartIcon.module.css";
import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

const CartIcon = () => {
  const { cartList } = useContext(CartContext);

  const counterHandler = () => {
    return cartList?.cart.reduce((acc, e) => acc + e.quantity, 0) || 0;
  };

  return (
    <div className={cartIconContainer}>
      <ShoppingCartIcon />
      <div className={cartIconCounter}>{counterHandler()}</div>
    </div>
  );
};

export default CartIcon;
