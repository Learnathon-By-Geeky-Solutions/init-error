import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpIcon from "@/assets/sign-up.avif";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema, SignupValues } from "@/types/authschema";
import useAuthStore from "@/store/authstore";

function SignupPage() {
  const isLoading = useAuthStore().loading;
  const signup = useAuthStore().signup;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupValues) => {
    setErrorMessage(null);
    const response = await signup(values);

    if (response.status) {
      navigate("/signin");
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-500 flex flex-col items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-4xl p-8 bg-[#0A1124] rounded-lg shadow-xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Welcome</h2>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <img
                src={signUpIcon || "/placeholder.png"}
                alt="SignUp"
                className="w-full h-auto max-h-[400px] object-contain"
              />
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-start text-sm font-medium text-gray-200"
                >
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-start text-sm font-medium text-gray-200"
                >
                  Username
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter username"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-start text-sm font-medium text-gray-200"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md
                   text-white placeholder-gray-400 focus:outline-none
                    focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-start text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md
                   text-white placeholder-gray-400 focus:outline-none
                    focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
              {errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
              )}
              <div className="text-center">
                <span className="text-sm text-white">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/signin"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
