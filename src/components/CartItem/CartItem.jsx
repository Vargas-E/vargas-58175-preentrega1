/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  cartItemContainer,
  imageContainer,
  image,
  textContainer,
  text,
  iconContainer,
} from "./cartItem.module.css";
const CartItem = ({ cartItem }) => {
  const { deleteItemInCart } = useContext(CartContext);

  return (
    <div className={cartItemContainer}>
      <div className={imageContainer}>
        <img
          className={image}
          src={cartItem.imageUrls[0]}
          alt={cartItem.title}
        />
      </div>
      <div className={textContainer}>
        <div className={text}>
          <h3>{cartItem.title}</h3>
          <h5>
            <b>{"ID " + cartItem.id}</b>
          </h5>
          <p>
            <b>
              {`Unit Price: $${cartItem.price} | Quantity: ${cartItem.quantity}`}
            </b>
          </p>
          <h3>{"Total: $" + cartItem.quantity * cartItem.price}</h3>
        </div>
        <div className={iconContainer}>
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => deleteItemInCart(cartItem)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
