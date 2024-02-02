import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col">
      Not Found{" "}
      <Link to="/" className="underline">
        Go Back To Home Page
      </Link>
    </div>
  );
};

export default Error404;
