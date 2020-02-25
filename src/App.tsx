import { Input, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import './App.css'
import compile from './utils/markdown-compiler'
import filterImages from './utils/image-filter'

const MODE_MAP = new Map<string, string>([
  ['edit', '编辑'],
  ['preview', '预览'],
  ['read', '阅读']
])

function App() {
  const [content, setContent] = useState<string>('')
  const [mode, setMode] = useState<string>('edit')

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    const modeText = MODE_MAP.get(mode)
    document.title = `Markdown Editor - ${modeText}模式`
  }, [mode])

  const editorRef: any = React.createRef()

  useEffect(() => {
    const editor: any = editorRef.current
    editor.addEventListener('drop', handleDrop)
    return () => {
      const editor: any = editorRef.current
      editor.removeEventListener('drop', handleDrop)
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

  handleDrop = (e: any) => {
    e.preventDefault()
    console.log(e.dataTransfer)

    const fileList: FileList = e.dataTransfer.files
    const files: Array<File> = toArray(fileList)
    const images: Array<File> = filterImages(files)
    const names: Array<string> = images.map(i => i.name)
    insertImages(names)

    e.dataTransfer.clearData()
  }

  // eslint-disable-next-line no-unused-vars
  const onMouseUp = (e: any) => {
    console.log(e)
    console.log(e.which)
  }

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
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
      <Radio.Group value={mode} onChange={onModeChange}>
        {Array.from(MODE_MAP.keys()).map(m => (
          <Radio.Button key={m} value={m} data-testid={m}>
            {MODE_MAP.get(m)}模式
          </Radio.Button>
        ))}
      </Radio.Group>
      <div className="title">
        <Input id="title" placeholder="请输入标题" />
      </div>
      <div className="container">
        <Input.TextArea
          id="editor"
          style={{ display: editorVisible ? '' : 'none' }}
          data-testid="editor"
          placeholder={'请输入文章内容……'}
          value={content}
          onChange={onContentChange}
          ref={editorRef}
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
