import { useThemeColor } from "@/hooks/useThemeColor";
import {
  type KeyboardTypeOptions,
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextInputProps,
  type TextStyle,
} from "react-native";

type InputProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  style?: StyleProp<TextStyle>;
  maxLength?: number;
  ref?: React.RefObject<TextInput | null>;
} & TextInputProps;

export function Input({
  placeholder = "",
  value,
  onChangeText,
  keyboardType,
  maxLength,
  style = {},
  ref,
}: InputProps) {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const neutralSupportColor = useThemeColor({}, "neutralSupport");

  return (
    <TextInput
      ref={ref}
      style={[
        styles.input,
        style,
        {
          backgroundColor: backgroundColor,
          borderColor: neutralSupportColor,
          color: textColor,
        },
      ]}
      placeholder={placeholder}
      placeholderTextColor={neutralSupportColor}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoCorrect={false}
      maxLength={maxLength}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
});
