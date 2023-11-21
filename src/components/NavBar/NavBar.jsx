/* eslint-disable react/prop-types */
import { Box, Chip } from "@mui/material";
import CartIcon from "../CartIcon/CartIcon";
import eCommerceLogo from "../../assets/images/ecommerce.png";
import {
  logo,
  menuItemsContainer,
  navBar,
  listStyle,
  itemList,
  secondRowNavBar,
  chipsContainer,
  activeItemList,
} from "./navBar.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  return (
    <>
      <div className={navBar}>
        <NavLink to={"/"}>
          <Box
            className={logo}
            component="img"
            src={eCommerceLogo}
            alt="logo"
            onClick={() => setCategory(null)}
          />
        </NavLink>

        <Box className={menuItemsContainer}>
          <ol className={listStyle}>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? itemList : activeItemList
                }
                to={"/about-us"}
                onClick={() => setCategory(null)}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? itemList : activeItemList
                }
                to={"/contact"}
                onClick={() => setCategory(null)}
              >
                Contact
              </NavLink>
            </li>
          </ol>
        </Box>
        <Box>
          <CartIcon counter={props.counter} />
        </Box>
      </div>
      <div
        style={{ borderTop: "3px solid #FEA82F", backgroundColor: "#1e1e1e" }}
      >
        <ul className={secondRowNavBar}>
          {categories.map((e, i) => (
            <li
              key={i}
              className={chipsContainer}
              style={{ padding: "0.5rem" }}
            >
              <NavLink to={"/category/" + e}>
                <Chip
                  style={{
                    color: category == e ? "#1e1e1e" : "#FEA82F",
                    border: "1px solid #FEA82F",
                    backgroundColor: category == e ? "#FEA82F" : "#1e1e1e",
                  }}
                  onClick={() => setCategory(e)}
                  label={e}
                  variant="outlined"
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
