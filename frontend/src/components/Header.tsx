import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
<<<<<<< HEAD
import SignOutButton from "./SignOutButton";
=======
>>>>>>> d68f400f264de458e977ce877b8a8fbe9035a219


const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-green-600 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">AAA.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
<<<<<<< HEAD
              <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600"
=======
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
>>>>>>> d68f400f264de458e977ce877b8a8fbe9035a219
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
<<<<<<< HEAD
=======
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
>>>>>>> d68f400f264de458e977ce877b8a8fbe9035a219
                to="/my-hotels"
              >
                My Hotels
              </Link>
<<<<<<< HEAD
              <SignOutButton />
=======
>>>>>>> d68f400f264de458e977ce877b8a8fbe9035a219
              
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
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