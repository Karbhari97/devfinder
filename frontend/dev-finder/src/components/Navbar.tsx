import  '../styles/Navbar.module.style.css'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();
  return (
<nav>
  <div className='logo'>dev<span>//</span>finder</div>
  <ul className="nav-links">
    <li><a href="#">Explore</a></li>
    <li><a href="#">Matches</a></li>
    <li><a href="#">Projects</a></li>
    <li><a href="#">Pricing</a></li>
  </ul>
  <button className="nav-cta" onClick={()=>{navigate('/login')}}>Start Matching →</button>
</nav>
  )
}

export default Navbar
