import { useState } from "react";
import { Input } from "../Input";
import { LoadingButton } from "../LoadingButton";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type EmailProps = {
  onSubmit: (email: string) => void;
  isLoading: boolean;
};

export function EmailStep({ onSubmit, isLoading }: EmailProps) {
  const backgroundColor = useThemeColor({}, "background");

  const [email, setEmail] = useState("");

  return (
    <>
      <Input
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <LoadingButton onPress={() => onSubmit(email)} isLoading={isLoading}>
        <ThemedText
          style={{
            color: backgroundColor,
          }}
          type="defaultSemiBold"
        >
          Confirmar
        </ThemedText>
      </LoadingButton>
    </>
  )
}
