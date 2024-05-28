import { Link } from "react-router-dom";
const Header = () => {
    return ( 
    <div className="bg-green-600 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3x1 text-white font-bold tracking-tight">
                <Link to="/">AAA.com</Link>
            </span>
            <span className="flex space-x-2"></span>
            <Link
                to="/sign-in"
                className="flex bg-white items-center justify-center text-green-600 px3 font-bold hover:bg-black-100">
                    Sign in 
            </Link>
        </div>
    </div>
    );
};

export default Header;