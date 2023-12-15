import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { pageContainer, formContainer } from "./login.module.css";
import EcommerceLogo from "../assets/images/ecommerce.png";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loading } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const loggedUser = await loginUser(username, password);
    if (loggedUser) {
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          id="username"
          label="username"
          sx={{ background: "white", border: "1px solid #1e1e1e" }}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="password"
          label="password"
          sx={{ background: "white", border: "1px solid #1e1e1e" }}
          hidden
        />
        <Button
          variant="contained"
          onClick={() => handleLogin()}
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
          Login
        </Button>
        <Button
          sx={{
            color: "#330f50",
          }}
          variant="secondary"
          onClick={() => navigate("/vargas-ivan-58175-react/register")}
        >
          <u>Dont have an account? Register.</u>
        </Button>
      </div>
    </div>
  );
};
