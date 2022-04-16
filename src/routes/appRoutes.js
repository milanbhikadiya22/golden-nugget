import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import History from "../hoc/History";
import Home from "../pages/home/Home";

const AppRoute = () => {

  return (
    <BrowserRouter history={History}>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoute;