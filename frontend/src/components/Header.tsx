import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn, type } = useAppContext();

  return (
    <div className="bg-green-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Hostopia.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              {type == "business" && (
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-green-600 rounded"
                  to="/my-hotels"
                >
                  My Hotels
                </Link>
              )}
              {type == "personal" && (
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-green-600 rounded"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-green-600 px-3 font-bold hover:bg-gray-100 rounded"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
