import { supabase } from "@/services/supabase";
import { useCallback, useState } from "react";

export enum Step {
  EMAIL,
  OTP,
}

export const useSendOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<Step>(Step.EMAIL);

  const sendOtp = useCallback(async (email: string) => {
    console.log("Sending OTP to", email);
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (!error) {
      setStep(Step.OTP);
    }

    setIsLoading(false);
  }, []);

  return { sendOtp, isLoading, otp, setOtp, step };
};
