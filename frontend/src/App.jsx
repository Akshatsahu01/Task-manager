import { useEffect, useState } from "react";
import { Route,Routes } from "react-router-dom";
import Protected from "./components/Protected";
import Dashboard from "./components/dashboard";
import Login from "./components/Login";

function App(){


  return(<>
    <Routes>
   <Route path="/login" element={<Login/>}></Route>
   <Route path="/dashboard" element=
   {<Protected>{<Dashboard/>}</Protected>}>

   </Route>
    </Routes>
       
  </>)
}


export default App