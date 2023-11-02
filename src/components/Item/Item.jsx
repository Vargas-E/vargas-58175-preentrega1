/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import {
  itemStyle,
  itemNameStyle,
  counterButtonsContainer,
  counterStyle,
  buttonStyle,
} from "./item.module.css";
import { useState } from "react";

const Item = ({ itemName, itemPrice, cartCounter, setCartCounter }) => {
  const [counter, setCounter] = useState(1);
  const [randomColor, setRandomColor] = useState("#" +  Math.floor(Math.random() * 16777215).toString(16));

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
      setCartCounter(counter + cartCounter);
      setCounter(1);
    }
  };

  return (
    <div className={itemStyle}>
      <Box
        style={{
          borderRadius: "10px 10px 0 0",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: randomColor,
        }}
      >
        {itemName}
      </Box>
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
        <div>{itemName}</div>
        <div>${itemPrice}</div>
      </Box>
      <Button
        onClick={() => handleAddToCart()}
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          borderRadius: "0 0 10px 10px",
          height: "50px",
          margin: "0px",
          "&:hover": {
            backgroundColor: "rgb(46, 20, 20)",
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
