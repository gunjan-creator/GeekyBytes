import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { url } from "../../url";
import Loader from "../components/Loader";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Usercontext } from "../context/Usercontext";

const Home = () => {
  const { search } = useLocation();
  const { user } = useContext(Usercontext);
  console.log(user);
  const [noresult, setnoresult] = useState(false);
  const [loader, setloader] = useState(false);
  const [post, setpost] = useState([]);
  const fetchpost = async () => {
    try {
      setloader(true);
      const res = await axios.get(url + "/api/posts" + search);
      setpost(res.data);
      setloader(false);
      if (res.data.length == 0) {
        setnoresult(true);
      } else {
        setnoresult(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchpost();
  }, [search]);
  return (
    <>
      <Navbar />
      <div className=" px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noresult ? (
          post.map((post, i) => {
            return (
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
              </Link>
            );
          })
        ) : (
          <h3 className="text-center text-bold mt-16">No results found.</h3>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Home;
