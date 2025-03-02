import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserDetails from "@/components/dashboard/UserDetails";
import EditProfile from "@/components/dashboard/EditProfile";
import UserPassword from "@/components/dashboard/UserPassword";
import { Button } from "@/components/ui/button";

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState("User Details");

  const menuItems = [
    "User Details",
    "Edit Profile",
    "Password",
    "Social Profiles",
    "Company",
    "Email Notifications",
  ];

  return (
    <div className="flex flex-col lg:flex-row pl-4 lg:pl-20 min-h-screen">
      {/* Mobile Navigation */}
      <div className="lg:hidden p-4">
        <Select onValueChange={(value) => setActiveTab(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={activeTab} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {menuItems.map((item) => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="mt-6" variant="destructive">Delete Account</Button>
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:block w-64 p-6 mt-10">
        <nav className="space-y-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item}
                className={`cursor-pointer text-[15px] ${
                  activeTab === item ? "text-black dark:text-slate-100 font-semibold" : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </li>
            ))}
          </ul>
          <Button className="mt-6" variant="destructive">Delete Account</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 w-full">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/avatar.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">Ajor Saha / {activeTab}</h1>
            <p className="text-gray-500">Update your username and manage your account</p>
          </div>
        </div>

        {/* Dynamic Content */}
        {activeTab === "User Details" && <UserDetails />}
        {activeTab === "Edit Profile" && <EditProfile />}
        {activeTab === "Password" && <UserPassword />}
        
      </main>
    </div>
  );
};

export default UserAccount;
