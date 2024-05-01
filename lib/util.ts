export const getEndpoint = (url: string, params: Record<string, string>) => {
  const apiKey = process.env.API_KEY as string;
  const searchparams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchparams.set(key, value);
  });

  searchparams.set("api_key", apiKey);
  searchparams.set("file_type", 'json');
  return `https://api.stlouisfed.org/fred${url}?${searchparams.toString()}`;
};
