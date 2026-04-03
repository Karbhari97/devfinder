import { useDispatch, useSelector } from 'react-redux';
import '../styles/Navbar.module.style.css'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../store/userSlice';
import { logoutApi } from '../service';
const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store: any) => store.user)
  const dispatch = useDispatch();

  async function handleLogout() {
    await logoutApi();
    dispatch(removeUser(user));
    navigate('/login')
  }
  return (
    <nav>
      <div className='logo'>dev<span>//</span>finder</div>
      <ul className="nav-links">
        <li><a href="#">Explore</a></li>
        <li><a href="#">Matches</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Pricing</a></li>
      </ul>
      {
        !user && <button className="nav-cta" onClick={() => { navigate('/login') }}>Start Matching →</button>
      }
      {
        user && <button className="nav-cta" onClick={() => { handleLogout() }}>Logout</button>
      }
    </nav>
  )
}

export default Navbar
