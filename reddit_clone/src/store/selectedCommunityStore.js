import { create } from "zustand";

const useSelectedCommunityStore = create((set)=>({
    selectedCommunity:{},
    setSelectedCommunity:(com)=>set({selectedCommunity:com})
}));

export default useSelectedCommunityStore;