import HeroSection from "./HeroSection";
import ProfileCard from "../common/ProfileCard";
import '../styles/Main.module.style.css'
import BottomHero from "./BottomHero";
import ScrollingProfile from "./ScrollingProfile";


const Main = () => {
    return (
        <div className="mainContainer">
            <section className="hero">
                <HeroSection />
                <ProfileCard />
            </section>
            <BottomHero />
            <ScrollingProfile />
        </div>
    )
}

export default Main
