import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/comments";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const mainComment = comments.filter((comment) => comment.parent === null);

  useEffect(() => {
    (async () => {
      const commnetData = await getCommentsData();
      setComments(commnetData);
    })();
  }, []);

  const formSubmitHanlder = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: comments.length + 1,
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: { value },
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };

    setComments([...comments, newComment]);
  };

  return (
    <div>
      <CommentForm btnLabel={"Send"} formSubmitHanlder={formSubmitHanlder} />
      <div className="space-y-4 mt-8">
        {mainComment.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
