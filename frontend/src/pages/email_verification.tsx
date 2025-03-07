import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { verifySchema } from "@/schemas/authschema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiResponse } from "@/types/api-success-type";
import { AxiosError } from "axios";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hexagon } from "lucide-react";
import { Axios } from "@/config/axios";

const OTPVerification = () => {
  const navigate = useNavigate();
  const params = useParams<{ email: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    mode: "onChange",
    defaultValues: {
      email: params.email,
      code: "",
    },
  });

  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    form.setValue("code", value);
  };

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setLoading(true);
    try {
      const response = await Axios.post(`/api/auth/email-verification`, {
        email: params.email,
        code: data.code,
      });

      toast.success(response.data.message || "Account verified successfully.");

      navigate("/signin");
    } catch (error) {
      console.error("Error during sign-up:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ??
        "There was a problem with your sign-up. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-52 min-h-screen">
      <div className="flex flex-col justify-center items-center h-full ">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-primary p-3 rounded-xl dark:bg-primary-dark">
                <Hexagon className="w-6 h-6 text-primary-foreground dark:text-primary-dark-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center dark:text-white">
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-center dark:text-gray-300">
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="code" className="block font-semibold text-lg">
                  Enter OTP
                </label>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otpValue}
                  onChange={handleOtpChange}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {form.formState.errors.code && (
                  <p className="text-red-600">
                    {form.formState.errors.code.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  variant="default"
                  className="px-2"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;
