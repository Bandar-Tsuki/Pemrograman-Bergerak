import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/home/index";
import History from "../views/history/index";
import Camera from "../views/camera/index";
import Choice from "../views/choice/index";
import Inset from "../views/insert/index";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/history">
          <Route index element={<History />} />
        </Route>
        <Route path="/camera">
          <Route index element={<Camera />} />
        </Route>
        <Route path="/choice">
          <Route index element={<Choice />} />
        </Route>
        <Route path="/insert">
          <Route index element={<Inset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Index;
