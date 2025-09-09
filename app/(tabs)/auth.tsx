import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Step, useSendOtp } from "@/hooks/supabase/sendOtp";
import { LoadingButton } from "@/components/LoadingButton";
import { Input } from "@/components/Input";
import { OtpField } from "@/components/OtpField";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const backgroundColor = useThemeColor({}, "background");

  const { isLoading, sendOtp, step } = useSendOtp();

  const handleSubmit = () => {
    sendOtp(email);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Iniciar sesión
      </ThemedText>

      {step === Step.EMAIL ? (
        <Input
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      ) : (
        <OtpField />
      )}

      <LoadingButton onPress={handleSubmit} isLoading={isLoading}>
        <ThemedText
          style={{
            color: backgroundColor,
          }}
          type="defaultSemiBold"
        >
          Confirmar
        </ThemedText>
      </LoadingButton>
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
