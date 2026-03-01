'use client'

import { NextPage } from 'next'
import React from 'react'

import api from '@/lib/api-client'
import logger from '@/utils/logger'

const PageUpload: NextPage = () => {
  const [error, setError] = React.useState<Error | null>(null)

  if (error) {
    throw error
  }

  const [file, setFile] = React.useState<File | null>(null)

  const handleUpload = async () => {
    try {
      const { data } = await api.createFile({
        fileType: file!.type,
      })

      logger.log('Upload URL:', data.uploadUrl)

      const res = await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file!.type,
        },
        body: file,
      })

      if (res.ok) {
        window.open(data.file.url, '_blank')
      } else {
        alert('檔案上傳失敗！')
      }
    } catch (err) {
      setError(err as Error)
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
