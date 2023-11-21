import { useState } from "react";
import Router from "./Router";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Router counter={counter} setCounter={setCounter} />
    </>
  );
}

export default App;
