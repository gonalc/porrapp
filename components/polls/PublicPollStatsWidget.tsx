import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { type PublicPollStats } from "@/hooks/supabase/polls/getPublicPollStats";
import { Loader } from "@/components/Loader";
import Svg, { Circle } from "react-native-svg";

type PublicPollStatsWidgetProps = {
  stats: PublicPollStats | null;
  isLoading: boolean;
};

export const PublicPollStatsWidget = ({
  stats,
  isLoading,
}: PublicPollStatsWidgetProps) => {
  const surfaceColor = useThemeColor({}, "surface");
  const infoColor = useThemeColor({}, "info");
  const successColor = useThemeColor({}, "success");
  const neutralColor = useThemeColor({}, "neutralSupport");

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: surfaceColor }]}>
        <Loader isLoading={true} />
      </ThemedView>
    );
  }

  if (!stats) {
    return null;
  }

  const successRate = stats.success_rate || 0;
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (successRate / 100) * circumference;

  return (
    <ThemedView style={[styles.container, { backgroundColor: surfaceColor }]}>
      <View style={styles.statsRow}>
        <View style={styles.statsCards}>
          <StatCard
            label="Enviadas"
            value={stats.total_submitted}
            color={infoColor}
          />
          <StatCard
            label="Finalizadas"
            value={stats.total_finished}
            color={infoColor}
          />
          <StatCard
            label="Exitosas"
            value={stats.total_successful}
            color={successColor}
          />
        </View>

        {/* Circular Progress */}
        <View style={styles.progressContainer}>
          <Svg height={radius * 2} width={radius * 2}>
            {/* Background Circle */}
            <Circle
              stroke={neutralColor}
              fill="none"
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              strokeWidth={strokeWidth}
              opacity={0.3}
            />
            {/* Progress Circle */}
            <Circle
              stroke={successColor}
              fill="none"
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${radius} ${radius})`}
            />
          </Svg>
          <View style={styles.progressTextContainer}>
            <ThemedText style={[styles.progressValue, { color: successColor }]}>
              {successRate.toFixed(0)}%
            </ThemedText>
            <ThemedText style={styles.progressLabel}>Acierto</ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};

type StatCardProps = {
  label: string;
  value: number;
  color: string;
};

const StatCard = ({ label, value, color }: StatCardProps) => {
  const textColor = useThemeColor({}, "text");

  return (
    <View style={styles.statCard}>
      <View style={[styles.statIndicator, { backgroundColor: color }]} />
      <ThemedText style={[styles.statValue, { color: textColor }]}>
        {value}
      </ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsCards: {
    flex: 1,
    gap: 12,
  },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    minWidth: 32,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  progressTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  progressValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  progressLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginTop: -2,
  },
});
