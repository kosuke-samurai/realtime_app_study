//以下new(クライアントサイドで管理したい状態の管理)
import create from "zustand";
import { Session } from "@supabase/supabase-js";
import { NonNullExpression } from "typescript";
import {EditedProfile} from '../types/index'

type State = {
    session: Session | null
    setSession: (payload: Session | null) => void
    
    //プロフィール用の型
    editedProfile: EditedProfile
    updateEditedProfile: (payload: EditedProfile) => void
    resetEditedProfile: () => void
}

const useStore = create<State>((set) => ({
    session: null,
    setSession: (payload) => set({ session: payload }),
    
    //プロフィール用の関数の中身
    editedProfile: { username: '', favorites: '', avatar_url: '' },
    updateEditedProfile: (payload) =>
        set({
            editedProfile: {
                username: payload.username,
                favorites: payload.favorites,
                avatar_url: payload.avatar_url,
            },
        }),
    resetEditedProfile: () =>
        set({ editedProfile: { username: '', favorites: '', avatar_url: ''} }),
}))

export default useStore
