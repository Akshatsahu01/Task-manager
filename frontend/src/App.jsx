import { useEffect, useState } from "react";
import { Route,Routes } from "react-router-dom";
import Protected from "./components/Protected";
import Dashboard from "./components/dashboard";
import Login from "./components/Login";
import Signup from "./components/signup";

function App(){


  return(<>
    <Routes>
   <Route path="/login" element={<Login/>}></Route>
   <Route path="/dashboard" element=
   {<Protected>{<Dashboard/>}</Protected>}>

   </Route>
    <Route path="/signup" element={<Signup/>}/>
    </Routes>
       
  </>)
}


export default App