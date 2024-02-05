/* eslint-disable react/prop-types */
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import images from "../../constants/images";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  loggedUserId,
  affectedComment,
  setAffectedComment,
  parentId = null,
  addComment,
  updateComment,
  deleteComment,
  replies
}) => {
  const isUserLoggin = Boolean(loggedUserId);
  const commentBelongsToUser = loggedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommnetId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] rounded-lg p-3">
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
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}
        {isEditing && (
          <CommentForm btnLabel={"Update"} formSubmitHanlder={(value) => updateComment(value, comment._id)} initialText={comment.desc} formCancelHandler={() => setAffectedComment(null)} />
        )}
        <div className="flex flex-col text-dark-light font-roboto text-sm my-3">
          <div className="flex gap-2">
            {isUserLoggin && (
              <button
                className="flex items-center space-x-2 border-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-white hover:bg-primary hover:border-primary"
                onClick={() =>
                  setAffectedComment({ type: "replying", _id: comment._id })
                }
              >
                <FiMessageSquare className="w-4 h-auto" />
                <span>Reply</span>
              </button>
            )}
            {commentBelongsToUser && (
              <>
                <button
                  className="flex items-center space-x-2 border-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-white hover:bg-yellow-500 hover:border-yellow-500"
                  onClick={() =>
                    setAffectedComment({ type: "editing", _id: comment._id })
                  }
                >
                  <FiEdit2 className="w-4 h-auto" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center space-x-2 border-2 px-2 py-1 rounded-md transition-all duration-300 hover:text-white hover:bg-red-600 hover:border-red-600"
                  onClick={() =>
                    deleteComment(comment._id)
                  }
                >
                  <FiTrash className="w-4 h-auto" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
          {isReplying && (
            <CommentForm
              btnLabel={"Reply"}
              formSubmitHanlder={(value) =>
                addComment(value, repliedCommnetId, replyOnUserId)
              }
              formCancelHandler={() => setAffectedComment(null)}
            />
          )}
          {replies.length > 0 && (
            <div>
              {replies.map(reply => {
                return (
                  <Comment
                    key={reply._id}
                    loggedUserId={loggedUserId}
                    affectedComment={affectedComment}
                    setAffectedComment={setAffectedComment}
                    comment={reply}
                    replies={[]}
                    parentId={comment._id}
                    addComment={addComment}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
