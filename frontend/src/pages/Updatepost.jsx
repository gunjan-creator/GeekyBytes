import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../url";
import { Usercontext } from "../context/Usercontext";
import Loader from "../components/Loader";
const Updatepost = () => {
  const user = useContext(Usercontext);
  const postid = useParams().id;
  const [loader, setloader] = useState(false);
  const navigator = useNavigate();
  const [title, settitle] = useState("");
  const [file, setfile] = useState(null);
  const [desc, setdesc] = useState("");
  const [cat, setcat] = useState("");
  const [cats, setcats] = useState([]);

  useEffect(() => {
    fetchpost();
  }, []);
  const fetchpost = async () => {
    try {
      const res = await axios.get(url + "/api/posts/" + postid);

      settitle(res.data.title);
      setdesc(res.data.desc);
      // setfile(res.data.file);
      setcats(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const delcat = (i) => {
    let modified = [...cats];
    modified.splice(i, 1); // Remove only one item at index i
    setcats(modified);
  };

  const addcat = () => {
    if (cat === "") return;

    setcats((prevCats) => [...prevCats, cat]);
    setcat("");
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    setloader(true);
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    if (file) {
      const data = new FormData();
      data.append("image", file);
      console.log(file);
      console.log(data);

      try {
        const imgUpload = await axios.post(url + "/api/upload", data);
        console.log(imgUpload.data.data.url);
        post.photo = imgUpload.data.data.url;
      } catch (err) {
        console.log(err);
      }
    }
    //post
    try {
      const res = await axios.put(url + "/api/posts/" + postid, post, {
        withCredentials: true,
      });
      console.log(res.data);
      setloader(false);
      navigator("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {!loader ? (
        <div className="px-6 md:px-[200px] mt-8">
          <h1 className="font-bold md:text-2xl text-xl mt-8">Edit the post</h1>
          <form
            className="flex flex-col space-y-4 md:space-y-8 w-full mt-4"
            action=""
          >
            <input
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              className="outline-none px-4 py-2"
              type="text"
              placeholder="Enter post title"
            />
            <input
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              className="px-4"
              type="file"
              placeholder="Enter post title"
            />

            {/* category */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-8">
                <input
                  onChange={(e) => setcat(e.target.value)}
                  className="outline-none px-4 py-2"
                  type="text"
                  placeholder="Enter post category"
                />
                <div
                  onClick={addcat}
                  className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                >
                  Add
                </div>
              </div>
              <div className="flex mt-3 px-4">
                {cats?.map((p, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 rounded-md px-2 py-1"
                  >
                    <p>{p}</p>
                    <div
                      onClick={() => delcat(i)}
                      className="text-white bg-black rounded-full cursor-pointer text-sm p-1"
                    >
                      <ImCross />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <textarea
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
              rows={15}
              cols={30}
              className="outline-none px-4 py-2"
              placeholder="Enter the description"
            ></textarea>
            <button
              onClick={handleupdate}
              className="bg-black w-full md:w-[20%] mx-auto px-4 py-2 text-white md:text-xl text-lg font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="h-[50vh] flex justify-center items-center">
          <Loader />
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};
export default Updatepost;
