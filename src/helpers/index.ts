export const getYoutubeVideoId = (url: string): string | undefined => {
  if (!url) return "";

  // Extract Video ID using Regex
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : undefined;
};

export const isValidYoutubeUrl = (url: string): boolean => {
  // Check if URL is valid YouTube URL
  const regExp =
    /(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;

  return regExp.test(url);
};
