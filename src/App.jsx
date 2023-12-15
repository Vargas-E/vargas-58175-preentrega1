import Router from "./Router";
import UserContextProvider from "./contexts/userContext";
import CartContextProvider from "./contexts/cartContext";

function App() {
  
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <Router />
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
