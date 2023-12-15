import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, query, collection } from "firebase/firestore";

// tu config
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

//como se inicializa
const app = initializeApp(firebaseConfig);

// export de db si la queres usar
export const db = getFirestore(app);

const name = "users";
const collectionName = collection(db, name);

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getSomething = async () => {
      const q = query(collectionName);
      try {
        const res = await getDocs(q);
        if (res.size > 0) {
          const a = res.docs.map((e) => ({
            ...e.data(),
            id: e.id,
          }));
          setData(a);
          console.log("data from firebase:", a);
        }
      } catch (err) {
        console.log("err:", err);
      }
    };
    getSomething();
  }, []);

  return <div>{JSON.stringify(data) || "hola"}</div>;
};



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




