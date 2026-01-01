import { create } from "zustand";

const useUserCommunitiesStore = create((set,get)=>({
    userCommunities:[],
    setUserCommunities:(communities)=> set({userCommunities:communities}),
    addUserCommunity:(community)=>{
        const communities= get().userCommunities;
        const updated = [community,...communities];
        set({userCommunities:updated});
    }
}));

export default useUserCommunitiesStore;