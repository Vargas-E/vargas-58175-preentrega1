/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarError, setSnackbarError] = useState(null);
  const usersCollection = collection(db, "users");

  useEffect(() => {
    checkUser();
  }, []);

  const loginUser = async (user, password) => {
    setLoading(true);
    const q = query(
      usersCollection,
      where("user", "==", user),
      where("password", "==", password)
    );
    try {
      const res = await getDocs(q);
      if (res.size > 0) {
        const userFromFirebase = res.docs.map((e) => ({
          ...e.data(),
          id: e.id,
        }))[0];
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            user: user,
            loginTs: new Date(),
            userId: userFromFirebase.id,
          })
        );
        setUser({ ...userFromFirebase.user, userId: userFromFirebase.id });
      } else {
        setLoading(false);
        setSnackbarError("Incorrect username or password");
      }
    } catch (err) {
      setLoading(false);
      setSnackbarError("Error while logging in. Please try again");
    }
    setLoading(false);
    return user;
  };

  const registerUser = async (user, password1, password2) => {
    setLoading(true);
    const q = query(usersCollection, where("user", "==", user));
    const res = await getDocs(q);
    if (res.size > 0) {
      setSnackbarError("Username already exists");
      return;
    }
    if (password1 == password2) {
      const userToSend = { user, password: password1 };
      try {
        const res = addDoc(usersCollection, userToSend);
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            user: user,
            loginTs: new Date(),
            userId: res,
          })
        );
        setUser({ user, userId: res });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setSnackbarError(
          "Error while attempting to register. Please try again later."
        );
      }
    } else {
      setLoading(false);

      setSnackbarError("Password verification doesn't match");
    }
  };

  const checkUser = async () => {
    setLoading(true);
    const userInCache = JSON.parse(window.localStorage.getItem("user"));
    if (userInCache && !checkDate(userInCache.loginTs)) {
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          user: userInCache.user,
          loginTs: new Date(),
          userId: userInCache.userId,
        })
      );
      const docRef = doc(db, "users", userInCache.userId);
      try {
        const userFromDb = await getDoc(docRef);
        if (userFromDb) {
          setUser({ userId: userFromDb.id, ...userFromDb.data() });
        }
      } catch (err) {
        setSnackbarError("Error while checking user. Please try again");
      }
    } else {
      window.localStorage.removeItem("user");
    }
    setLoading(false);
  };

  const checkDate = (loginDate) => {
    return (
      Math.abs(new Date().getTime() - Date.parse(loginDate)) / 3600000 > 24
    );
  };

  const logoutUser = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };

  const updateUser = async (data) => {
    const validateData = validateFormData(data);
    if (Object.keys(validateData)?.length == 0) {
      try {
        await updateDoc(doc(db, "users", user.userId), { ...data });
        return true;
      } catch (err) {
        setSnackbarError("Error while updating user data. Please try again");
      }
    } else {
      return validateData;
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (data.firstName.length == 0) {
      errors.firstName = "First name can't be empty";
    }
    if (data.lastName.length == 0) {
      errors.lastName = "First name can't be empty";
    }
    if (isNaN(data.age) || data.age.length == 0) {
      errors.age = "Age must be a number";
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)) {
      errors.email = "Mail must be valid";
    }
    return errors;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        logoutUser,
        checkUser,
        updateUser,
        loading,
        setLoading,
        snackbarError,
        setSnackbarError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
