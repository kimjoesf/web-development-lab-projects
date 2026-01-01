import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecentViewedPostsStore = create(
  persist(
    (set, get) => ({
      recentViewedPosts: [],

      addRecentViewedPost: (post) => {
        const current = get().recentViewedPosts;

        const filtered = current.filter(p => p.id !== post.id);
        const updated = [post, ...filtered].slice(0, 20);

        set({ recentViewedPosts: updated });
      },

      clearRecentViewedPosts: () => {
        set({ recentViewedPosts: [] });
      },
    }),
    {
      name: "recent-viewed-posts",
    }
  )
);

export default useRecentViewedPostsStore;
