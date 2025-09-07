import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type Team } from "@/hooks/supabase/getGames";
import { useThemeColor } from "@/hooks/useThemeColor";

import { StyleSheet, Image } from "react-native";

type TeamCardProps = {
  team: Team;
};

export function TeamCard({ team }: TeamCardProps) {
  const neutralSupportColor = useThemeColor({}, "neutralSupport");

  return (
    <ThemedView
      style={[styles.teamContainer, { backgroundColor: neutralSupportColor }]}
    >
      <Image
        source={{ uri: team.imageUrlSizes.M }}
        style={styles.teamLogo}
      />
      <ThemedText type="defaultSemiBold" style={styles.teamName}>
        {team.commonName}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  teamContainer: {
    alignItems: "center",
    flex: 1,
    borderRadius: 8,
    padding: 8,
  },
  teamLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 8,
  },
  teamName: {
    textAlign: "center",
    fontSize: 18,
  },
});
