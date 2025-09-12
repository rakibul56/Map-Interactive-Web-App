// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get("http://localhost:3001/api/users/", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => setUser(response.data))
//         .catch(() => localStorage.removeItem("token"));
//     }
//   }, []);

//   const login = async (username, password) => {
//     const response = await axios.post("http://localhost:3001/api/users/login", {
//       username,
//       password,
//     });
//     localStorage.setItem("token", response.data.token);
//     setUser(response.data.user);
//   };

//   const signup = async (username, password, email) => {
//     const response = await axios.post(
//       "http://localhost:3001/api/users/signup",
//       { username, password, email }
//     );
//     localStorage.setItem("token", response.data.token);
//     setUser(response.data.user);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };


  
//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
