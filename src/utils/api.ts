export const getApiUrl = (endpoint: string): string => {
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    return `https://ais-pre-4jnyl34caf3cfwxtgefqlp-529379495544.asia-southeast1.run.app${endpoint}`;
  }
  return endpoint;
};
