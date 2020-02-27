import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import './App.css'
import ModeSelector from './components/ModeSelector'
import { MODE_MAP } from './constants/mode'
import filterImages from './utils/image-filter'
import compile from './utils/markdown-compiler'
import Editor from './components/Editor'

function App() {
  const [content, setContent] = useState<string>('')
  const [mode, setMode] = useState<string>('edit')

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    const modeText = MODE_MAP.get(mode)
    document.title = `Markdown Editor - ${modeText}模式`
  }, [mode])

  useEffect(() => {
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

  // TODO: not use any in TS
  const onModeChange = (e: any) => {
    setMode(e.target.value)
  }

  const renderMarkdown = () => {
    const html = compile(content)
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  }

  const editorVisible = mode === 'edit' || mode === 'preview'
  const previewerVisible = mode === 'preview' || mode === 'read'

  return (
    <div className="App">
      <ModeSelector mode={mode} onModeChange={onModeChange} />
      <div className="title">
        <Input id="title" placeholder="请输入标题" />
      </div>
      <div className="container">
        <Editor
          visible={editorVisible}
          onContentChange={(content: string) => setContent(content)}
        />
        <div
          id="previewer"
          style={{ display: previewerVisible ? '' : 'none' }}
          data-testid="previewer"
        >
          {renderMarkdown()}
        </div>
      </div>
    </div>
  )
}

export default App
