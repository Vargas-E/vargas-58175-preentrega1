/* eslint-disable react/prop-types */
import { Box, MenuItem, Typography } from "@mui/material";
import CartIcon from "../CartIcon/CartIcon";
import coffeeLogo from "../../assets/images/coffee_logo.webp";
import { logo, menuItemsContainer, menuItem, navBar } from "./navBar.module.css";

const NavBar = ({ navButtons, counter, setCurrPage }) => {
  return (
    <>
      <div className={navBar}>
        <Box className={logo} component="img" src={coffeeLogo} alt="logo" />
        <Box className={menuItemsContainer}>
          {navButtons.map((e, i) => (
            <MenuItem
              className={menuItem}
              key={i}
              onClick={() => setCurrPage(e.title)}
            >
              <Typography textAlign="center">{e.title}</Typography>
            </MenuItem>
          ))}
        </Box>
        <Box>
          <CartIcon counter={counter} />
        </Box>
      </div>
    </>
  );
};

export default NavBar;
