import { Share } from "react-native";

type SocialShareOptions = {
  message: string;
  title: string;
};

export async function socialShare({ message, title }: SocialShareOptions) {
  return await Share.share({
    message,
    title,
  });
}
