import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="page">
      <div className="nav-buttons"><button><Link to="/register" >Register</Link></button></div>
      <div className="nav-buttons"><button><Link to="/login" >Login</Link></button> </div>
      
     
    </div>
  );
};

export default Layout;

