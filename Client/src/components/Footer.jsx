import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-blue-600 p-4 text-white text-center ">
    <div className=" space-x-2">
      <Link to="/impressum" className="text-white text-center underline">
        Impressum
      </Link>
      <Link to="/about" className="text-white text-center underline">
        About us.
      </Link>
    </div>
    &copy; 2024 EduInfoFinder. All rights reserved.
  </footer>
);

export default Footer;
