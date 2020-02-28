import React, { useEffect } from 'react'
import filterImages from '../utils/image-filter'
import axios from 'axios'

export default function DropArea({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const insertImages = (imageURLs: Array<string>) => {
      const text = imageURLs.map(imageURL => `![](${imageURL})`).join('\r\n')
      document.execCommand('insertText', false, text)
    }

    const toArray = (fileList: FileList) => {
      const files: Array<File> = []
      for (let i = 0; i < fileList.length; i++) {
        files.push(fileList[i])
      }

      return files
    }

    const upload = (
      images: Array<File>,
      callback: (urls: Array<string>) => void
    ) => {
      const formData = new FormData()
      for (let i = 0; i < images.length; i++) {
        formData.append(`files[${i}]`, images[i], images[i].name)
      }
      axios
        .post('http://localhost:8000/api/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          callback(res.data.urls)
        })
        .catch(err => {
          console.log(err)
        })
    }

    const handleDrop = (e: any) => {
      e.preventDefault()

      const files: Array<File> = toArray(e.dataTransfer.files)
      const images: Array<File> = filterImages(files)
      upload(images, (urls: Array<string>) => {
        console.log(urls)
        insertImages(urls)
        e.dataTransfer.clearData()
      })
    }

    window.addEventListener('drop', handleDrop)
    return () => {
      window.removeEventListener('drop', handleDrop)
    }
  })
  return <div>{children}</div>
}
