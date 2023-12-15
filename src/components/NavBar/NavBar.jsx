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
  logout,
} from "./navBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { getCategories } from "../../firebase/firebase";
import Loading from "../Loading/Loading";

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const { logoutUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    awaitCategories();
  }, []);

  const awaitCategories = async () => {
    setCategories(await getCategories())
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/vargas-ivan-58175-react/login");
  };

  if (!categories) {
    return <Loading />;
  }

  return (
    <>
      <div className={navBar}>
        <NavLink to={"/vargas-ivan-58175-react"}>
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
                to={"/vargas-ivan-58175-react/about-us"}
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
                to={"/vargas-ivan-58175-react/contact"}
                onClick={() => setCategory(null)}
              >
                Contact
              </NavLink>
            </li>
            <div className={logout} onClick={() => handleLogout()}>
              Logout
            </div>
          </ol>
        </Box>
        <Box>
          <NavLink to={"/vargas-ivan-58175-react/cart_page"}>
            <CartIcon />
          </NavLink>
        </Box>
      </div>
      <div
        style={{ borderTop: "3px solid #FEA82F", backgroundColor: "#1e1e1e" }}
      >
        <ul className={secondRowNavBar}>
          {categories?.map((e, i) => (
            <li
              key={i}
              className={chipsContainer}
              style={{ padding: "0.5rem" }}
            >
              <NavLink to={"/vargas-ivan-58175-react/category/" + e}>
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
