import { useThemeColor } from "@/hooks/useThemeColor";
import { LoadingButton } from "../LoadingButton";
import { OtpField } from "../OtpField";
import { ThemedText } from "../ThemedText";
import { useState } from "react";
import { StyleSheet } from "react-native";

type OtpProps = {
  onSubmit: (otp: string) => void;
  isLoading: boolean;
  errorMessage?: string | null;
};

export function OtpStep({ onSubmit, isLoading, errorMessage }: OtpProps) {
  const backgroundColor = useThemeColor({}, "background");
  const warningColor = useThemeColor({}, "warning");

  const [otpValue, setOtpValue] = useState("");

  return (
    <>
      <OtpField onChange={setOtpValue} />

      {errorMessage && (
        <ThemedText
          type="defaultSemiBold"
          style={[
            styles.errorMessage,
            {
              color: warningColor,
            },
          ]}
        >
          {errorMessage}
        </ThemedText>
      )}

      <LoadingButton onPress={() => onSubmit(otpValue)} isLoading={isLoading}>
        <ThemedText
          style={{
            color: backgroundColor,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Confirmar
        </ThemedText>
      </LoadingButton>
    </>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    marginBottom: 16,
  },
});
