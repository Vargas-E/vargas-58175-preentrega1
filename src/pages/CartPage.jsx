import { useContext, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import { Button } from "@mui/material";
import { UserContext } from "../contexts/userContext";
import UserDataDialog from "../components/UserDataDialog/UserDataDialog";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem/CartItem";
import Loading from "../components/Loading/Loading";
import { purchaseFinishedContainer } from "./cartPage.module.css";

const CartPage = () => {
  const { cartList, finishPurchase, cleanCart, loading } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [purchaseFinished, setPurchaseFinished] = useState(false);
  const navigate = useNavigate();

  if (!cartList || loading) {
    return <Loading />;
  }

  const id = cartList.id;

  const handleFinish = async () => {
    if (!user.firstName) {
      setOpenDialog(true);
    } else {
      await finishPurchase();
      setPurchaseFinished(true);
    }
  };

  if (purchaseFinished) {
    return (
      <div className={purchaseFinishedContainer}>
        <h2>Purchase finished! ID: {id}</h2>
        <h3>
          {"We'll send you the details of your purchase by mail (not really...)"}
        </h3>

        <Button
          variant="contained"
          onClick={() => navigate("/vargas-ivan-58175-react/")}
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            margin: "0px",
            "&:hover": {
              backgroundColor: "#330f50",
            },
            marginBottom: "0.5rem",
          }}
        >
          Return to products
        </Button>
      </div>
    );
  }

  return (
    <div>
      <UserDataDialog open={openDialog} onClose={() => setOpenDialog(false)} />
      {cartList.cart.map((e, i) => (
        <CartItem key={i} cartItem={e} />
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "space-between",
          width: "60vw",
          height: "80px",
          margin: "auto",
          backgroundColor: "#FEA82F",
          borderRadius: "10px",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: "3rem",
        }}
      >
        <h3 style={{ marginLeft: "1rem", color: "#1e1e1e" }}>
          {"Total: $" + cartList.total}
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            marginRight: "1rem",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1e1e1e",
              color: "white",
              margin: "0px",
              "&:hover": {
                backgroundColor: "#330f50",
              },
              marginBottom: "0.5rem",
            }}
            disabled={cartList.cart.length == 0}
            onClick={() => cleanCart()}
          >
            Erase cart
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1e1e1e",
              color: "white",
              margin: "0px",
              "&:hover": {
                backgroundColor: "#330f50",
              },
              marginBottom: "0.5rem",
            }}
            disabled={cartList.cart.length == 0}
            onClick={() => handleFinish()}
          >
            Finish purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
