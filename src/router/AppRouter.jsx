import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivatedRoutes from "./PrivatedRoutes";
import Register from "../pages/Register/Register";
import Login from "../pages/login/Login";
import LoginWithPhone from "../pages/loginWithPhone/loginWithPhone";
import Home from "../pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setIsAuthenticate, setUser } from "../store/users/userSlice";

function AppRouter() {
  const { isAuthenticate, user } = useSelector( store => store.user );
  const [ checking, setChecking ] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (userLogger)=>{
      if(userLogger?.uid && !user){
        dispatch(setIsAuthenticate(true));
        dispatch(setUser({email: userLogger.email, id: userLogger.uid, name: userLogger.displayName, photoURL: userLogger.photoURL, accessToken: userLogger.accessToken}));
        //dispatch(setError(false));
      }
    });
    setChecking(false);
  }, [dispatch, user]);
  if(checking){
    return <div>Cargando...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<PublicRoutes isAuthenticate={isAuthenticate} />}>
            <Route path="Register" element={<Register />} />
            <Route path="Login" element={<Login />} />
            <Route path="LoginWithPhone" element={<LoginWithPhone />} />
          </Route>
          <Route element={<PrivatedRoutes isAuthenticate={isAuthenticate} />}>
            <Route path="Home" element={<Home />} />
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
