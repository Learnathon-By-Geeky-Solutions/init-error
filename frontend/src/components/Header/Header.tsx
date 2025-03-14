import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/authstore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import UserAvatar from "../user/UserAvatar";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useAuthStore().user;
  // shadow-md dark:bg-gray-800 pb-2
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Left Side: Project Name */}
        <Link to="/" className="md:text-xl text-lg font-semibold font-serif">
          Project Sphere
        </Link>

        {/* Center: Navigation Links (Hidden in Mobile) */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            About
          </a>
          <a href="#" className="hover:text-gray-300">
            Services
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
        </nav>

        {/* Right Side: Login (md+) & Theme Toggle */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <UserAvatar currentUser={currentUser} />
          ) : (
            <Button className="hidden md:block rounded-full md:px-6 lg:px-8 xl:px-10">
              <Link to="/signin">Login</Link>
            </Button>
          )}
          {/* Mode Toggle */}
          <ModeToggle />

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Includes Login) */}
      {isOpen && (
        <div className="md:hidden dark:bg-gray-800 p-4 space-y-2">
          <a href="#" className="block py-2">
            Home
          </a>
          <a href="#" className="block py-2">
            About
          </a>
          <a href="#" className="block py-2">
            Services
          </a>
          <a href="#" className="block py-2">
            Contact
          </a>
          {currentUser ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{currentUser.firstName}</AvatarFallback>
            </Avatar>
          ) : (
            <button className="w-full mt-2 px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 bg-gray-800 hover:bg-gray-900 text-white rounded-md">
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
