import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 lg:py-32 px-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl sm:text-5xl font-bold text-gray-900 dark:text-white">
        Welcome to Our Platform
      </h1>
      <p className="mt-4 text-sm lg:text-base w-[50%] lg:w-[30%] text-gray-600 dark:text-gray-300">
        Explore work from the most talented and accomplished designers ready to
        take on your next project
      </p>
      <div className="mt-6 relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search
          className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
          size={20}
        />
      </div>
    </section>
  );
}
