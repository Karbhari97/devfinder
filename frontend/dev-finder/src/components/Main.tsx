import HeroSection from "./HeroSection";
import ProfileCard from "../common/ProfileCard";
import '../styles/Main.module.style.css'
import BottomHero from "./BottomHero";
import ScrollingProfile from "./ScrollingProfile";
import { useSelector } from "react-redux";


const Main = () => {
    const user = useSelector((store:any)=>store.user)
    return user?.user && (
        <div className="mainContainer">
            <section className="hero">
                <HeroSection />
                <ProfileCard user={user.user} self={false} />
            </section>
            <BottomHero />
            <ScrollingProfile />
        </div>
    )
}

export default Main
