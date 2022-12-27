//プロフィールのデータをsupabaseから取得するためのカスタムフック
import { useQuery } from "react-query"
import { supabase } from "../utils/supabase"
import useStore from "../store"
import { Profile } from "../types"
import { useMutateProfile } from "./useMutateProfile"
import { eachMonthOfInterval } from "date-fns"


export const useQueryProfile = () => {
    const session = useStore((state) => state.session)
    const editedProfile = useStore((state) => state.editedProfile)
    const update = useStore((state) => state.updateEditedProfile)
    const { createProfileMutation } = useMutateProfile()

    //プロフィールを取得する関数
    const getProfile = async () => {
        const { data, error, status } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session?.user?.id)
            .single()
        //プロフィールがまだ存在しない場合は自動的に新規作成に移る関数↓
        if (error && status === 406) {
            createProfileMutation.mutate({
                id: session?.user?.id,
                username: session?.user?.email,
                favorites: '',
                avatar_url: '',
            })
            update({
                ...editedProfile,
                username: session?.user?.email,
            })
        }

        if (error && status !== 406) {
            throw new Error(error.message)
        }
        return data
    
    }

    return useQuery<Profile, Error>({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity,
        
        onSuccess: (data) => {
            if (data) {
                update({
                    username: data.username,
                    favorites: data.favorites,
                    avatar_url: data.avatar_url,
                })
            }
        },
      
        })
  
  
}
