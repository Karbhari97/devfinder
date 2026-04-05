import { useDispatch, useSelector } from "react-redux";
import "../styles/Navbar.module.style.css";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../store/userSlice";
import { logoutApi } from "../service";
const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

  async function handleLogout() {
    await logoutApi();
    dispatch(removeUser(user));
    navigate("/login");
  }
  return (
    <nav >
      <div className="logo">
        dev<span>//</span>finder
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/feed">Feed</Link>
        </li>
        <li>
          <Link to="/connections">Request</Link>
        </li>
         <li>
          <Link to="/connections">connections</Link>
        </li>
        <li>
          <Link to="/editProfile">Profile</Link>
        </li>
      </ul>
      {!user && (
        <button
          className="nav-cta"
          onClick={() => {
            navigate("/login");
          }}
        >
          Start Matching →
        </button>
      )}
      {user && (
        <button
          className="nav-cta h-10"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>

      )}
    </nav>
  );
};

export default Navbar;
