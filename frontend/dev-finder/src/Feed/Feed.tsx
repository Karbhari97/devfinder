import { useEffect } from "react";
import ProfileCard from "../common/ProfileCard";
import { fetchFeedApi } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store: any) => store.feed)
  const fetchFeed = async () => {
    try {
      if (feed) return;
      const response: any = await fetchFeedApi();
      dispatch(addFeed(response.data));
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchFeed()
  }, [])
  return feed && (
    <div >
      <ProfileCard user={feed[1]} self={false}/>
    </div>
  );
};

export default Feed;
