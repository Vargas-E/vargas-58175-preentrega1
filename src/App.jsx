import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Products from "./pages/Products";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";

function App() {
  const navButtons = [
    {
      title: "Home",
    },
    { title: "Products" },
    { title: "About us" },
  ];

  const [counter, setCounter] = useState(0);
  const [currPage, setCurrPage] = useState("home");

  const pageHandler = () => {
    switch (currPage) {
      case "Home":
        return <HomePage />;
      case "Products":
        return <Products counter={counter} setCounter={setCounter}/>;
      case "About us":
        return <AboutUs />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <div style={{ width: "100vw" }}>
        <NavBar navButtons={navButtons} counter={counter} setCurrPage={setCurrPage} />
      </div>
      <div>{pageHandler()}</div>
    </>
  );
}

export default App;
