import { useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Usercontext } from "../context/Usercontext";
import axios from "axios";
import { url } from "../../url";
const Comments = ({ c, fetchcomment }) => {
  const { user } = useContext(Usercontext);
  // console.log(c);

  const deletecomment = async () => {
    try {
      const res = await axios.delete(url + "/api/comments/" + c._id, {
        withCredentials: true,
      });
      console.log(res.data);
      fetchcomment();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-2 my-2 py-2 bg-gray-200 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-600 ">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === c.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p className="cursor-pointer" onClick={deletecomment}>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 my-2">{c.comment}</p>
    </div>
  );
};
export default Comments;
