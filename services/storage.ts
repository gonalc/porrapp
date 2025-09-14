import { type SupportedStorage } from "@supabase/supabase-js";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

/**
 * This is meant to satisfy the Supabase storage type when initializing the Supabase client.
 */
export const supabaseStorage: SupportedStorage = {
  getItem: async (key: string) => {
    try {
      const value = storage.getString(key);
      return value ?? null;
    } catch (error) {
      console.error("Error getting item from storage:", error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      storage.set(key, value);
    } catch (error) {
      console.error("Error setting item in storage:", error);
    }
  },
  removeItem: async (key: string) => {
    try {
      storage.delete(key);
    } catch (error) {
      console.error("Error removing item from storage:", error);
    }
  },
};
