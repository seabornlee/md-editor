import { Input, Radio } from 'antd'
import React, { useState } from 'react'
import './App.css'
import compile from './utils/markdown-compiler'

function App() {
  const [content, setContent] = useState('')
  const [mode, setMode] = useState('edit')

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
        <Radio.Button value="edit" data-testid="edit">
          编辑模式
        </Radio.Button>
        <Radio.Button value="preview">预览模式</Radio.Button>
        <Radio.Button value="read" data-testid="read">
          阅读模式
        </Radio.Button>
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
