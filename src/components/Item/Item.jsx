/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import {
  itemStyle,
  itemNameStyle,
  counterButtonsContainer,
  counterStyle,
  buttonStyle,
  itemImage,
} from "./item.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";

const Item = ({ item }) => {
  const [counter, setCounter] = useState(1);
  const {addItemToCart} = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCounter(1);
  }, [item]);

  const handleCounter = (action) => {
    if (action == "down" && counter >= 1) {
      setCounter(counter - 1);
    }
    if (action == "up") {
      setCounter(counter + 1);
    }
  };

  const handleAddToCart = () => {
    if (counter > 0) {
      // setCartCounter(counter + cartCounter);
      setCounter(1);
      addItemToCart({...item, quantity: counter});
    }
  };

  return (
    <div className={itemStyle}>
      <Box
        className={itemImage}
        component="img"
        src={item.imageUrls[0]}
        alt="item"
      />

      <Box className={counterButtonsContainer}>
        <Button className={buttonStyle} onClick={() => handleCounter("down")}>
          {"<"}
        </Button>
        <div className={counterStyle}>{counter}</div>
        <Button className={buttonStyle} onClick={() => handleCounter("up")}>
          {">"}
        </Button>
      </Box>
      <Box className={itemNameStyle}>
        <div>{item.title}</div>
        <div>${item.price}</div>
      </Box>
      <Button
        onClick={() => {
          navigate("/vargas-ivan-58175-react/item/" + item.id);
        }}
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          height: "50px",
          margin: "0px",
          "&:hover": {
            backgroundColor: "#330f50",
          },
          marginBottom: "0.5rem",
        }}
        fullWidth
      >
        Product details
      </Button>
      <Button
        onClick={() => handleAddToCart()}
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          borderRadius: "0 0 10px 10px",
          height: "50px",
          margin: "0px",
          "&:hover": {
            backgroundColor: "#330f50",
          },
        }}
        fullWidth
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Item;
