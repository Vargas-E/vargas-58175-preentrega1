/* eslint-disable react/prop-types */
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {cartIconContainer, cartIconCounter} from "./cartIcon.module.css";

const CartIcon = ({counter}) => {
  return (
    <div
      className={cartIconContainer}
    >
      <ShoppingCartIcon />
      <div className={cartIconCounter}>{counter}</div>
    </div>
  );
};

export default CartIcon;
