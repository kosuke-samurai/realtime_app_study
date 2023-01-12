import { ChangeEvent } from "react"
import { useMutation } from "react-query"
import { supabase } from "../utils/supabase"
import useStore from "../store"

export const useUploadPostImg = () => {
    const editedPost = useStore((state) => state.editedPost)
    const updatePost = useStore((state) => state.updateEditedPost)

    //supabaseのストレージにファイルをアップデートするための関数
    const useMutateUploadPostImg = useMutation(
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
                .from('posts')
                .upload(filePath, file)
            if (error) throw new Error(error.message)
            //ファイルパスの所だけ上書きするようになっている↓
            updatePost({...editedPost, post_url: filePath})
        },
        {
            onError: (err: any) => {
                alert(err.message)
            },
        }
    )
  return { useMutateUploadPostImg }
}
