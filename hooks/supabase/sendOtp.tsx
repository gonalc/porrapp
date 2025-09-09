import { supabase } from "@/services/supabase";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

export enum Step {
  EMAIL,
  OTP,
}

export const useSendOtp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<Step>(Step.EMAIL);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendOtp = useCallback(async (email: string) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (!error) {
      setStep(Step.OTP);
    }

    setEmail(email);

    setIsLoading(false);
  }, []);

  const verifyOtp = useCallback(
    async (otp: string) => {
      setIsLoading(true);

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (!error) {
        return router.replace("/");
      }

      setErrorMessage("El código es inválido. Por favor, inténtalo de nuevo.");

      setIsLoading(false);
    },
    [email, router],
  );

  return { sendOtp, isLoading, otp, setOtp, step, verifyOtp, errorMessage };
};
