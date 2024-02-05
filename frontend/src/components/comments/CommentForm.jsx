/* eslint-disable react/prop-types */
import { useState } from "react";

const CommentForm = ({ btnLabel, formSubmitHanlder, formCancelHandler, initialText = "" }) => {
  const [value, setValue] = useState(initialText);

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
        <div className="flex items-center gap-x-2 pt-2">
          {formCancelHandler && (
            <button
              className="px-4 py-2 rounded-lg border border-red-500 text-red-500 font-semibold"
              onClick={formCancelHandler}
            >
              Cancel
            </button>
          )}
          <button
            className="bg-primary text-white rounded-md px-4 py-2 font-semibold capitalize"
            type="submit"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
