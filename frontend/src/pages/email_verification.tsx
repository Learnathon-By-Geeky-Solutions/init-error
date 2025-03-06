import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Hexagon,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OTP_LENGTH = 6;

export function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    const enteredOtp = otp.join("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (enteredOtp === "123456") {
      // Example correct OTP
      setNotification({
        type: "success",
        message: "Verification successful! Redirecting...",
      });
    } else {
      setNotification({
        type: "error",
        message: "Invalid OTP. Please try again.",
      });
    }
    setIsVerifying(false);
  };

  const handleResend = () => {
    setOtp(new Array(OTP_LENGTH).fill(""));
    setActiveInput(0);
    setResendCountdown(30);
    setNotification({
      type: "success",
      message: "A new OTP has been sent to your email.",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-white">
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
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-2xl font-semibold ${
                  activeInput === index
                    ? "border-primary"
                    : "dark:border-primary-dark"
                } focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 dark:bg-gray-700 dark:text-white`}
              />
            ))}
          </div>
          {notification.type && (
            <Alert
              variant={
                notification.type === "success" ? "default" : "destructive"
              }
              className={`mb-4 ${
                notification.type === "success"
                  ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-200 dark:border-green-700"
                  : ""
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full dark:bg-slate-600 dark:text-white dark:hover:bg-green-800"
            disabled={isVerifying || otp.some((digit) => !digit)}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying
              </>
            ) : (
              <>
                Verify <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="link"
          onClick={handleResend}
          disabled={resendCountdown > 0}
          className="dark:text-white"
        >
          {resendCountdown > 0
            ? `Resend in ${resendCountdown}s`
            : "Resend Code"}
        </Button>
      </CardFooter>
    </Card>
  );
}
