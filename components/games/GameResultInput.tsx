import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { StyleSheet } from "react-native";

type GameResultInputProps = {
  homeTeamName?: string;
  awayTeamName?: string;
  homeScore: string;
  awayScore: string;
  setHomeScore: (value: string) => void;
  setAwayScore: (value: string) => void;
};

export function GameResultInput({
  homeTeamName = 'Local',
  awayTeamName = 'Visitante',
  homeScore,
  awayScore,
  setHomeScore,
  setAwayScore,
}: GameResultInputProps) {
  return (
    <ThemedView style={styles.inputContainer}>
      <ThemedView style={styles.scoreInputWrapper}>
        <ThemedText type="default" style={styles.teamLabel}>
          {homeTeamName}
        </ThemedText>
        <Input
          value={homeScore}
          onChangeText={setHomeScore}
          keyboardType="numeric"
          maxLength={2}
          style={styles.scoreInput}
          placeholder="0"
          autoFocus
        />
      </ThemedView>

      <ThemedText type="title" style={styles.vs}>
        VS
      </ThemedText>

      <ThemedView style={styles.scoreInputWrapper}>
        <ThemedText type="default" style={styles.teamLabel}>
          {awayTeamName}
        </ThemedText>
        <Input
          value={awayScore}
          onChangeText={setAwayScore}
          keyboardType="numeric"
          maxLength={2}
          style={styles.scoreInput}
          placeholder="0"
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 16,
  },
  scoreInputWrapper: {
    flex: 1,
    alignItems: "center",
  },
  teamLabel: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 14,
  },
  scoreInput: {
    textAlign: "center",
    marginBottom: 0,
    fontSize: 18,
    fontWeight: "bold",
  },
  vs: {
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.7,
  },
});
