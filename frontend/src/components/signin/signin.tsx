import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import signInIcon from "../../../public/signin.avif";
const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type ContactValues = z.infer<typeof contactSchema>;

function Signin() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactValues) => {
    setIsLoading(true);
    console.log("Form submitted:", values);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section className="min-h-screen bg-gray-100  dark:bg-gray-500 flex flex-col items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-4xl p-8 bg-[#0A1124] rounded-lg shadow-xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md
                 hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Sign in"}
              </button>
              <div className="text-center">
                <span className="text-sm text-white">
                  Don't have an account?{" "}
                </span>
                <a href="/" className="text-blue-500 hover:underline text-sm">
                  Register here
                </a>
              </div>
            </form>
          </div>
          {/* Right Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Welcome</h2>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <img
                src={signInIcon || "/placeholder.png"}
                alt="SignUp"
                className="w-full h-auto max-h-[400px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
