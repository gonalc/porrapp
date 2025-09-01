import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
);
