import axios from "axios";
//import { useContext } from "react";
//import { AuthContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const naviget = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(firstName, lastName, email, password);
    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        
      });
      console.log("User created successfully:", response.data);
      naviget("/login");
    } catch (error) {
      console.error("Error response:", error.response.data);
      if (error.response.status === 409) {
        alert("A User exists with this Email ,Please Use another Email");
      } else {
        alert("An error occurred. Please try again.");
      }
      if (error.request) {
        //console.error('Error request:', error.request);
        //alert('No response from server. Please try again later.');
      } else {
        console.error("Error message:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm "
      >
        <h2 className="mb-4 text-2xl font-bold">SignUp</h2>
        <h1>First Name: </h1>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          name="firstName"
          id="firstName"
          placeholder="first name"
          required
        />
        <h1>Last Name: </h1>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          name="lastName"
          id="lastName"
          placeholder="last name"
          required
        />

        <h1>Email: </h1>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required
        />
        <h1>Password: </h1>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
        />

        <button
          className="w-full p-2 bg-blue-600 text-white rounded mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="flex justify-center p-4">
        <button
          // onClick={createUser}
          className="p-2 bg-gray-400 text-white rounded mt-2"
        >
          Register With Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
