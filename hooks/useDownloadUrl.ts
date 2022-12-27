//画像データをsupabaseから取ってくるカスタムフック(動画17:46〜)
//※今回strageはプライベートを使用している
//※アヴァター用＆ポスト用共通で作る※

import { useState, useEffect } from "react"
import { supabase } from "../utils/supabase"


export const useDownloadUrl = (
    filePath: string | undefined,
    key: 'avatars' | 'posts'
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fullUrl, SetFullUrl] = useState('')
    const bucketName = key === 'avatars' ? 'avatars' : 'posts'

    useEffect(() => {
        if (filePath) {
            const download = async () => {
                setIsLoading(true)
                const { data, error } = await supabase.storage
                    .from(bucketName)
                    .download(filePath)
                if (error) {
                    setIsLoading(false)
                    throw error
                }
                SetFullUrl(URL.createObjectURL(data!))
                setIsLoading(false)
            }
            download()
        }
    }, [filePath, bucketName])

    return {isLoading, setIsLoading, fullUrl, SetFullUrl, 
      
  }
}
