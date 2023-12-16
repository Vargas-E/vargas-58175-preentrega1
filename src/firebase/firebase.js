// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3s9ug8aL4lgqt89phGO90YZyA1y_kIMc",
  authDomain: "ecommerce-react-58175.firebaseapp.com",
  projectId: "ecommerce-react-58175",
  storageBucket: "ecommerce-react-58175.appspot.com",
  messagingSenderId: "320247565278",
  appId: "1:320247565278:web:d541c3fdb9cc7ff6b46b4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getProducts = async (category) => {
  const productsCollection = collection(db, "productos");
  let que;
  if (category) {
    que = query(productsCollection, where("category", "==", category));
  } else {
    que = query(productsCollection);
  }
  const res = await getDocs(que);
  if (res.size > 0) {
    const productsFromFirebase = res.docs.map((e) => ({
      ...e.data(),
      id: e.id,
    }));
    return productsFromFirebase;
  }
};

export const getItemById = async (id) => {
  const docRef = doc(db, "productos", id);
  const data = await getDoc(docRef);
  return { ...data.data(), id: data.id };
};

export const getCategories = async () => {
  const docRef = doc(db, "categories", "categories");
  const data = await getDoc(docRef);
  return data.data().categories;
};

export const getHistoryFromFirebase = async (userId) => {
  const cartsCollection = collection(db, "carts");
  let que = query(
    cartsCollection,
    where("userId", "==", userId),
    where("currentCart", "==", false)
  );
  const res = await getDocs(que);
  if (res.size > 0) {
    const historyFromFirebase = res.docs.map((e) => ({
      ...e.data(),
      id: e.id,
    }));
    return historyFromFirebase;
  }
};
