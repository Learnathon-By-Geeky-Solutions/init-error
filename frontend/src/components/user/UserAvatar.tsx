import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Axios } from "@/config/axios";
import { toast } from "sonner";
import useAuthStore, { User } from "@/store/authstore";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api-success-type";

export default function UserAvatar({ currentUser }: { currentUser: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const signout = useAuthStore().logout;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await Axios.post(`/api/auth/signout`);
      toast.success(response.data.message || "Logout Successful.");
    } catch (error) {
      console.error("Error during sign-up:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ??
        "There was a problem with your sign-up. Please try again.";
      toast.error(errorMessage);
    } finally {
      signout();
      setIsSubmitting(false);
      navigate("/");
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          className="flex items-center space-x-2 cursor-pointer"
          title="Open profile"
          to="/account/profile"
        >
          <Avatar className="w-10 h-10 border border-gray-300">
            <AvatarImage
              src={
                currentUser.avatar ||
                "https://cdn.dribbble.com/assets/default_avatars/default-avatar-gradient-6-1bcd5bcdef7db953ab81f230f3aa6f908e9ed65905766e6a06433c4a6c038d00.png"
              }
            />
            <AvatarFallback>{currentUser.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        className="w-64 bg-background/60 shadow-md rounded-lg p-3 z-50"
      >
        <div className="flex flex-col items-center">
          <Avatar className="w-12 h-12 border border-gray-300">
            <AvatarImage src={currentUser.avatar!!} />
            <AvatarFallback>{currentUser.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full flex justify-center">
            <h4 className="text-sm mt-4 font-semibold">
              {currentUser.firstName}
            </h4>
          </div>
        </div>

        <nav className="mt-3 space-y-2">
          <Link
            to="#"
            className="block text-sm hover:text-foreground/60 p-2 rounded"
          >
            Settings
          </Link>
          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              variant="destructive"
              className="w-full hover:text-foreground/80 text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Out"
              )}
            </Button>
          </form>
        </nav>
      </HoverCardContent>
    </HoverCard>
  );
}
