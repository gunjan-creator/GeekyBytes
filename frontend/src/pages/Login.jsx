import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { z } from "zod";
import { url } from "../../url";
import { useContext, useState } from "react";
import { Usercontext } from "../context/Usercontext";
import Loader from "../components/Loader";
const Login = () => {
  const [email, setemail] = useState("");
  const [loader, setloader] = useState(false);
  const [msg, setmsg] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  const { setuser } = useContext(Usercontext);
  const handlesubmit = async () => {
    const registerSchema = z.object({
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    });

    if (!email || !password) {
      seterror(true);
      setmsg("Fill all fields");
      return;
    }
    // Validate form data
    const formData = { email, password };
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      seterror(true);

      setmsg(result.error.issues[0].message);
      return;
    }

    try {
      setloader(true);
      const res = await axios.post(
        url + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setuser(res.data);
      console.log("login done");
      seterror(false);
      navigate("/");
    } catch (err) {
      setmsg("User does not exist.");
      seterror(true);
      setloader(false);
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex text-white bg-black items-center justify-between px-6 md:px-[200px] py-5">
        <h1 className="text-xl font-extrabold">
          <Link className="font-serif text-white text-2xl" to="/">
            GeekyBytes
          </Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        {!loader ? (
          <div className="flex flex-col justify-center items-center space-y-4 w-[50%] md:w-[25%]">
            <h1 className="text-xl font-bold text-left ">
              Login to your account
            </h1>
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="px-4 py-2 w-full border-2 border-black outline-0"
              placeholder="Enter your email"
              type="text"
            />
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="px-4 py-2 w-full border-2 border-black outline-0"
              placeholder="Enter your password"
              type="text"
            />
            <button
              onClick={handlesubmit}
              className="w-full py-4 px-4 text-lg font-bold bg-black text-white  rounded-lg hover:bg-slate-700 "
            >
              Login
            </button>
            {error && <h3 className="text-red-500 text-sm">{msg}</h3>}
            <div className="flex justify-center items-center space-x-3">
              <p>New here</p>
              <p className=" text-gray-500 hover:text-black">
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
      {/* <Footer />/ */}
    </>
  );
};
export default Login;
