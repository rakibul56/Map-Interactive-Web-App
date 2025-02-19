import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
//import UserContext from "./contexts/UserContext";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      {/* <UserContext> */}
      <App />
      {/* </UserContext> */}
    </Router>
  </React.StrictMode>
);
