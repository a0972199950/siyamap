'use client'

import React from 'react'
import { NextPage } from 'next'
import api from '@/lib/api-client'

const PageUpload: NextPage = () => {
  const [file, setFile] = React.useState<File | null>(null)

  const handleUpload = async () => {
    const { data: uploadUrl } = await api.getUploadUrl({
      fileType: file!.type,
    })

    console.log('Upload URL:', uploadUrl)

    const res = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file!.type,
      },
      body: file,
    })

    if (res.ok) {
      alert('檔案上傳成功！')
    } else {
      alert('檔案上傳失敗！')
    }
  }

  return (
    <div>
      <input
        type="file"
        id="file"
        onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
      />

      <ul>
        {file && (
          <li>
            {file.name} ({file.type})
          </li>
        )}
      </ul>

      <button disabled={!file} onClick={handleUpload}>
        上傳
      </button>
    </div>
  )
}

export default PageUpload
