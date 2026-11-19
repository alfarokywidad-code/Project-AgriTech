import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

function Error() {

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6">

      <Leaf size={55} className="text-green-700"/>

      <h1 className="text-8xl font-extrabold text-green-700 mt-6">
        404
      </h1>

      <h2 className="text-2xl font-bold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-3">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="bg-green-700 text-white px-7 py-3 rounded-xl mt-7"
      >
        Back to Home
      </Link>

    </div>
  );
}

export default Error;