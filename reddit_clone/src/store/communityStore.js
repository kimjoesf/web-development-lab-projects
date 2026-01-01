import { create } from "zustand";

const useCurrentCommunityStore = create((set) => ({
  community:{},
  setCommunity: (community) => set({ community: community }),
}));

export default useCurrentCommunityStore;