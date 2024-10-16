import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { url } from "../../url";
import Loader from "../components/Loader";
const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [msg, setmsg] = useState("");
  const [loader, setloader] = useState(false);
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async () => {
    setloader(true);
    const registerSchema = z.object({
      username: z.string().min(1, "Username is required"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    });

    if (!username || !email || !password) {
      seterror(true);
      setmsg("Fill all fields");
      return;
    }
    // Validate form data
    const formData = { username, email, password };
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      seterror(true);

      setmsg(result.error.issues[0].message);
      return;
    }

    try {
      const res = await axios.post(url + "/api/auth/register", {
        username,
        email,
        password,
      });
      setusername(res.data.username);
      setemail(res.data.email);
      setpassword(res.data.password);
      seterror(false);
      setloader(false);
      navigate("/login");
    } catch (err) {
      setloader(false);
      seterror(true);
      setmsg("Same Username or email already exist.");
      console.log("axios m dikkt h");
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
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        {!loader ? (
          <div className="flex flex-col justify-center items-center space-y-4 w-[50%] md:w-[25%]">
            <h1 className="text-xl font-bold text-left ">Create an account</h1>
            <input
              onChange={(e) => {
                setusername(e.target.value);
              }}
              className="px-4 py-2 w-full border-2 border-black outline-0"
              placeholder="Enter your username"
              type="text"
            />
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
              Register
            </button>
            {error && <h3 className="text-red-500 text-sm">{msg}</h3>}
            <div className="flex justify-center items-center space-x-3">
              <p>Already registered</p>
              <p className=" text-gray-500 hover:text-black">
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Register;
