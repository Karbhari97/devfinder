import  '../styles/Navbar.module.style.css'
const Navbar = () => {
  return (
<nav>
  <div className='logo'>dev<span>//</span>finder</div>
  <ul className="nav-links">
    <li><a href="#">Explore</a></li>
    <li><a href="#">Matches</a></li>
    <li><a href="#">Projects</a></li>
    <li><a href="#">Pricing</a></li>
  </ul>
  <button className="nav-cta">Start Matching →</button>
</nav>
  )
}

export default Navbar
