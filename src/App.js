import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import AddUsers from "./Components/Adduser/AddUser";
import ViewUsers from "./Components/View/View";
import UpdateUser from "./Components/UpdateUser/UpdateUser";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddUsers />} />
          <Route path="/view" element={<ViewUsers />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
