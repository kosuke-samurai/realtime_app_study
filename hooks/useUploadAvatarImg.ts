//画像データをsupabaseにアップロードするカスタムフック(動画14:16〜)
//※今回strageはプライベートを使用している

import { ChangeEvent } from "react"
import { useMutation } from "react-query"
import { supabase } from "../utils/supabase"
import useStore from "../store"

export const useUploadAvatarImg = () => {
    const editedProfile = useStore((state) => state.editedProfile)
    const updateProfile = useStore((state) => state.updateEditedProfile)

    //supabaseのストレージにファイルをアップデートするための関数
    const useMutateUploadAvatarImg = useMutation(
        async (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('画像ファイルを選択してください')
            }
           
            const file = e.target.files[0]
            //（最後の.以降（拡張子の部分）だけ取れるようにしている↓）
            const fileExt = file.name.split('.').pop()
            //ファイルネームを新規作成している↓
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`
            const { error } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)
            if (error) throw new Error(error.message)
            //ファイルパスの所だけ上書きするようになっている↓
            updateProfile({...editedProfile, avatar_url: filePath})
        },
        {
            onError: (err: any) => {
                alert(err.message)
            },
        }
    )

    return {
      useMutateUploadAvatarImg
  }
}
