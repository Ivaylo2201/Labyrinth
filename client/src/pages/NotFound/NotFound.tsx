import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl">Page not found</p>
      <Link to="/" className="mt-10 px-4 py-2 bg-blue-500 text-white rounded-md">
        Go back home
      </Link>
    </div>
  );
}
