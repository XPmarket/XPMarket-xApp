import cache from 'memory-cache';

export const cachedResponse = async <T>(
  key: string,
  callback: () => Promise<T>,
  previewRef?: string,
  timeInMs = 3600000 // 1 hour default
): Promise<T> => {
  if (!previewRef) {
    const response = cache.get(key);

    if (!response) {
      const data = await callback();
      cache.put(key, data, timeInMs);

      return data;
    }

    return response;
  }

  const res = await callback();

  return res;
};
