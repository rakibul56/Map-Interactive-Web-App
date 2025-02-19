// import React,{ useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MapPage from "./pages/MapPage";
import Signup from "./pages/Signup";
import User from "./pages/User";
import About from "./pages/About";
import Impressum from "./pages/Impressum";
//import { createContext } from "react";

//export const UserContext = createContext()
const App = () => {
  // const ProtectedRoute = ({ children }) => {
  //   const { user } = React.useContext(UserContext);
  //   return user ? children : <Navigate to="/login" />;
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {/* <UserContext.Provider value="Royal"> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />{" "}
          <Route
            path="/user"
            element={
              // <ProtectedRoute>
              <User />
              // </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/EduInfoFinder" element={<MapPage />} />
        </Routes>
        {/* </UserContext.Provider> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
