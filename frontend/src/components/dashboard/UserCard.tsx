import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UserCard = () => {
  return (
    <div className="flex flex-col items-center p-6  w-full max-w-lg mx-auto">
      {/* Avatar */}
      <Avatar className="w-20 h-20 mb-4">
        <AvatarImage src="/avatar.png" alt="User Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      
      {/* User Info */}
      <div className="text-center w-full">
        <h2 className="text-lg font-semibold">Welcome, John Doe</h2>
        
        {/* Edit Button */}
        <Button className="mt-3 w-[100px] rounded-lg dark:bg-slate-600" variant="outline"><Link to="/account/profile">Edit</Link></Button>
      </div>
      
      {/* Other Components Below */}
      <div className="mt-6 w-full">
        {/* Place other components here */}
      </div>
    </div>
  )
}

export default UserCard
