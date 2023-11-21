/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate, useParams } from "react-router-dom";
import {
  itemDetailsStyle,
  carouselImage,
  counterStyle,
  counterButtonsContainer,
  itemNameStyle,
  buttonStyle,
} from "./itemDetails.module.css";
import Loading from "../Loading/Loading";

const ItemDetails = ({ counter, setCounter }) => {
  const [itemData, setItemData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [itemCounter, setItemCounter] = useState(1);

  useEffect(() => {
    if (id) {
      setItemData(null);
      fetch("https://dummyjson.com/products/" + id)
        .then((res) => res.json())
        .then((json) => {
          setItemData(json);
        });
    }
  }, [id]);

  if (!itemData) {
    return <Loading/>;
  }

  const handleCounter = (action) => {
    if (action == "down" && itemCounter > 1) {
      setItemCounter(itemCounter - 1);
    }
    if (action == "up") {
      setItemCounter(itemCounter + 1);
    }
  };

  const handleAddToCart = () => {
    if (itemCounter > 0) {
      setCounter(counter + itemCounter);
      setItemCounter(1);
    }
  };

  return (
    <div className={itemDetailsStyle}>
      <div style={{ paddingBottom: "1rem" }}>
        <Carousel>
          {itemData.images.map((image, i) => (
            <img className={carouselImage} key={i} src={image} />
          ))}
        </Carousel>
      </div>

      <Box className={itemNameStyle}>
        <div style={{textDecoration: "underline"}}>{itemData.title}</div>
        <div>${itemData.price}</div>
        <div style={{margin: "0.5rem 0"}}>{itemData.description}</div>
      </Box>
      <Box className={counterButtonsContainer}>
        <Button className={buttonStyle} onClick={() => handleCounter("down")}>
          {"<"}
        </Button>
        <div className={counterStyle}>{itemCounter}</div>
        <Button className={buttonStyle} onClick={() => handleCounter("up")}>
          {">"}
        </Button>
      </Box>
      <div style={{ backgroundColor: "#FEA82F", borderRadius: "0 0 15px 15px" }}>
        <Button
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "0",
            height: "50px",
            margin: "0px",
            "&:hover": {
              backgroundColor: "#330f50",
            },
            marginTop: "1rem",
          }}
          fullWidth
          variant="contained"
          onClick={() => handleAddToCart()}
        >
          Add to Cart
        </Button>
        <Button
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "0 0 10px 10px",
            height: "50px",
            margin: "0px",
            "&:hover": {
              backgroundColor: "#330f50",
            },
            marginTop: "1rem",
          }}
          fullWidth
          variant="contained"
          onClick={() => navigate("/vargas-ivan-58175-react")}
        >
          Return to products
        </Button>
      </div>
    </div>
  );
};

export default ItemDetails;
