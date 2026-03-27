import '../styles/HeroSection.module.style.css';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="hero-content">
                <h1>
                    Swipe.
                    <br />
                    <span className="line2">Match.</span>
                    <br />
                    <span className="line3">Build together.</span>
                </h1>
                <p className="hero-sub">
                    Find your perfect co-founder, collaborator, or open-source
                    contributor. DevFinder matches developers by stack, vibe, and vision
                    — not just resume keywords.
                </p>
                <div className="hero-btns">
                    <button className="btn-primary" onClick={() => { navigate('/signup') }}>Create Profile</button>
                </div>
                <div className="hero-stats">
                    <div>
                        <div className="stat-num">12K+</div>
                        <div className="stat-label">developers</div>
                    </div>
                    <div>
                        <div className="stat-num">3.2K</div>
                        <div className="stat-label">projects built</div>
                    </div>
                    <div>
                        <div className="stat-num">94%</div>
                        <div className="stat-label">match rate</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
