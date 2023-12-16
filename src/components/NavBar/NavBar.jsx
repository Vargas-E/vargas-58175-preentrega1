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
  saluteContainer,
} from "./navBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { getCategories } from "../../firebase/firebase";
import Loading from "../Loading/Loading";
import { CartContext } from "../../contexts/cartContext";

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const { logoutUser, user } = useContext(UserContext);
  const { cleanCart } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    awaitCategories();
  }, []);

  const awaitCategories = async () => {
    setCategories(await getCategories());
  };

  const handleLogout = () => {
    logoutUser();
    cleanCart(true);
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
        {user.firstName && (
          <Box className={saluteContainer}>
            <h4>
              Hi {user.firstName}! We hope you are having a wonderful day!
            </h4>
          </Box>
        )}

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
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? itemList : activeItemList
                }
                to={"/vargas-ivan-58175-react/history"}
                onClick={() => setCategory(null)}
              >
                History
              </NavLink>
            </li>
            <div className={logout} onClick={() => handleLogout()}>
              Logout
            </div>
          </ol>
        </Box>
        <Box>
          <NavLink
            className={(navData) =>
              navData.isActive ? itemList : activeItemList
            }
            to={"/vargas-ivan-58175-react/cart_page"}
            onClick={() => setCategory(null)}
          >
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
              <NavLink
                className={(navData) =>
                  navData.isActive ? itemList : activeItemList
                }
                to={"/vargas-ivan-58175-react/category/" + e}
              >
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
