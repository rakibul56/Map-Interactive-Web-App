// import { createContext, useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const UserContext= ({children}) => {


//   // const [user, setUser] = useState(null);
//   // const navigate = useNavigate();

// //  useEffect(() => {
// //    const savedUser = localStorage.setItem("user");
// //    if (savedUser) {
// //      setUser(JSON.parse(savedUser));
// //    }
// //  }, []);
//       //localStorage.setItem("user");
//   // Logout function
//   // const logout = () => {
//   //   setUser(null);
//   //   localStorage.removeItem("user");
//   //   navigate("/login"); // Redirect to login page
//   // };

//   // Check if user is logged in on component mount
  

//     // useEffect(() => {
//     //   const token = localStorage.getItem("token");
//     //   if (token) {
//     //     axios
//     //       .get("http://localhost:3001/api/users/", {
//     //         headers: { Authorization: `Bearer ${token}` },
//     //       })
//     //       .then((response) => setUser(response.data))
//     //       .catch(() => localStorage.removeItem("token"));
//     //   }
//     //   console.log(token, "Token")
      
//     // }, []);

//   // const signup =async  ({firstname,lastname,password, email}) => {
//   //   const newUser = await axios.post("http://localhost:3001/api/users", {
//   //     firstname: firstname,
//   //     lastname: lastname,
//   //     email: email,
//   //     password: password,
//   //   });

//   //   setUser(newUser);
//   //   setUserData({...userData, ...newUser});
//   // };

  
  

//   return (
//     <AuthContext.Provider
//      // value={(user,  logout )} 
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default UserContext;
