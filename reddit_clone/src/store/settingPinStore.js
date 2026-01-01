import { create } from "zustand";

const useSettingPinned = create((set)=>({
    isSettingPinned:false,
    setIsSettingPinned:(state)=> set({isSettingPinned:state}),
}))

export default useSettingPinned;