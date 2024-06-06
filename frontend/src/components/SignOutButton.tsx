import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
const mutation = useMutation(apiClient.signOut, {

    onSuccess: () => {
        showToast({message: "Sign out successful", type: "SUCCESS"});
    },
    onError: (error: Error) => {
        showToast({message: error.message, type: "ERROR"});
    },
});

const handleClick = () => {
    mutation.mutate();
}
    return (
        <button
            onClick={handleClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 font-bold"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;