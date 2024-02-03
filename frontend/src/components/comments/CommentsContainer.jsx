import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/comments";
import { useEffect, useState } from "react";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  console.log(comments);

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
    </div>
  );
};

export default CommentsContainer;
