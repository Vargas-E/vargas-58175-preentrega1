/* eslint-disable react/prop-types */
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { user, setSnackbarError } = useContext(UserContext);
  const [cartList, setCartList] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = getFirestore();
  const cartsCollection = collection(db, "carts");

  useEffect(() => {
    const checkCurrentCart = async () => {
      if (user) {
        const q = query(
          cartsCollection,
          where("userId", "==", user.userId),
          where("currentCart", "==", true)
        );
        try {
          const res = await getDocs(q);
          if (res.size > 0) {
            const currentCart = res.docs.map((e) => ({
              ...e.data(),
              id: e.id,
            }))[0];
            setCartList(currentCart);
          } else {
            const newCart = {
              currentCart: true,
              cart: [],
              total: 0,
              initTs: new Date(),
              userId: user.userId,
            };
            let response = await addDoc(cartsCollection, newCart);
            setCartList({ ...newCart, id: response.id });
          }
        } catch (err) {
          setSnackbarError("Error while bringing your last cart");
        }
      }
    };
    checkCurrentCart();
  }, [user]);

  const updateCart = async (newCart) => {
    try {
      await updateDoc(doc(db, "carts", newCart.id), {
        cart: newCart.cart,
        total: newCart.total,
      });
    } catch (err) {
      setSnackbarError("Error updating your cart to teh database.");
    }
  };

  const total = (newCart) => {
    const t = newCart.cart.reduce((acc, e) => acc + e.quantity * e.price, 0);
    return t;
  };

  const addItemToCart = (newItem) => {
    const item = cartList.cart.find((e) => e.title == newItem.title);
    let newCart;
    if (item) {
      newCart = {
        ...cartList,
        cart: cartList.cart.map((e) =>
          e != item ? e : { ...item, quantity: e.quantity + newItem.quantity }
        ),
      };
      const t = total(newCart);
      newCart = { ...newCart, total: t };
    } else {
      newCart = {
        ...cartList,
        cart: [...cartList.cart, newItem],
      };
      const t = total(newCart);
      newCart = { ...newCart, total: t };
    }
    setCartList(newCart);
    updateCart(newCart);
  };

  const deleteItemInCart = (item) => {
    const data = cartList.cart.filter((e) => e.id != item.id);
    const newCart = { ...cartList, cart: data };
    const t = total(newCart);
    setCartList({ ...newCart, total: t });
    updateCart({ ...newCart, total: t });
  };

  const finishPurchase = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "carts", cartList.id), {
        cart: cartList.cart,
        currentCart: false,
      });
      const newCart = {
        currentCart: true,
        cart: [],
        total: 0,
        initTs: new Date(),
        userId: user.userId,
      };
      let response = await addDoc(cartsCollection, newCart);
      setCartList({ ...newCart, id: response.id });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setSnackbarError("Error finishing your purchase. Please try again.");
    }
  };

  const cleanCart = () => {
    const newCart = {
      currentCart: true,
      cart: [],
      total: 0,
      initTs: new Date(),
      userId: user.userId,
    };
    setCartList(newCart);
    updateCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        addItemToCart,
        deleteItemInCart,
        finishPurchase,
        loading,
        cartList,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
