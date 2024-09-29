import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

import { formSignIn, formSignInType } from "@/schemas/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// export type SignInFormData = {
//   email: string;
//   password: string;
// };

// const SignIn = () => {
//   const { showToast } = useAppContext();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const location = useLocation();

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<SignInFormData>();

//   const mutation = useMutation(apiClient.signIn, {
//     onSuccess: async () => {
//       showToast({ message: "Sign in Successful!", type: "SUCCESS" });
//       await queryClient.invalidateQueries("validateToken");
//       navigate(location.state?.from?.pathname || "/");
//     },
//     onError: (error: Error) => {
//       showToast({ message: error.message, type: "ERROR" });
//     },
//   });

//   const onSubmit = handleSubmit((data) => {
//     mutation.mutate(data);
//   });

//   return (
//     <form className="flex flex-col gap-5" onSubmit={onSubmit}>
//       <h2 className="text-3xl font-bold">Sign In</h2>
//       <label className="text-gray-700 text-sm font-bold flex-1">
//         Email
//         <input
//           type="email"
//           className="border rounded w-full py-1 px-2 font-normal"
//           {...register("email", { required: "This field is required" })}
//         ></input>
//         {errors.email && (
//           <span className="text-red-500">{errors.email.message}</span>
//         )}
//       </label>
//       <label className="text-gray-700 text-sm font-bold flex-1">
//         Password
//         <input
//           type="password"
//           className="border rounded w-full py-1 px-2 font-normal"
//           {...register("password", {
//             required: "This field is required",
//             minLength: {
//               value: 6,
//               message: "Password must be at least 6 characters",
//             },
//           })}
//         ></input>
//         {errors.password && (
//           <span className="text-red-500">{errors.password.message}</span>
//         )}
//       </label>
//       <span className="flex items-center justify-between">
//         <span className="text-sm">
//           Not Registered?{" "}
//           <Link className="underline" to="/register">
//             Create an account here
//           </Link>
//         </span>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
//         >
//           Login
//         </button>
//       </span>
//     </form>
//   );
// };

// export default SignIn;

export default function SignIn() {
  const form = useForm<formSignInType>({
    resolver: zodResolver(formSignIn),
    mode: "onSubmit",
  });
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleSubmit = (values: formSignInType) => {
    mutation.mutate(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="text-sm block">
            <Link className="underline" to="/register">
              Create an account here
            </Link>
          </span>
          <Button
            type="submit"
            className="mt-4 w-[100px]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
