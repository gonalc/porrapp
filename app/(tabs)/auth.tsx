import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { Step, useSendOtp } from "@/hooks/supabase/sendOtp";
import { EmailStep } from "@/components/auth/EmailStep";
import { OtpStep } from "@/components/auth/OtpStep";

export default function AuthPage() {
  const { isLoading, sendOtp, step, verifyOtp, errorMessage } = useSendOtp();

  const renderStep = () => {
    if (step === Step.EMAIL) {
      return <EmailStep onSubmit={sendOtp} isLoading={isLoading} />;
    } else {
      return (
        <OtpStep
          onSubmit={verifyOtp}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Iniciar sesión
      </ThemedText>

      {renderStep()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginBottom: 40,
  },
});
