/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { CartContext } from "../../contexts/cartContext";
import { useNavigate } from "react-router-dom";

const UserDataDialog = ({ open, onClose }) => {
  const { updateUser } = useContext(UserContext);
  const { finishPurchase } = useContext(CartContext);
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    age: null,
    email: null,
  });

  const navigate = useNavigate();

  const handleChange = (value, id) => {
    setNewUserData({ ...newUserData, [id]: value });
  };

  const handleFinish = async () => {
    const res = await updateUser(newUserData);
    if (res == true) {
      await finishPurchase();
      onClose();
      navigate("/vargas-ivan-58175-react/");
    } else {
      setErrors(res);
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          background: "#FEA82F",
        },
      }}
    >
      <DialogTitle>
        Hi! We need some information about you to process your purchase
      </DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            paddingTop: "1rem",
          }}
        >
          <TextField
            required
            id="firstName"
            label="First Name"
            onChange={(e) => handleChange(e.target.value, e.target.id)}
            error={!!errors.firstName}
            helperText={errors.firstName || ""}
            sx={{ background: "white", border: "1px solid #1e1e1e" }}
          />
          <TextField
            required
            id="lastName"
            label="Last name"
            onChange={(e) => handleChange(e.target.value, e.target.id)}
            error={!!errors.lastName}
            helperText={errors.lastName || ""}
            sx={{ background: "white", border: "1px solid #1e1e1e" }}
          />
          <TextField
            required
            id="age"
            label="Age"
            onChange={(e) => handleChange(e.target.value, e.target.id)}
            error={!!errors.age}
            helperText={errors.age || ""}
            sx={{ background: "white", border: "1px solid #1e1e1e" }}
          />
          <TextField
            required
            id="email"
            label="email"
            onChange={(e) => handleChange(e.target.value, e.target.id)}
            error={!!errors.email}
            helperText={errors.email || ""}
            sx={{ background: "white", border: "1px solid #1e1e1e" }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            margin: "0px",
            "&:hover": {
              backgroundColor: "#330f50",
            },
            marginBottom: "0.5rem",
          }}
          variant="contained"
          onClick={() => onClose()}
        >
          Cancelar
        </Button>
        <Button
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            margin: "0px",
            "&:hover": {
              backgroundColor: "#330f50",
            },
            marginBottom: "0.5rem",
          }}
          variant="contained"
          onClick={() => handleFinish()}
        >
          Confirm info and finish purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDataDialog;
