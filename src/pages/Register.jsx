import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { pageContainer, formContainer } from "./register.module.css";
import EcommerceLogo from "../assets/images/ecommerce.png";
import Loading from "../components/Loading/Loading";

export const Register = () => {
  const [mail, setMail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser, loading } = useContext(UserContext);

  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await registerUser(mail, password1, password2);
    if (res) {
      navigate("/vargas-ivan-58175-react/");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={pageContainer}>
      <div className={formContainer}>
        <img src={EcommerceLogo} />

        <TextField
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
          id="username"
          label="Username"
          sx={{ background: "white", border: "1px solid #1e1e1e" }}
        />
        <TextField
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
          id="password"
          label="Password"
          sx={{ background: "white", border: "1px solid #1e1e1e" }}
          hidden
        />
        <TextField
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
          id="password"
          label="Repeat password"
          sx={{ background: "white", border: "1px solid #1e1e1e" }}
          hidden
        />
        <Button
          variant="contained"
          onClick={() => handleRegister()}
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
        >
          Register
        </Button>
        <Button
          sx={{
            color: "#330f50",
          }}
          variant="secondary"
          onClick={() => navigate("/vargas-ivan-58175-react/login")}
        >
          Already have an account? Log in.
        </Button>
      </div>
    </div>
  );
};
