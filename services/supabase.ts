import { createClient, processLock } from "@supabase/supabase-js";
import { Platform } from "react-native";
import { supabaseStorage as storage } from "./storage";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      ...(Platform.OS !== "web" ? { storage } : {}),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  },
);
