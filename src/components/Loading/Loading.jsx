import { CircularProgress } from "@mui/material";
import { loadingContainer } from "./loading.module.css";

const Loading = () => {
  return (
    <div className={loadingContainer}>
      <CircularProgress sx={{color: "#FEA82F"}} />
    </div>
  );
};

export default Loading;
