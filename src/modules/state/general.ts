import { create } from "zustand";

type FormLoadingStore = {
    isFormLoading: boolean
    setIsFormLoading: (loadingStatus: boolean) => void
}

type GetUserPropertyStore = {
    username: string
    fullname: string
    img_url: string
    setUsername: (value: string) => void
    setFullname: (value: string) => void
    setImageUrl: (value: string) => void
}

export const useFormLoading = create<FormLoadingStore>((set) => ({
    isFormLoading: false,
    setIsFormLoading: () => {
        set((state) => ({ isFormLoading: !state.isFormLoading }))
    }
}))

export const useGetUserProperty = create<GetUserPropertyStore>((set) => ({
    username: '',
    fullname: '',
    img_url: '',
    setUsername: (username) => set(() => ({ username })),
    setFullname: (fullname) => set(() => ({ fullname })),
    setImageUrl: (img_url) => set(() => ({ img_url }))
}))