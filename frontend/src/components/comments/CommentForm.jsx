/* eslint-disable react/prop-types */
import { useState } from "react";

const CommentForm = ({ btnLabel, formSubmitHanlder }) => {
  const [value, setValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHanlder(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler} className="mt-10">
      <div className="border-2 border-primary rounded-md p-4 flex flex-col items-end gap-2">
        <textarea
          className="w-full focus:outline-none border rounded-md p-2"
          rows="5"
          placeholder="Leave your comment here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-primary text-white rounded-md px-4 py-2 font-semibold capitalize"
          type="submit"
        >
          {btnLabel}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
