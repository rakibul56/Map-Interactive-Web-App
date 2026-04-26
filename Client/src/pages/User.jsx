//import { useContext, useState } from "react";
//import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = () => {
  //const { user, updateUser, deleteUser, userData } = useContext(AuthContext);
  // const [email, setEmail] = useState(user?.email || "");
  const nevigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const clearForm = (form) => {
    form.firstName.value = "";
    form.lastName.value = "";
    form.email.value = "";
    form.password.value = "";
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    //updateUser(user.id, email);
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    //const homeaddress = form.homeaddress.value;

    console.log(firstName, lastName, email, password);

    const response = await axios.put(
      `http://localhost:3001/api/users/${user._id}`,
      {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      }
    );

    localStorage.setItem("user", JSON.stringify(response.data));
    //console.log(response);
    clearForm(form);
  };

  const handleDelete = async () => {
    // deleteUser(user.id);

    await axios
      .delete(`http://localhost:3001/api/users/${user._id}`)
      .then((response) => {
        if (response.status == 200) localStorage.removeItem("user");
        console.log("Account Deleted");

        nevigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div className="container mx-auto flex flex-col justify-center p-4 items-center">
      <h3 className="text-xl font-bold p=1 mb-2">Update Your Information</h3>
      <form onSubmit={handleUpdate} className="mb-4">
        <h1 className="">Your First Name is: {user?.firstname} </h1>
        <input
          className="w-full p-1 border border-gray-300 rounded"
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={user?.firstname}
          placeholder="first name"
          required
        />
        <h1 className=" ">Your Last Name is: {user?.lastname} </h1>
        <input
          className="w-full p-1 border border-gray-300 rounded"
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={user?.lastname}
          placeholder="last name"
          required
        />

        <h1>Email: {user?.email}</h1>
        <input
          className="w-full p-1 border border-gray-300 rounded"
          type="email"
          name="email"
          id="email"
          defaultValue={user?.email}
          placeholder="email"
          required
        />
        <h1>Password: {user?.password}</h1>
        <input
          className="w-full p-1 border border-gray-300 rounded"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
        />
        <h1 className="flex flex-col  p-3">
          Home Address:: Lat: {user?.homeaddress[0]} & Lon:{" "}
          {user?.homeaddress[1]}
        </h1>

        <div>
          <h1 className=" flex flex-col  p-2  ">
            Favorite :: {user?.favorite}
          </h1>
        </div>

        <button
          className="w-full mx-auto p-2 bg-blue-600 text-white rounded mt-2"
          type="submit"
        >
          Update
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-1 rounded hover:bg-red-600 mb-4"
      >
        Delete Account
      </button>
      {/* <h3 className="text-xl font-semibold mb-2">All Users</h3>
      <ul className="list-disc pl-5">
        {userData.map((u) => (
          <li key={u.id} className="mb-1">
            <span className="font-medium">{u.username}</span> - {u.email}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default User;
