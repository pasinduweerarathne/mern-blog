/* eslint-disable react/prop-types */
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import images from "../../constants/images";

const Comment = ({ comment }) => {
  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] rounded-lg">
      <img
        src={images.postProfile}
        alt="userProfile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        <p className="font-opensans mt-[10px] text-dark-light">
          {comment.desc}
        </p>
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm my-3">
          <button className="flex items-center space-x-2 border-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-white hover:bg-primary hover:border-primary">
            <FiMessageSquare className="w-4 h-auto" />
            <span>Reply</span>
          </button>
          <button className="flex items-center space-x-2 border-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-white hover:bg-yellow-500 hover:border-yellow-500">
            <FiEdit2 className="w-4 h-auto" />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2 border-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-white hover:bg-red-600 hover:border-red-600">
            <FiTrash className="w-4 h-auto" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
