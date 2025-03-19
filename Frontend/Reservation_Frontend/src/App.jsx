import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Signin from "./assets/pages/Sign_in";
import Signup from "./assets/pages/Signup";
import { ToastContainer } from "react-toastify";

function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
  </Routes>
  </BrowserRouter>
  <ToastContainer/>
  </>;






}

export default App;




































