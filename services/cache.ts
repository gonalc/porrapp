import { storage } from "./storage";
import { DEFAULT_CACHE_TIME_IN_MINUTES } from "@/constants/cache";
import dayjs from "@/utils/dates";

type CachedData<T> = {
  data: T;
  timestamp: string;
  durationInMinutes: number;
};

const set = (
  key: string,
  data: unknown,
  durationInMinutes: number = DEFAULT_CACHE_TIME_IN_MINUTES,
) => {
  const cachedData: CachedData<unknown> = {
    data,
    timestamp: new Date().toISOString(),
    durationInMinutes,
  };
  storage.set(key, JSON.stringify(cachedData));
};

const get = <T>(key: string): T | null => {
  const cachedDataString = storage.getString(key);

  if (!cachedDataString) {
    return null;
  }

  try {
    const cachedData: CachedData<T> = JSON.parse(cachedDataString);
    const now = dayjs();
    const timestamp = dayjs(cachedData.timestamp);

    if (now.diff(timestamp, "minute") > cachedData.durationInMinutes) {
      return null;
    }

    return cachedData.data;
  } catch (error) {
    console.error("Error parsing cached data:", error);
    return null;
  }
};

const remove = (key: string) => {
  storage.delete(key);
};

export const cacheService = {
  set,
  get,
  remove,
};