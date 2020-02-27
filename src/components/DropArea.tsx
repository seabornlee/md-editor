import React, { useEffect } from 'react'
import filterImages from '../utils/image-filter'

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
    const handleDrop = (e: any) => {
      e.preventDefault()
      console.log(e.dataTransfer)

      const fileList: FileList = e.dataTransfer.files
      const files: Array<File> = toArray(fileList)
      const images: Array<File> = filterImages(files)
      const names: Array<string> = images.map(i => i.name)
      insertImages(names)

      e.dataTransfer.clearData()
    }

    window.addEventListener('drop', handleDrop)
    return () => {
      window.removeEventListener('drop', handleDrop)
    }
  })
  return <div>{children}</div>
}
