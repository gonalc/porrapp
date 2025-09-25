import { useSession } from "@/contexts/session";
import { supabase } from "@/services/supabase";
import { type AuthSession } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

export enum Step {
  EMAIL,
  OTP,
}

const TEST_USER_EMAIL = "test@example.com";

export const useSendOtp = () => {
  const router = useRouter();
  const { setSession } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<Step>(Step.EMAIL);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginWithTestUser = useCallback(
    async () => {
      const { error, data: session } = await supabase.auth.signInAnonymously();

      if (!error && !!session.user) {
        setSession(session as unknown as AuthSession);
        return router.replace("/");
      }

      console.error("Error in with test user: ", error);

      setIsLoading(false);
    },
    [setSession, router],
  );

  const sendOtp = useCallback(async (email: string) => {
    setIsLoading(true);

    if (email === TEST_USER_EMAIL) {
      await loginWithTestUser();
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });



    if (!error) {
      setStep(Step.OTP);
    }

    setEmail(email);

    setIsLoading(false);
  }, [loginWithTestUser]);

  const verifyOtp = useCallback(
    async (otp: string) => {
      setIsLoading(true);

      const {
        error,
        data: { session },
      } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (!error) {
        setSession(session);
        return router.replace("/");
      }

      setErrorMessage("El código es inválido. Por favor, inténtalo de nuevo.");

      setIsLoading(false);
    },
    [email, router, setSession],
  );

  return { sendOtp, isLoading, otp, setOtp, step, verifyOtp, errorMessage };
};
