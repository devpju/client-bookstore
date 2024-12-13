export const urlToFile = async (url, filename, mimeType = 'image/jpeg') => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};
