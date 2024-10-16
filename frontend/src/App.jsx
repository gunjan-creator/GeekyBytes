import { Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Postdetails from "./pages/Postdetails";
import Createpost from "./pages/Createpost";
import Updatepost from "./pages/Updatepost";
import Profile from "./pages/Profile";
import { UsercontextProvider } from "./context/Usercontext";

function App() {
  return (
    <UsercontextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts/post/:id" element={<Postdetails />} />
        <Route exact path="/write" element={<Createpost />} />
        <Route exact path="/edit/:id" element={<Updatepost />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>

      <Footer />
    </UsercontextProvider>
  );
}

export default App;
