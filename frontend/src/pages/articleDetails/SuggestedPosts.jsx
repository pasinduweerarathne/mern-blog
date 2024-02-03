/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const SuggestedPosts = ({ header, postData, tags }) => {
  return (
    <div
      className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4`}
    >
      <h2 className="font-roboto font-medium text-dark-hard text-2xl mb-5 text-center">
        {header}
      </h2>
      <div className="flex flex-col items-center gap-5">
        {postData.map((item) => (
          <div
            key={item._id}
            className="flex space-x-3 flex-nowrap justify-center"
          >
            <img
              className="aspect-square object-cover rounded-lg w-1/5"
              src={item.image}
              alt={item.title}
            />
            <div className="font-roboto text-dark-hard font-medium text-lg md:text-sm lg:text-lg">
              <h3 className="text-dark-hard line-clamp-1 font-bold md:max-w-[150px] lg:max-w-full">
                <Link to={`/blog/123`}>{item.title}</Link>
              </h3>
              <span className="opacity-60">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">
        Tags
      </h2>
      {tags.length === 0 ? (
        <p className="text-slate-500 text-xs mt-2">
          There is not tags for this post
        </p>
      ) : (
        <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
          {tags.map((item, index) => (
            <Link
              key={index}
              to="/"
              className="inline-block rounded-md px-3 py-1.5 bg-primary font-roboto text-xs text-white md:text-sm"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedPosts;
