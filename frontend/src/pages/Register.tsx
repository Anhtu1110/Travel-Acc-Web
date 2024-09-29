// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "react-query";
// import * as apiClient from "../api-client";
// import { useAppContext } from "../contexts/AppContext";
// import { useNavigate } from "react-router-dom";

// export type RegisterFormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

// const Register = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { showToast } = useAppContext();

//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>();

//   const mutation = useMutation(apiClient.register, {
//     onSuccess: async () => {
//       showToast({ message: "Registration Success!", type: "SUCCESS" });
//       await queryClient.invalidateQueries("validateToken");
//       navigate("/");
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
//       <h2 className="text-3xl font-bold">Create an Account</h2>
//       <div className="flex flex-col md:flex-row gap-5">
//         <label className="text-gray-700 text-sm font-bold flex-1">
//           First Name
//           <input
//             className="border rounded w-full py-1 px-2 font-normal"
//             {...register("firstName", { required: "This field is required" })}
//           ></input>
//           {errors.firstName && (
//             <span className="text-red-500">{errors.firstName.message}</span>
//           )}
//         </label>
//         <label className="text-gray-700 text-sm font-bold flex-1">
//           Last Name
//           <input
//             className="border rounded w-full py-1 px-2 font-normal"
//             {...register("lastName", { required: "This field is required" })}
//           ></input>
//           {errors.lastName && (
//             <span className="text-red-500">{errors.lastName.message}</span>
//           )}
//         </label>
//       </div>
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
//       <label className="text-gray-700 text-sm font-bold flex-1">
//         Confirm Password
//         <input
//           type="password"
//           className="border rounded w-full py-1 px-2 font-normal"
//           {...register("confirmPassword", {
//             validate: (val) => {
//               if (!val) {
//                 return "This field is required";
//               } else if (watch("password") !== val) {
//                 return "Your passwords do no match";
//               }
//             },
//           })}
//         ></input>
//         {errors.confirmPassword && (
//           <span className="text-red-500">{errors.confirmPassword.message}</span>
//         )}
//       </label>
//       <span>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
//         >
//           Create Account
//         </button>
//       </span>
//     </form>
//   );
// };

// export default Register;
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  formRegisterBusiness,
  formRegisterBusinessType,
  formRegisterPersonal,
  formRegisterPersonalType,
} from "@/schemas/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// export default SignIn;

export default function SignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const formPersonal = useForm<formRegisterPersonalType>({
    resolver: zodResolver(formRegisterPersonal),
    mode: "onSubmit",
  });
  const formBusiness = useForm<formRegisterBusinessType>({
    resolver: zodResolver(formRegisterBusiness),
    mode: "onSubmit",
  });
  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleSubmitPersonal = (formData: formRegisterPersonalType) => {
    console.log({ ...formData, type: "personal" });
    mutation.mutate({ formData, type: "personal" });
  };
  const handleSubmitBusiness = (formData: formRegisterBusinessType) => {
    console.log({ ...formData, type: "business" });
    mutation.mutate({ formData, type: "business" });
  };
  return (
    <div className="w-full flex items-center justify-center">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal</CardTitle>
              <CardDescription>
                Enjoy your holiday with MernHoliday
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...formPersonal}>
                <form
                  onSubmit={formPersonal.handleSubmit(handleSubmitPersonal)}
                  className="grid grid-cols-4 gap-x-5"
                >
                  <FormField
                    control={formPersonal.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl className="">
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
                    control={formPersonal.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Last Name</FormLabel>
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
                    control={formPersonal.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-4">
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
                    control={formPersonal.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <FormLabel>Password</FormLabel>
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
                    control={formPersonal.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <FormLabel>Confirm Password</FormLabel>
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
                  <span className="text-sm col-span-4">
                    <Link className="underline" to="/sign-in">
                      Sign in here
                    </Link>
                  </span>
                  <Button
                    type="submit"
                    className="mt-4 col-start-1 col-end-2"
                    disabled={formPersonal.formState.isSubmitting}
                  >
                    {formPersonal.formState.isSubmitting ? (
                      <ImSpinner2 className="animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business</CardTitle>
              <CardDescription>
                Become one of MernHoliday's partners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...formBusiness}>
                <form
                  onSubmit={formBusiness.handleSubmit(handleSubmitBusiness)}
                >
                  <FormField
                    control={formBusiness.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
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
                    control={formBusiness.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email</FormLabel>
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
                    control={formBusiness.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
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
                    control={formBusiness.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
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
                    control={formBusiness.control}
                    name="businessPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Phone Number</FormLabel>
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
                    control={formBusiness.control}
                    name="businessAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
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
                    control={formBusiness.control}
                    name="businessRegistrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Registration Number</FormLabel>
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
                    control={formBusiness.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website(Optional)</FormLabel>
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
                    control={formBusiness.control}
                    name="representativeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Representative Name</FormLabel>
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
                  <span className="text-sm block">
                    <Link className="underline" to="/sign-in">
                      Sign in here
                    </Link>
                  </span>
                  <Button
                    type="submit"
                    className="mt-4"
                    disabled={formBusiness.formState.isSubmitting}
                  >
                    {formBusiness.formState.isSubmitting ? (
                      <ImSpinner2 className="animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
