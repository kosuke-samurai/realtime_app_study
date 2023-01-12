//以下new(クライアントサイドで管理したい状態の管理)
import create from "zustand";
import { Session } from "@supabase/supabase-js";
import { NonNullExpression } from "typescript";
import {EditedPost, EditedNotice, EditedProfile} from '../types/index'

type State = {
    session: Session | null
    setSession: (payload: Session | null) => void
    
    //プロフィール用の型
    editedProfile: EditedProfile
    updateEditedProfile: (payload: EditedProfile) => void
    resetEditedProfile: () => void

    //Notice用の型
    editedNotice: EditedNotice
    updatedEditedNotice: (payload: EditedNotice) => void
    resetEditedNotice: () => void

    //Post用
  editedPost: EditedPost
  updateEditedPost: (payload: EditedPost) => void
  resetEditedPost: () => void

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
        set({ editedProfile: { username: '', favorites: '', avatar_url: '' } }),
    
    //Notice用
    editedNotice: { id: '', content: '' },
    updatedEditedNotice: (payload) =>
        set({
            editedNotice: {
                id: payload.id,
                content: payload.content,
            },
        }),
    resetEditedNotice: () => set ({editedNotice: {id: '', content: ''}}),
    
    //post用
    editedPost: { id: '', title: '', post_url: '' },
    updateEditedPost: (payload) =>
        set({
        editedPost: {
            id: payload.id,
            title: payload.title,
            post_url: payload.post_url,
        },
        }),
    resetEditedPost: () =>
        set({ editedPost: { id: '', title: '', post_url: '' } }),
}))

export default useStore
