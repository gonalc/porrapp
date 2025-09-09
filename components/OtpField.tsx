import { createRef, useMemo,  useState } from "react";
import { ThemedView } from "./ThemedView";
import { Input } from "./Input";
import { StyleSheet, TextInput } from "react-native";

type OtpFieldProps = {
  digits?: number;
};

const DEFAULT_OTP_DIGITS = 6;

export function OtpField({ digits = DEFAULT_OTP_DIGITS }: OtpFieldProps) {
  const initialValues = useMemo(
    () => Array.from({ length: digits }).fill(""),
    [digits],
  );

  const [otpValues, setOtpValues] = useState(initialValues as string[]);

  const inputRefs = useMemo(
    () => Array.from({ length: digits }, () => createRef<TextInput>()),
    [digits],
  );

  const handleInputChange = (value: string, index: number) => {
    setOtpValues((previous) => {
      const newValues = [...previous];
      newValues[index] = value;
      return newValues;
    });

    if (value && index < digits - 1) {
      inputRefs[index + 1].current?.focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <ThemedView style={styles.container}>
      {otpValues.map((value, index) => (
        <Input
          ref={inputRefs[index]}
          key={index}
          value={value}
          onChangeText={(value) => {
            handleInputChange(value, index);
          }}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          returnKeyType="next"
          selectTextOnFocus
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    textAlign: "center",
    fontSize: 20,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "25%",
  },
});
