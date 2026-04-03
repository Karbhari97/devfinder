import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchUserApi } from "../service";
import { addUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store: any) => store.user);

    async function fetchUser() {
        try {
            if (user) return;
            const response: any = await fetchUserApi();
            if (response.message === "Missing auth token") {
                navigate("/login");
                return;
            }
            dispatch(addUser(response));
        } catch (error: any) {
            console.log("from bnofy error", error);
            navigate("/login");
            return;
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Body;
