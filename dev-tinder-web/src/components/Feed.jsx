import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {addFeed} from "../utils/feedSlice";
import {useDispatch,useSelector} from "react-redux";
import {useEffect, useState} from "react"; // Added useState for managing loading state
import UserCard from "./UserCard";

const Feed =() =>{
  const feed = useSelector((store)=>store.feed);
  console.log("feed",feed)
    const dispatch = useDispatch();
const [loading, setLoading] = useState(false); // Added loading state

  const getFeed = async () => {
    if(feed) return; 
setLoading(true); // Set loading to true before fetching
    try{
      const res= await axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res?.data));
    }
    catch(err)
    {
      console.error(err);
    }  
setLoading(false); // Set loading to false after fetching
  }
  useEffect(()=>{
    getFeed();
  },[])

   return (
    <div className="flex flex-col items-center my-15 space-y-5">
      {loading ? ( // Show loading message while fetching
        <h1>Loading...</h1>
      ) : feed && feed.length > 0 ? (
        feed.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <h1>No users found!</h1>
      )}
    </div>
  );
};

export default Feed;
