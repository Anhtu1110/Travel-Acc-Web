import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";


export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
   };


const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { 
        register,
        watch,
        handleSubmit,
        formState: { errors },
        } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async() => {
            showToast({message: "Registration Success!", type: "success"});
            await queryClient.invalidateQueries("validateToken")
            navigate("/")
        },
        onError: (error:Error) => {
            showToast({message: error.message, type: "error"});
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="John"
            {...register("firstName", {required:"This field is required"})}
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Doe"
            {...register("lastName", {required:"This field is required"})}
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </label>
      </div>
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
        <label className="text-gray-700 text-sm font-bold flex-10 ">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </label>
        <span>
        <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-x1 focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Register
        </button>
        </span>
    </form>
  );
};

export default Register;
