const STORAGE_KEY = "post-data-id";

export const draftStorage = {
  save(postId: string) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(postId));
  },

  load(): string | null {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn(error);

      return null;
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
