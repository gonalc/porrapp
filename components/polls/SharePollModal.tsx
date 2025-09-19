import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { type Poll } from "@/hooks/supabase/polls/getPolls";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { LoadingButton } from "../LoadingButton";
import { IconSymbol } from "../ui/IconSymbol";
import { socialShare } from "@/utils/share";
import { usePollsContext } from "@/contexts/polls";

type SharePollModalProps = {
  visible: boolean;
  onClose: () => void;
  poll: Poll | null;
};

export function SharePollModal({
  visible,
  onClose,
  poll,
}: SharePollModalProps) {
  const backgroundColor = useThemeColor({}, "background");
  const neutralSupportColor = useThemeColor({}, "neutralSupport");
  const textColor = useThemeColor({}, "text");

  const { game } = usePollsContext();

  if (!poll) return null;

  const { home_team, away_team } = game;

  const homeTeamName = home_team.abbName;
  const awayTeamName = away_team.abbName;

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <ThemedText type="defaultSemiBold">Comparte esta porra</ThemedText>
      <ThemedText>
        Utiliza este código para que más personas se unan a la porra.
      </ThemedText>

      <ThemedText
        type="subtitle"
        style={[
          styles.code,
          {
            borderColor: neutralSupportColor,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        {poll.code}
      </ThemedText>

      {/*<ThemedText style={styles.caption}>
        Toca el código para copiarlo
      </ThemedText>*/}

      <Modal.ModalActions>
        <LoadingButton
          isLoading={false}
          onPress={() =>
            socialShare({
              message: `¡He creado una porra para el partido ${homeTeamName} - ${awayTeamName}!\nUtiliza este código para unirte a ella: ${poll.code}.`,
              title: 'Únete a esta porra',
            })
          }
          style={styles.shareButton}
        >
          <IconSymbol name="shared.with.you" color={textColor} />
          <ThemedText type="defaultSemiBold">Compartir</ThemedText>
        </LoadingButton>
      </Modal.ModalActions>
    </Modal>
  );
}

const styles = StyleSheet.create({
  code: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: "auto",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  caption: {
    textAlign: "center",
  },
  shareButton: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
});
