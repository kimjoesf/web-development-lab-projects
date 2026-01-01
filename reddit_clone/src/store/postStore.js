import { create } from "zustand";

const useCurrentPostStore = create((set) => ({
  post:{},
  setPost: (newPost) => set({ post: newPost }),
}));

export default useCurrentPostStore;
