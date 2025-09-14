import { Alert, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/contexts/session";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { LoadingButton } from "@/components/LoadingButton";
import { supabase } from "@/services/supabase";
import { useState } from "react";
import { useRouter } from "expo-router";
import { storage } from "@/services/storage";

export default function AccountScreen() {
  const { data } = useSession();

  const router = useRouter();

  const warningColor = useThemeColor({}, "warning");
  const textColor = useThemeColor({}, "text");

  const [isLoading, setIsLoading] = useState(false);

  const getContent = () => {
    if (!data?.user) {
      return (
        <ThemedText type="defaultSemiBold" style={{ color: warningColor }}>
          No se pudo cargar la información del usuario.
        </ThemedText>
      );
    }

    const {
      user: { email },
    } = data;

    return (
      <ThemedView style={styles.row}>
        <IconSymbol name="envelope.fill" color={textColor} size={24} />
        <ThemedText type="defaultSemiBold">{email}</ThemedText>
      </ThemedView>
    );
  };

  const logout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        onPress: async () => {
          try {
            setIsLoading(true);
            await supabase.auth.signOut();

            router.navigate("/");
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mi cuenta</ThemedText>

      <ThemedView style={styles.content}>{getContent()}</ThemedView>

      <ThemedView>
        <LoadingButton
          onPress={logout}
          isLoading={isLoading}
          variant="background"
        >
          <ThemedText type="defaultSemiBold">Cerrar sesión</ThemedText>
        </LoadingButton>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
  },
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
});
