/* eslint-disable react/prop-types */
import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/comments";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const CommentsContainer = ({ loggedUserId }) => {
  const [comments, setComments] = useState([]);
  const mainComment = comments.filter((comment) => comment.parent === null);
  const [affectedComment, setAffectedComment] = useState(null);
  console.log(comments)

  useEffect(() => {
    (async () => {
      const commnetData = await getCommentsData();
      setComments(commnetData);
    })();
  }, []);

  const addCommnetHanlder = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString()
    };

    setComments([...comments, newComment]);
    setAffectedComment(null)
  };

  const updateCommentHandler = (value, commentId) => {
    const updatedCommnet = comments.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, desc: value }
      }
      return comment
    })
    setComments(updatedCommnet)
    setAffectedComment(null)
  }

  const deleteCommentHandler = (commentId) => {
    setComments(comments.filter(comment => comment._id !== commentId))
  }

  const getRepliesHandler = (commentId) => {
    return comments.filter(comment => comment.parent === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }


  return (
    <div>
      <CommentForm btnLabel={"Send"} formSubmitHanlder={addCommnetHanlder} />
      <div className="space-y-4 mt-8">
        {mainComment.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loggedUserId={loggedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommnetHanlder}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={getRepliesHandler(comment._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
