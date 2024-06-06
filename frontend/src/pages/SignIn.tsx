import { useForm } from "react-hook-form";
import { useMutation, } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";



export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();
    const { showToast } = useAppContext(); 
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async() => {
            showToast({ message:"Sign in successful", type: "success"})
            await queryClient.validate
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "error" });
          },
        });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data); 
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3x1 font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-10 ">
        Email
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            {...register("email", {required:"This field is required"})}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-10 ">
        Password
        <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            {...register("password", 
            {required:"This field is required",
            minLength: {value: 6, message: "Minimum length should be 6"},
            })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </label>
        <span>
        <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-x1 focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Login
        </button>
        </span>
        </form>
    )
};

export default SignIn;
