import { create } from "zustand";

type FormLoadingStore = {
    isFormLoading: boolean
    setIsFormLoading: (loadingStatus: boolean) => void
}

export const useFormLoading = create<FormLoadingStore>((set) => ({
    isFormLoading: false,
    setIsFormLoading: () => {
        set((state) => ({ isFormLoading: !state.isFormLoading }))
    }
}))