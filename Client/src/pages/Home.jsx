//import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className=" container mx-auto flex flex-col justify-center items-center">
    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
      Welcome to EduInfoFinder
    </h1>
    <p className="text-lg md:text-xl mb-2 text-center">
      Find your Educational and Career Information near you!
    </p>
    <Link
      to="/EduInfoFinder"
      className="text-blue-600 underline text-lg md:text-x
    l"
    >
      Explore EduInfoFinder
    </Link>
  </div>
);

export default Home;
