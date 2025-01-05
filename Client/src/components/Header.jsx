//import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { AuthContext } from "../contexts/UserContext";

const Header = () => {
  
  const user = localStorage.getItem("user");
  //const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logOut = () => {
    //setUser(null);
    try {
      localStorage.removeItem("user");
      navigate("/login"); // Redirect to login page
      //alert("LogOut Successful");
    } catch(error) {
      console.error(error);
       }
    
  };
  //LogOut function
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("LogOut Successfull");
        //console.log("log out successfull");
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/EduInfoFinder">EduInfoFinder</Link>
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <span className="text-white">
                <Link to="/user" className="text-white text-bold ">
                  {/* {user.email} */}
                </Link>
              </span>
              <Link to="/" className="text-white ">
                Home
              </Link>
              <Link to="/user" className="text-white ">
                User
              </Link>
              <button onClick={handleLogOut} className="text-white">
                Logout
              </button>
              <Link to="/blog" className="text-white ">
                Blog
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-white ">
                Home
              </Link>
              <Link to="/login" className="text-white ">
                Login
              </Link>
              <Link to="/signup" className="text-white ">
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
