import { useQueryClient, useMutation } from "react-query"
import { supabase } from "../utils/supabase"
import { Profile } from "../types"

//※カスタムフックの場合はreturnの（）を｛｝にする
export const useMutateProfile = () => {
    const queryClient = useQueryClient()
    //プロフィール新規作成の関数↓
    const createProfileMutation = useMutation(
       async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
            const { data, error } = await supabase.from('profiles').insert(profile)
            if(error) throw new Error(error.message)
            return data            
        },
        {
            onSuccess: (res) => {
                queryClient.setQueryData(['profile'], res[0])
            },
            onError: (err: any) => {
                alert(err.message)
            },
        }
    )

    ////プロフィール更新の関数↓
    const updateProfileMutation = useMutation(
       async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('profiles')
                .update(profile)
                .eq('id', profile.id)
            if (error) throw new Error(error.message)
            return data
        },
        {
            onSuccess: (res) => {
                queryClient.setQueryData(['profile'], res[0])
            },
            onError: (err: any) => {
                alert(err.message)
            },
        }
    )
  return { createProfileMutation, updateProfileMutation }
}

