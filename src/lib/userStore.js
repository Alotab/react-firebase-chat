import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uuid) => {
        if (!uuid) return set({ currentUser: null, isLoading: false });

        try{
            const docRef = doc(db, "users", uuid);
            const docSnap = await getDoc(docRef);

            if (docRef.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false });
            } else {
                set({ currentUser: null, isLoading: false})
            }

        }catch(err) {
            console.log(err);
            return set({ currentUser: null, isLoading: false});
        }
    },


}));